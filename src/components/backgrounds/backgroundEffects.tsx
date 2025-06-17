'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
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
  const isLeft = id % 2 === 0;
  const baseX = isLeft ? -25 + Math.random() * 75 : 50 + Math.random() * 75;

  return {
    id,
    x: baseX,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.4,
    length: 10 + Math.random() * 20,
  };
};

const generateBubble = (id: number): LightBubble => {
  const isLeft = id % 2 === 0;
  const baseX = isLeft ? -25 + Math.random() * 75 : 50 + Math.random() * 75;

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

export default function BackgroundEffects() {
  const { resolvedTheme } = useTheme();

  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [bubbles, setBubbles] = useState<LightBubble[]>([]);
  const totalDrops = 25;
  const totalBubbles = 25;

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
      {/* 底部漸變光暈 - 使用CSS動畫替代motion.div */}
      <div
        className={cn(
          'absolute bottom-[-20%] h-[60%] w-[150%]',
          'bg-[radial-gradient(50%_100%_at_50%_100%,--theme(--color-white/0.8)_0%,--theme(--color-white/0.6)_30%,--theme(--color-white/0.4)_50%,--theme(--color-white/0.2)_70%,transparent_100%)]',
          'dark:bg-[radial-gradient(50%_100%_at_50%_100%,--theme(--color-blue-500/0.8)_0%,--theme(--color-blue-500/0.6)_30%,--theme(--color-blue-500/0.4)_50%,--theme(--color-blue-500/0.2)_70%,transparent_100%)]',
          'blur-[140px]',
          'animate-pulse-slow' // 自定義動畫類
        )}
      />

      {/* 背景漸變 */}
      <div className="absolute inset-0 bg-linear-to-t from-transparent via-pink-200/50 to-pink-200 opacity-80 transition-colors duration-300 dark:via-black/50 dark:to-black" />

      {/* 動態元素 - 雨滴和泡泡需要使用SVG動畫 */}
      <svg className="absolute inset-0 size-full">
        {resolvedTheme === 'dark' // 使用 resolvedTheme 替代 theme
          ? // Dark mode rain drops
            rainDrops.map((drop) => (
              <line
                key={drop.id}
                x1={`${drop.x}%`}
                y1="-10%"
                x2={`${drop.x}%`}
                y2={`${drop.length}%`}
                stroke="currentColor"
                className={cn('text-cyan-400/20', `animate-rain`)}
                strokeWidth="1"
                style={{
                  opacity: drop.opacity,
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                }}
              />
            ))
          : // Light mode floating bubbles
            bubbles.map((bubble) => (
              <circle
                key={bubble.id}
                cx={`${bubble.x}%`}
                cy="120%"
                r={bubble.size}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className={cn('text-pink-400/80', 'animate-float')}
                style={{
                  opacity: bubble.opacity,
                  filter: 'blur(0.5px)',
                  animationDelay: `${bubble.delay}s`,
                  animationDuration: `${bubble.duration}s`,
                }}
              />
            ))}
      </svg>
    </div>
  );
}
