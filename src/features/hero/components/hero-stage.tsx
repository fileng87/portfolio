"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { IntroReveal } from "@/components/intro-reveal";
import { LeafShadow } from "./leaf-shadow";

// Keeps the hero pinned while the content slides up over it like a sheet.
export function HeroStage({
  hero,
  children,
}: {
  hero: ReactNode;
  children: ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "start start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Drift up at half speed and fade out before the sheet reaches the content
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-50vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <>
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* The backdrop only fades; scaling it would expose its edges */}
        <motion.div className="absolute inset-0" style={{ opacity }}>
          <IntroReveal delay={0} duration={2.4} className="absolute inset-0">
            <LeafShadow />
          </IntroReveal>
        </motion.div>
        <motion.div
          className="relative flex h-full flex-col justify-center"
          style={
            reduceMotion
              ? { opacity: contentOpacity }
              : { opacity: contentOpacity, y, scale }
          }
        >
          {hero}
        </motion.div>
      </div>
      <div ref={contentRef} className="relative z-10 bg-background">
        {/* Scroll edge: content fades out as it nears the top of the screen.
            On phones the band starts solid, so nothing scrolls under the
            fixed menu button and logo. */}
        <div aria-hidden className="pointer-events-none sticky top-0 z-20 h-0">
          <div className="h-28 bg-linear-to-b from-background from-[4.5rem] to-transparent md:from-0%" />
        </div>
        {children}
      </div>
    </>
  );
}
