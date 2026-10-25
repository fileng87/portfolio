"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

// The icons swap by spinning: the outgoing one turns away and shrinks while
// the incoming one spins in with a slight overshoot
const iconMotion =
  "absolute inset-0 transition-[rotate,scale,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none";

// The longest `data-theme-settle` (ms) among elements on screen: content that
// needs that long to follow a theme change
function settleTime() {
  let longest = 0;
  for (const el of document.querySelectorAll<HTMLElement>(
    "[data-theme-settle]",
  )) {
    const { top, bottom } = el.getBoundingClientRect();
    if (bottom > 0 && top < window.innerHeight) {
      longest = Math.max(longest, Number(el.dataset.themeSettle) || 0);
    }
  }
  return longest;
}

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }
    // Cross-fade instead of an abrupt brightness jump
    document.startViewTransition(async () => {
      flushSync(() => setTheme(next));
      // Some content (an iframe) restyles itself a moment later; hold the
      // snapshot of the new state until it has, so it fades with the rest
      const settle = settleTime();
      if (settle) await new Promise((r) => setTimeout(r, settle));
    });
  };

  return (
    <Button variant="ghost" size="icon" aria-label={label} onClick={toggle}>
      {/* Driven by the .dark class, so there is no hydration mismatch */}
      <span className="relative size-4">
        <SunIcon
          className={cn(
            iconMotion,
            "dark:-rotate-180 dark:scale-0 dark:opacity-0",
          )}
        />
        <MoonIcon
          className={cn(
            iconMotion,
            "rotate-180 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100",
          )}
        />
      </span>
    </Button>
  );
}
