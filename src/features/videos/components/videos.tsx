import { ArrowUpRightIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { env } from "@/lib/env";
import { channelUrl, getVideos } from "../api/videos";
import { VideoGrid } from "./video-grid";

export async function Videos() {
  const t = await getTranslations("Videos");
  const format = await getFormatter();
  const videos = await getVideos();

  if (!env.YOUTUBE_CHANNEL_ID || videos.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      <VideoGrid
        videos={videos.map((video) => ({
          ...video,
          views: t("views", {
            views: format.number(video.views, { notation: "compact" }),
          }),
          date: format.dateTime(new Date(video.published), {
            dateStyle: "medium",
          }),
        }))}
        labels={{ openOnYouTube: t("openOnYouTube"), close: t("close") }}
      />

      <a
        href={channelUrl(env.YOUTUBE_CHANNEL_ID)}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 self-start rounded-sm text-sm text-muted-foreground outline-none transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        {t("more")}
        <ArrowUpRightIcon
          strokeWidth={1.25}
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
        />
      </a>
    </div>
  );
}
