import type { Variants } from "motion/react";

// Scroll reveals: rise into place while coming into focus, like ink settling.
// Critically damped, matching the hero's springs. `custom` adds a delay in
// seconds; within a RevealList the stagger sets it instead.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 1,
      ...(delay && { delay }),
    },
    // A leftover blur(0px) still makes a compositing layer that can soften text
    transitionEnd: { filter: "none" },
  }),
};

// A list reveals its items one after another, a beat after its title. The
// list itself fades in too, so its own borders don't show before the items.
export const revealList: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.15,
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

// Starts once this much of the element is on screen, so it plays in view
export const revealViewport = { once: true, amount: 0.2 } as const;
