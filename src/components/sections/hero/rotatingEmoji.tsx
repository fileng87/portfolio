import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RotatingEmojiProps {
  emojis: string[];
  interval?: number;
}

export function RotatingEmoji({ emojis, interval = 5000 }: RotatingEmojiProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationDuration = 0.2;

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setCurrentIndex((prev) => (prev + 1) % emojis.length);
      },
      interval - animationDuration * 1000
    );

    return () => clearTimeout(timer);
  }, [currentIndex, emojis.length, interval]);

  return (
    <div className="relative inline-block size-[1em]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ duration: animationDuration, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {emojis[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
