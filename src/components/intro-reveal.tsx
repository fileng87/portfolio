"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useState } from "react";
import { useIntroStore } from "@/stores/intro";

// Fades its children in as part of the page entrance; renders them as-is
// once the intro has played. Opacity only: a transform or filter here would
// become the containing block of fixed-position children such as the nav.
export function IntroReveal({
  delay,
  duration = 1,
  className,
  children,
}: {
  delay: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  // Snapshot at mount: flipping the flag later must not re-hide anything
  const [played] = useState(() => useIntroStore.getState().played);

  return (
    <motion.div
      className={className}
      initial={played || reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
