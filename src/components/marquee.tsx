'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  className?: string;
}

export function Marquee({ text, className }: MarqueeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      viewport={{
        margin: '-15%',
        amount: 0.1,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
      className="relative overflow-x-hidden"
    >
      <div className="animate-marquee whitespace-nowrap py-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={`mx-8 text-9xl font-bold italic tracking-tight ${className} text-transparent [-webkit-text-stroke:3px_var(--color-pink-300)] [text-shadow:5px_5px_0_--theme(--color-pink-300/0.3)] dark:text-transparent dark:[-webkit-text-stroke:3px_var(--color-cyan-500)] dark:[text-shadow:5px_5px_0_--theme(--color-cyan-500/0.3)]`}
          >
            {text}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
