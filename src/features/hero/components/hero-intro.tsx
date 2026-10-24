"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { useIntroStore } from "@/stores/intro";
import { cn } from "@/utils";
import { Typewriter } from "./typewriter";

// Critically damped (no overshoot): calm, per Apple's default for UI motion
const spring = { type: "spring", bounce: 0, duration: 0.9 } as const;

// The tagline types out alone at the centre, then the avatar arrives and
// pushes it aside (left on desktop, down on mobile).
export function HeroIntro({
  tagline,
  name,
  avatar,
}: {
  tagline: string[];
  name: string;
  avatar: ReactNode;
}) {
  // Read once: after the first visit's intro, remounts (e.g. switching
  // locale) render the final state directly instead of replaying it
  const [skip] = useState(() => useIntroStore.getState().played);
  const [revealed, setRevealed] = useState(skip);
  const markPlayed = useIntroStore((s) => s.markPlayed);

  useEffect(() => {
    markPlayed();
  }, [markPlayed]);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col-reverse gap-10 px-8 md:flex-row md:items-center md:gap-20 md:pl-24",
        revealed
          ? "items-start md:justify-between"
          : "items-center md:justify-center",
      )}
    >
      <motion.div layout transition={spring} className="flex flex-col gap-6">
        {/* The tagline stays in English in every locale */}
        <h1
          lang="en"
          className="font-serif text-5xl leading-[1.05] font-light tracking-[-0.02em] sm:text-6xl md:whitespace-nowrap lg:text-7xl"
        >
          <Typewriter
            lines={tagline}
            wrap={revealed}
            skip={skip}
            onComplete={() => setRevealed(true)}
          />
        </h1>
        <motion.p
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xs tracking-[0.3em] text-muted-foreground"
        >
          {name}
        </motion.p>
      </motion.div>

      <AnimatePresence initial={!skip}>
        {revealed && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={spring}
          >
            {avatar}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
