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
  // Drift up at half speed, blur and fade out before the sheet reaches the
  // content
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-50vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  // No filter at rest, so the hero isn't kept on a filtered layer
  const filter = useTransform(scrollYProgress, (p) =>
    p > 0 ? `blur(${Math.min(p / 0.4, 1) * 6}px)` : "none",
  );

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
              : { opacity: contentOpacity, y, scale, filter }
          }
        >
          {hero}
        </motion.div>
      </div>
      <div ref={contentRef} className="relative z-10 bg-background">
        {/* Pinned to the top once the sheet reaches it; content scrolling up
            fades out under it (see `scroll-edge` in globals.css) */}
        <div aria-hidden className="pointer-events-none sticky top-0 z-20 h-0">
          <div className="scroll-edge" />
        </div>
        {children}
      </div>
    </>
  );
}
