"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";
import { sections } from "@/constants/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/utils";

const slide = { type: "spring", bounce: 0, duration: 0.5 } as const;

// Vertical section links for the desktop side nav. A thin accent line slides
// to whichever section is in view, and fades in from (or out to) the top of
// the page, where no section is.
export function SectionLinks() {
  const t = useTranslations("Nav");
  const active = useActiveSection(sections);
  const list = useRef<HTMLUListElement>(null);
  const labels = useRef(new Map<string, HTMLSpanElement>());
  // The line spans the label's rendered box, measured rather than derived
  // from padding: glyph metrics differ per font, and English is rotated
  const [line, setLine] = useState<{ x: number; y: number; height: number }>();

  // Slide only between two sections; arriving from the top, the line
  // appears in place and fades in instead of sliding from its last spot
  const [previous, setPrevious] = useState(active);
  const [sliding, setSliding] = useState(false);
  if (active !== previous) {
    setPrevious(active);
    setSliding(previous !== null && active !== null);
  }

  useLayoutEffect(() => {
    if (!active) return;
    const measure = () => {
      const label = labels.current.get(active);
      const item = label?.closest("li");
      if (!label || !item || !list.current) return;
      const origin = list.current.getBoundingClientRect();
      const box = label.getBoundingClientRect();
      // The box includes letter-spacing after the last character; trim it.
      // It sits at the bottom, or at the top once rotated (English).
      const tracking = parseFloat(getComputedStyle(label).letterSpacing) || 0;
      const rotated = label.parentElement
        ? getComputedStyle(label.parentElement).rotate !== "none"
        : false;
      setLine({
        // 6px in from the item's right edge, beside the text
        x: item.getBoundingClientRect().right - origin.left - 7,
        y: box.top - origin.top + (rotated ? tracking : 0),
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
    <ul
      ref={list}
      className="relative my-auto flex flex-col items-center gap-4"
    >
      {sections.map((section) => (
        <li key={section} className="flex">
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
        </li>
      ))}
      {/* One line for the whole list, outside the links: English links are
          rotated 180°, which would flip its slide direction */}
      {line && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 w-px bg-ctp-yellow"
          initial={{ ...line, opacity: 0 }}
          animate={{ ...line, opacity: active ? 1 : 0 }}
          transition={{
            default: sliding ? slide : { duration: 0 },
            opacity: { duration: 0.4, ease: "easeOut" },
          }}
        />
      )}
    </ul>
  );
}
