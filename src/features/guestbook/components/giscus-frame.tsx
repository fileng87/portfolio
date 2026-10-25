"use client";

import Giscus from "@giscus/react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { giscusSettle } from "../constants/giscus";

const subscribe = () => () => {};

// The giscus widget, themed to match the site (public/giscus/*.css). Its
// theme has to be an absolute URL, so it renders on the client only.
export function GiscusFrame({
  repo,
  repoId,
  discussion,
}: {
  repo: `${string}/${string}`;
  repoId: string;
  discussion: number;
}) {
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    // Reserves room for the widget so the page doesn't jump when it loads
    <div className="min-h-80" data-theme-settle={giscusSettle}>
      {mounted && (
        <Giscus
          repo={repo}
          repoId={repoId}
          mapping="number"
          term={String(discussion)}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={`${window.location.origin}/giscus/${resolvedTheme === "dark" ? "dark" : "light"}.css`}
          lang={locale}
          loading="lazy"
        />
      )}
    </div>
  );
}
