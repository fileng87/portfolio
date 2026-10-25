"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// With "reduce motion" on, motion skips transform animations site-wide and
// keeps the fades
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
