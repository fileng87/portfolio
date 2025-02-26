'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { TextScramble } from '../../textScramble';
import { RotatingEmoji } from './rotatingEmoji';

export default function Hero() {
  const [isAnimating, setAnimating] = useState(true);

  // 保留文字排版相關的動畫配置
  const lineVariants = {
    initial: { width: 0, opacity: 0 },
    animate: {
      width: '12rem',
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
  };

  const glitchAnimation = {
    animate: {
      textShadow: [
        '0 0 0 #00ffff',
        '2px 2px 0 #ff00ff',
        '-2px -2px 0 #00ffff',
        '0 0 0 #00ffff',
      ],
      x: ['0px', '-2px', '2px', '0px'],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: 'mirror' as const,
      },
    },
  };

  const springTransition = {
    type: 'spring',
    stiffness: 70,
    damping: 15,
    mass: 1.8,
    velocity: 0.3,
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center space-y-4 pt-header">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center gap-4 px-8 text-4xl font-bold tracking-tight md:text-5xl lg:px-0 lg:text-6xl"
      >
        {/* 左上角線條 */}
        <motion.div
          initial="initial"
          animate={isAnimating ? 'initial' : 'animate'}
          variants={lineVariants}
          style={{ transformOrigin: 'left' }}
          className="shadow-glow absolute -left-20 -top-8 hidden h-[2px] bg-pink-300 dark:bg-cyan-500 lg:block"
        />

        {/* 保留文字排版動畫 */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 font-mono lg:gap-8"
          layout
          transition={springTransition}
        >
          <motion.div layout transition={springTransition}>
            <TextScramble
              segments={[{ text: 'JUST CODE FOR FUN', duration: 2000 }]}
              className="relative whitespace-nowrap"
              onAnimationStart={() => setAnimating(true)}
              onAnimationEnd={() => setAnimating(false)}
              variants={glitchAnimation}
              animate="animate"
              renderText={(text) =>
                text.split('').map((char, index) => {
                  if (index >= 5 && index <= 8) {
                    return (
                      <span key={index} className="text-blue-500">
                        {char}
                      </span>
                    );
                  }
                  if (index >= 13 && index <= 16) {
                    return (
                      <span key={index} className="text-green-500">
                        {char}
                      </span>
                    );
                  }
                  return <span key={index}>{char}</span>;
                })
              }
            />
          </motion.div>

          {!isAnimating && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                opacity: { duration: 1.2 },
                x: { duration: 0.8, ease: 'easeOut' },
                layout: springTransition,
              }}
            >
              <RotatingEmoji emojis={['🍍', '😀', '💀']} interval={3000} />
            </motion.div>
          )}
        </motion.div>

        {/* 右下角線條 */}
        <motion.div
          initial="initial"
          animate={isAnimating ? 'initial' : 'animate'}
          variants={lineVariants}
          style={{ transformOrigin: 'right' }}
          className="shadow-glow absolute -bottom-8 -right-20 hidden h-[2px] bg-pink-300 dark:bg-cyan-500 lg:block"
        />
      </motion.h1>

      {/* Subtitle */}
      <div
        className={cn(
          'font-mono text-base text-gray-600 dark:text-gray-400',
          'transform transition-all duration-500 ease-out',
          !isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        Ctrl+C Ctrl+V Developer
      </div>

      {/* 滾動指示器改用 Tailwind */}
      <div className="absolute bottom-14">
        <Link href="#about">
          <div className="group flex h-10 w-7 cursor-pointer justify-center rounded-full border-2 border-black p-[0.3rem] transition-transform duration-200 hover:scale-105 active:scale-95 dark:border-gray-300">
            <div className="h-[0.4rem] w-1 animate-bounce rounded-full bg-black transition-transform duration-200 group-hover:translate-y-0 group-active:translate-y-0.5 dark:bg-gray-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}
