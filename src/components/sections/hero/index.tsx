'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { TextScramble } from '../../textScramble';
import { RotatingEmoji } from './rotatingEmoji';

export default function Hero() {
  const [isAnimating, setAnimating] = useState(true);

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
          style={{ transformOrigin: 'left' }} // 改為從左邊開始
          className="shadow-glow absolute -left-20 -top-8 hidden h-[2px] bg-pink-300 dark:bg-cyan-500 lg:block"
        />
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 font-mono lg:gap-8"
          layout
          transition={{
            type: 'spring',
            stiffness: 70, // 降低彈性強度，讓動作更慢
            damping: 15, // 降低阻尼，增加柔順度
            mass: 1.8, // 增加質量，使移動更慢更平滑
            velocity: 0.3, // 降低初始速度
          }}
        >
          <motion.div
            layout
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
              mass: 1.8,
              velocity: 0.3,
            }}
          >
            <TextScramble
              segments={[{ text: 'JUST CODE FOR FUN', duration: 2000 }]}
              className="relative whitespace-nowrap"
              onAnimationStart={() => {
                setAnimating(true);
              }}
              onAnimationEnd={() => {
                setAnimating(false);
              }}
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
                opacity: { duration: 1.2 }, // 延長透明度過渡時間
                x: { duration: 0.8, ease: 'easeOut' }, // 延長位移時間
                layout: {
                  type: 'spring',
                  stiffness: 70,
                  damping: 15,
                  mass: 1.8,
                  velocity: 0.3,
                },
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
          style={{ transformOrigin: 'right' }} // 改為從右邊開始
          className="shadow-glow absolute -bottom-8 -right-20 hidden h-[2px] bg-pink-300 dark:bg-cyan-500 lg:block"
        />
      </motion.h1>

      {!isAnimating && (
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="translate-y-8 font-mono text-base text-gray-600 dark:text-gray-400"
        >
          Ctrl+C Ctrl+V Developer
        </motion.span>
      )}

      <div className="absolute bottom-14">
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
      </div>
    </div>
  );
}
