"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import { reveal, revealList, revealViewport } from "@/constants/motion";

// Reveals its content once scrolled into view (see constants/motion.ts),
// `delay` seconds after
export function Reveal({
  delay,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      variants={reveal}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...props}
    />
  );
}

// A list whose RevealItems come in one after another once it's in view
export function RevealList(props: HTMLMotionProps<"ul">) {
  return (
    <motion.ul
      variants={revealList}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...props}
    />
  );
}

export function RevealItem(props: HTMLMotionProps<"li">) {
  return <motion.li variants={reveal} {...props} />;
}
