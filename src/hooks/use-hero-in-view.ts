"use client";

import { useEffect, useState } from "react";

// Whether the hero has been on screen, undefined until measured on the client.
// The hero is sticky and stays in the viewport under the content, so it counts
// as seen while the page is scrolled less than half a screen. A page opened at
// a #section starts away from it; once scrolled back, this latches to true.
export function useHeroInView() {
  const [inView, setInView] = useState<boolean>();

  useEffect(() => {
    const check = () => {
      const seen = window.scrollY < window.innerHeight / 2;
      setInView(seen);
      if (seen) window.removeEventListener("scroll", check);
    };
    const watch = () => {
      window.addEventListener("scroll", check, { passive: true });
      check();
    };

    // Opened at a #section, the browser (smooth) scrolls there from the top,
    // passing over the hero, so start watching once it has arrived. The
    // timeout covers a jump that fires no scrollend.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !document.getElementById(id)) {
      watch();
      return () => window.removeEventListener("scroll", check);
    }
    setInView(false);
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      watch();
    };
    window.addEventListener("scrollend", start, { once: true });
    const timer = setTimeout(start, 1500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scrollend", start);
      window.removeEventListener("scroll", check);
    };
  }, []);

  return inView;
}
