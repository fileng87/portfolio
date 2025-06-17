'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { TextScramble } from '../../textScramble';
import { containerVariants, itemVariants } from '../variants';
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
    type: 'spring' as const,
    stiffness: 70,
    damping: 15,
    mass: 1.8,
    velocity: 0.3,
  };

  const mouseVariants = {
    hover: {
      scale: 1.05,
    },
    tap: { scale: 0.95 },
  };

  const wheelVariants = {
    hover: {
      y: 0,
      transition: { duration: 0.3 },
    },
    tap: {
      y: 2,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden pt-header">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          margin: '-10%',
          amount: 0.1,
        }}
        variants={containerVariants}
        className="container flex flex-col items-center justify-center space-y-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', bounce: 0.5 }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={springTransition}
          >
            <motion.div layout transition={springTransition}>
              <TextScramble
                segments={[{ text: 'JUST CODE FOR FUN', duration: 2000 }]}
                className="relative text-center"
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
                className="flex items-center"
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
            'px-4 lg:px-0',
            'font-mono text-base text-gray-600 dark:text-gray-400 text-center',
            'transform transition-all duration-500 ease-out',
            !isAnimating
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          )}
        >
          Ctrl+C Ctrl+V Developer
        </div>

        {/* 滾動指示器改用 Tailwind */}
        <motion.div variants={itemVariants} className="absolute bottom-14">
          <Link href="#about">
            <motion.div
              className="flex h-10 w-7 cursor-pointer justify-center rounded-full border-2 border-black p-[0.3rem] dark:border-gray-300"
              whileHover="hover"
              whileTap="tap"
              variants={mouseVariants}
            >
              <motion.div
                className="h-[0.4rem] w-1 rounded-full bg-black dark:bg-gray-300"
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.3, 1],
                  ease: ['easeIn', 'easeOut'],
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
                variants={wheelVariants}
              />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
