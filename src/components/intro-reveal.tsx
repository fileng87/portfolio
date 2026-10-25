"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useState } from "react";
import { useHeroInView } from "@/hooks/use-hero-in-view";
import { useIntroStore } from "@/stores/intro";

// Fades its children in as part of the page entrance; renders them as-is
// once the intro has played. Opacity only: a transform or filter here would
// become the containing block of fixed-position children such as the nav.
// With `waitForHero`, the delay counts from when the hero intro starts;
// otherwise from page load, and a page opened away from the hero (a
// #section link) shows them at once.
export function IntroReveal({
  delay,
  duration = 1,
  waitForHero = false,
  className,
  children,
}: {
  delay: number;
  duration?: number;
  waitForHero?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  // Snapshot at mount: flipping the flag later must not re-hide anything
  const [played] = useState(() => useIntroStore.getState().played);
  const started = useIntroStore((s) => s.played);
  const heroInView = useHeroInView();
  const show = played || (waitForHero ? started : heroInView !== undefined);

  return (
    <motion.div
      className={className}
      initial={played || reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={
        heroInView === false
          ? { duration: 0 }
          : { delay, duration, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}
