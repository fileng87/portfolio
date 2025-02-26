import { useEffect, useRef, useState } from 'react';

import { type Variants, motion } from 'framer-motion';

const CHARACTERS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
  '0123456789' +
  '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

interface TextSegment {
  text: string;
  duration: number;
}

interface TextScrambleProps {
  segments: TextSegment[];
  className?: string;
  updateInterval?: number;
  stepSize?: number;
  scrambleSpeed?: number;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  renderText?: (text: string) => React.ReactNode;
  variants?: Variants;
  animate?: string;
}

export const TextScramble = ({
  segments,
  className = '',
  updateInterval = 50,
  stepSize = 1 / 3,
  scrambleSpeed = 2,
  onAnimationStart,
  onAnimationEnd,
  renderText,
  variants,
  animate,
}: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const hasStarted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          setIsAnimating(true);
          hasStarted.current = true;
          onAnimationStart?.();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [onAnimationStart]);

  useEffect(() => {
    if (!isAnimating || currentSegment >= segments.length) return;

    const { text, duration } = segments[currentSegment];
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const animate = () => {
      interval = setInterval(() => {
        setDisplayText(() => {
          const next = new Array(text.length).fill('');
          for (let i = 0; i < text.length; i++) {
            if (i < iteration) {
              next[i] = text[i];
            } else {
              for (let j = 0; j < scrambleSpeed; j++) {
                next[i] =
                  CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
              }
            }
          }
          return next.join('');
        });

        iteration += stepSize;

        if (iteration >= text.length) {
          clearInterval(interval);
          if (currentSegment < segments.length - 1) {
            setTimeout(() => {
              setCurrentSegment((prev) => prev + 1);
            }, duration);
          } else {
            // 立即觸發 onAnimationEnd
            setIsAnimating(false);
            onAnimationEnd?.();
          }
        }
      }, updateInterval);
    };

    animate();
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentSegment,
    updateInterval,
    stepSize,
    scrambleSpeed,
    isAnimating,
    onAnimationEnd,
  ]);

  return (
    <motion.div
      ref={containerRef}
      className={className}
      variants={variants}
      animate={animate}
    >
      {renderText ? renderText(displayText) : displayText}
    </motion.div>
  );
};
