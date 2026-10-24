"use client";

import { ArrowUpRightIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { type MouseEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/utils";
import type { Video } from "../api/videos";

export type VideoItem = Pick<
  Video,
  "id" | "title" | "url" | "published" | "thumbnail"
> & {
  // Formatted on the server, in the page's locale
  views: string;
  date: string;
};

// A large lead video followed by smaller ones. Clicking plays the video in a
// dialog; links still point at YouTube, so a modified click (new tab) or no
// JavaScript opens it there instead.
export function VideoGrid({
  videos,
  labels,
}: {
  videos: VideoItem[];
  labels: { openOnYouTube: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  // Kept after closing so the content doesn't vanish mid exit animation
  const [current, setCurrent] = useState<VideoItem>();

  const play = (event: MouseEvent, video: VideoItem) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    setCurrent(video);
    setOpen(true);
  };

  return (
    <>
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => {
          const lead = i === 0;
          // In two columns the lead takes a full row, so an odd number
          // after it would leave a gap at the end
          const unpaired = i === videos.length - 1 && i % 2 === 1;
          return (
            <li
              key={video.id}
              className={cn(
                lead && "sm:col-span-2 lg:row-span-2",
                unpaired && "sm:max-lg:hidden",
              )}
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => play(event, video)}
                className="group flex h-full flex-col gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {/* Spanning two rows, the lead's thumbnail grows to fill them */}
                <div
                  className={cn(
                    "relative aspect-video overflow-hidden bg-muted",
                    lead && "lg:aspect-auto lg:flex-1",
                  )}
                >
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    sizes={
                      lead
                        ? "(min-width: 1024px) 640px, 100vw"
                        : "(min-width: 640px) 320px, 100vw"
                    }
                    className="object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <div className={cn("flex flex-col gap-1.5", !lead && "flex-1")}>
                  <h3
                    className={cn(
                      "line-clamp-2 underline-offset-4 decoration-ctp-yellow group-hover:underline",
                      lead
                        ? "font-serif text-xl leading-snug font-light"
                        : "text-sm leading-relaxed",
                    )}
                  >
                    {video.title}
                  </h3>
                  {/* Pinned to the bottom so cards in a row line up */}
                  <p className="mt-auto flex justify-between gap-4 text-xs text-muted-foreground">
                    <span>{video.views}</span>
                    <time dateTime={video.published}>{video.date}</time>
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/85 duration-300"
          className="gap-0 rounded-none bg-transparent p-0 ring-0 sm:max-w-5xl"
        >
          {current && (
            <>
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
                  title={current.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="size-full"
                />
              </div>
              <div className="flex items-start justify-between gap-6 pt-4 text-white">
                <DialogTitle className="font-serif text-lg leading-snug font-light">
                  {current.title}
                </DialogTitle>
                <div className="flex shrink-0 items-center gap-4">
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm text-xs text-white/70 outline-none transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    {labels.openOnYouTube}
                    <ArrowUpRightIcon strokeWidth={1.25} className="size-3.5" />
                  </a>
                  <DialogClose
                    aria-label={labels.close}
                    className="rounded-sm p-1 text-white/70 outline-none transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <XIcon strokeWidth={1.25} className="size-5" />
                  </DialogClose>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
