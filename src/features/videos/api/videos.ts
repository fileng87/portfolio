import "server-only";
import { XMLParser } from "fast-xml-parser";
import { cacheLife } from "next/cache";
import { z } from "zod";
import { env } from "@/lib/env";
import { popularCount } from "../constants/videos";

const parser = new XMLParser({
  ignoreAttributes: false,
  // Keep ids and titles as strings, even when they look like numbers
  parseTagValue: false,
  isArray: (name) => name === "entry",
});

const feed = z.object({
  feed: z.object({
    entry: z
      .array(
        z.object({
          "yt:videoId": z.string(),
          title: z.string(),
          published: z.string(),
          link: z.object({ "@_href": z.url() }),
          "media:group": z.object({
            "media:community": z.object({
              "media:statistics": z.object({ "@_views": z.coerce.number() }),
            }),
          }),
        }),
      )
      .default([]),
  }),
});

export type Video = {
  id: string;
  title: string;
  url: string;
  published: string;
  views: number;
  thumbnail: string;
};

export const channelUrl = (id: string) =>
  `https://www.youtube.com/channel/${id}`;

const thumbnailUrl = (id: string, quality: string) =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

// A playlist's public RSS feed (no API key needed). Every channel has
// auto-generated playlists named by a prefix plus the channel id without "UC":
// UULF = long-form uploads, newest first; UULP = popular uploads.
async function getPlaylist(prefix: "UULF" | "UULP", channelId: string) {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${prefix}${channelId.slice(2)}`,
  );
  if (!res.ok) throw new Error(`YouTube responded ${res.status}`);
  return (
    feed
      .parse(parser.parse(await res.text()))
      // Shorts are vertical and don't fit the 16:9 grid
      .feed.entry.filter((e) => !e.link["@_href"].includes("/shorts/"))
      .map((e) => ({
        id: e["yt:videoId"],
        title: e.title,
        url: e.link["@_href"],
        published: e.published,
        views:
          e["media:group"]["media:community"]["media:statistics"]["@_views"],
        thumbnail: thumbnailUrl(e["yt:videoId"], "hqdefault"),
      }))
  );
}

// hqdefault is 4:3 with letterboxing, which a 16:9 box crops away. The lead
// is large and its box taller than 16:9, so it needs the bare 1280×720
// frame; videos uploaded below 720p have none.
async function leadThumbnail(id: string) {
  const maxres = thumbnailUrl(id, "maxresdefault");
  const res = await fetch(maxres, { method: "HEAD" });
  return res.ok ? maxres : thumbnailUrl(id, "hqdefault");
}

// The latest video first, then the most popular ones
export async function getVideos(): Promise<Video[]> {
  "use cache";
  cacheLife("hours");

  const channelId = env.YOUTUBE_CHANNEL_ID;
  if (!channelId) return [];

  try {
    const [latest, popular] = await Promise.all([
      getPlaylist("UULF", channelId),
      getPlaylist("UULP", channelId),
    ]);
    const lead = latest[0] ?? popular[0];
    if (!lead) return [];
    return [
      { ...lead, thumbnail: await leadThumbnail(lead.id) },
      ...popular.filter((v) => v.id !== lead.id).slice(0, popularCount),
    ];
  } catch (error) {
    // Render the section without the list rather than failing the page
    console.error("Failed to fetch videos:", error);
    return [];
  }
}
