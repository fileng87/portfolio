'use client';

import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="sticky inset-0 -z-10 size-full overflow-hidden bg-pink-50 backdrop-blur-3xl dark:bg-[#0D0E13]">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [0.8, 1.2, 0.8],
          x: [-40, 0, -40],
          y: [-40, 0, -40],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-40 -top-60 size-[800px] rounded-full bg-gradient-to-br from-pink-300/50 via-rose-300/50 to-purple-300/50 blur-[180px] dark:from-purple-600/50 dark:via-cyan-400/50 dark:to-emerald-400/50"
      />
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.4, 1],
          x: [0, 40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-60 -top-80 size-[1000px] rounded-full bg-gradient-to-r from-rose-300/50 via-fuchsia-400/50 to-violet-300/50 blur-[200px] dark:from-indigo-500/50 dark:via-purple-500/50 dark:to-pink-500/50"
      />
      <div className="absolute inset-0 bg-white/15 backdrop-blur-[3px] dark:bg-[#0D0E13]/50" />
    </div>
  );
}
