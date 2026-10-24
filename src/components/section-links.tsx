"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";
import { sections } from "@/constants/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/utils";

// Vertical section links for the desktop side nav. A thin accent line slides
// to whichever section is in view.
export function SectionLinks() {
  const t = useTranslations("Nav");
  const active = useActiveSection(sections);
  const labels = useRef(new Map<string, HTMLSpanElement>());
  // The line spans the label's rendered box, measured rather than derived
  // from padding: glyph metrics differ per font, and English is rotated
  const [extent, setExtent] = useState<{ top: number; height: number }>();

  useLayoutEffect(() => {
    if (!active) return;
    const measure = () => {
      const label = labels.current.get(active);
      const item = label?.closest("li");
      if (!label || !item) return;
      const box = label.getBoundingClientRect();
      // The box includes letter-spacing after the last character; trim it.
      // It sits at the bottom, or at the top once rotated (English).
      const tracking = parseFloat(getComputedStyle(label).letterSpacing) || 0;
      const rotated = label.parentElement
        ? getComputedStyle(label.parentElement).rotate !== "none"
        : false;
      setExtent({
        top:
          box.top - item.getBoundingClientRect().top + (rotated ? tracking : 0),
        height: box.height - tracking,
      });
    };
    measure();
    // Re-measure once web fonts have swapped in, and on resize
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <ul className="my-auto flex flex-col items-center gap-4">
      {sections.map((section) => (
        <li key={section} className="relative flex">
          <a
            href={`#${section}`}
            aria-current={active === section ? "location" : undefined}
            className={cn(
              "inline-block rounded-sm px-2 py-3 text-sm tracking-[0.3em] outline-none transition-colors duration-300 [writing-mode:vertical-rl] hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&:lang(en)]:rotate-180 [&:lang(en)]:tracking-widest",
              active === section ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <span
              ref={(el) => {
                if (el) labels.current.set(section, el);
                else labels.current.delete(section);
              }}
            >
              {t(section)}
            </span>
          </a>
          {/* Outside the link: English links are rotated 180°, which would
              flip the indicator's slide direction */}
          {active === section && (
            <motion.span
              layoutId="section-indicator"
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="absolute top-3 right-1.5 bottom-3 w-px bg-ctp-yellow"
              style={
                extent && {
                  top: extent.top,
                  bottom: "auto",
                  height: extent.height,
                }
              }
            />
          )}
        </li>
      ))}
    </ul>
  );
}
