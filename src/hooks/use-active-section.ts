"use client";

import { useEffect, useState } from "react";

// A section is active while it crosses a line 45% down the viewport.
// Above the first section (e.g. on the hero) nothing is active.
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActive(id);
          } else if (
            // The section's top dropped below the line: scrolled back up
            // above it. (Not just any miss: the mobile menu pushes the page
            // sideways out of view, which mustn't clear it.)
            entry.boundingClientRect.top >
            (entry.rootBounds?.top ?? window.innerHeight * 0.45)
          ) {
            setActive((current) => (current === id ? null : current));
          }
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
