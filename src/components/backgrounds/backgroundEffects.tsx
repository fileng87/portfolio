'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface RainDrop {
  id: number;
  x: number;
  delay: number;
  duration: number;
  opacity: number;
  length: number;
}

interface LightBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const generateRainDrop = (id: number): RainDrop => {
  // 根據 id 決定是在左邊還是右邊
  const isLeft = id % 2 === 0;
  const baseX = isLeft
    ? -25 + Math.random() * 75 // 左半邊 (-25% 到 50%)
    : 50 + Math.random() * 75; // 右半邊 (50% 到 125%)

  return {
    id,
    x: baseX,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.4,
    length: 10 + Math.random() * 20,
  };
};

// 修改生成泡泡的函數
const generateBubble = (id: number): LightBubble => {
  // 根據 id 決定是在左邊還是右邊
  const isLeft = id % 2 === 0;
  const baseX = isLeft
    ? -25 + Math.random() * 75 // 左半邊 (-25% 到 50%)
    : 50 + Math.random() * 75; // 右半邊 (50% 到 125%)

  return {
    id,
    x: baseX,
    y: 120,
    size: 6 + Math.random() * 10,
    duration: 4 + Math.random() * 2,
    delay: Math.random() * 2,
    opacity: 0.5 + Math.random() * 0.3,
  };
};

const gradientVariants = {
  initial: {
    scale: 1,
    opacity: 0.7,
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function BackgroundEffects() {
  const { theme } = useTheme();

  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [bubbles, setBubbles] = useState<LightBubble[]>([]);
  const totalDrops = 25; // Reduced from 50 to 30 drops
  const totalBubbles = 25; // 從12改為20

  useEffect(() => {
    setRainDrops(
      Array.from({ length: totalDrops }, (_, i) => generateRainDrop(i))
    );
    setBubbles(
      Array.from({ length: totalBubbles }, (_, i) => generateBubble(i))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 flex h-screen w-screen justify-center overflow-hidden">
      <motion.div
        className={cn(
          // Position and size - using percentage based sizing and centering
          'absolute bottom-[-20%] h-[60%] w-[150%]',
          // Light mode gradient
          'bg-[radial-gradient(50%_100%_at_50%_100%,theme(colors.white/0.8)_0%,theme(colors.white/0.6)_30%,theme(colors.white/0.4)_50%,theme(colors.white/0.2)_70%,transparent_100%)]',
          // Dark mode gradient
          'dark:bg-[radial-gradient(50%_100%_at_50%_100%,theme(colors.blue.500/0.8)_0%,theme(colors.blue.500/0.6)_30%,theme(colors.blue.500/0.4)_50%,theme(colors.blue.500/0.2)_70%,transparent_100%)]',
          // Effects
          'blur-[140px]'
        )}
        variants={gradientVariants}
        initial="initial"
        animate="animate"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pink-200/50 to-pink-200 opacity-80 transition-colors duration-300 dark:via-black/50 dark:to-black" />

      <svg className="absolute inset-0 size-full">
        {theme === 'dark'
          ? // Dark mode rain drops
            rainDrops.map((drop) => (
              <motion.line
                key={drop.id}
                x1={`${drop.x}%`}
                y1="-10%"
                x2={`${drop.x}%`}
                y2={`${drop.length}%`}
                stroke="currentColor"
                className="text-cyan-400/20"
                strokeWidth="1"
                initial={{ y: '-100%' }}
                animate={{ y: '200%' }}
                transition={{
                  duration: drop.duration,
                  delay: drop.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ opacity: drop.opacity }}
              />
            ))
          : // Light mode floating bubbles
            // 修改泡泡的渲染部分
            bubbles.map((bubble) => (
              <motion.circle
                key={bubble.id}
                cx={`${bubble.x}%`}
                cy="120%" // 保持您的起始位置設定
                r={bubble.size}
                fill="none" // 改為空心
                stroke="currentColor" // 添加邊框
                strokeWidth="0.5" // 細邊框
                className="text-pink-400/80" // 改為白色並調整透明度
                initial={{
                  y: 0, // 保持您的設定
                }}
                animate={{
                  y: '-140%', // 保持您的設定
                }}
                transition={{
                  duration: bubble.duration,
                  delay: bubble.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  opacity: bubble.opacity,
                  filter: 'blur(0.5px)', // 添加輕微模糊效果
                }}
              />
            ))}
      </svg>
    </div>
  );
}
