"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";

// Fades a section out and lifts it away as its end scrolls up past the middle
// of the screen, handing the stage to the next one. Tied to scroll, so it
// plays back when scrolling up.
export function SectionExit({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end 60%", "end 15%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? { opacity } : { opacity, y }}
    >
      {children}
    </motion.div>
  );
}
