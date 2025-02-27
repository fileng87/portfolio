'use client';

import { useEffect, useMemo, useState } from 'react';

import { TextScramble } from '@/components/textScramble';
import { type CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code2 } from 'lucide-react';

import { fetchRepos } from './api';
import { ProjectCard } from './project-card';
import { ProjectSkeleton } from './project-skeleton';
import { cardVariants, containerVariants, itemVariants } from './variants';

export default function Projects() {
  const [api, setApi] = useState<CarouselApi>();
  const [autoPlay, setAutoPlay] = useState(true);
  const { data: repos, isLoading } = useQuery({
    queryKey: ['repos'],
    queryFn: fetchRepos,
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  // Handle auto-play
  useEffect(() => {
    if (!api || !repos || !autoPlay) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [api, repos, autoPlay]);

  // Handle user interaction
  useEffect(() => {
    if (!api) return;

    const onMouseEnter = () => setAutoPlay(false);
    const onMouseLeave = () => setAutoPlay(true);
    const onTouchStart = () => setAutoPlay(false);
    const onTouchEnd = () => {
      setTimeout(() => setAutoPlay(true), 5); // Resume after 2 seconds
    };

    const element = api.rootNode();
    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [api]);

  const projectItems = useMemo(() => {
    if (!repos) return null;

    return repos.map((repo, index) => (
      <CarouselItem
        key={repo.name}
        className={cn('pl-4 md:basis-1/2 lg:basis-1/3')}
      >
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{
            once: true,
            margin: '-25px', // 減少margin值
            amount: 0.3, // 只需要顯示30%就觸發動畫
          }}
          custom={index}
          transition={{
            delay: Math.min(index * 0.3, 1.2), // 延遲時間加倍
            duration: 1.2, // 動畫持續時間加長
            ease: [0.16, 1, 0.3, 1], // 使用自定義的緩動曲線，讓動畫更平滑
          }}
          className="h-full"
        >
          <ProjectCard repo={repo} />
        </motion.div>
      </CarouselItem>
    ));
  }, [repos]);

  const carouselButtonClass = cn(
    'border-pink-300/50 bg-white/10 backdrop-blur-sm',
    'transition-colors duration-200 ease-out',
    'hover:bg-white/20 active:bg-white/30',
    'dark:border-cyan-900/50 dark:bg-gray-800/10',
    'dark:hover:bg-gray-800/20 dark:active:bg-gray-800/30'
  );

  return (
    <div className="relative mb-20 flex items-center justify-center overflow-hidden pt-header">
      <div className="container relative mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2, // 減少觸發閾值
          }}
          className="mx-auto max-w-5xl space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <Code2 className="size-8 text-pink-500 dark:text-cyan-500" />
            <TextScramble
              segments={[{ text: '$ ls ./projects', duration: 1000 }]}
              className="font-mono text-4xl font-bold after:ml-2 after:animate-cursor after:content-['|']"
              animate="animate"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.3 }} // 添加過渡時間
          >
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={cn('pl-4 transition-opacity duration-300', {
                      'hidden md:block': i === 1,
                      'hidden lg:block': i === 2,
                    })}
                  >
                    <ProjectSkeleton />
                  </div>
                ))}
              </div>
            ) : (
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  dragFree: true,
                  skipSnaps: true,
                  containScroll: 'trimSnaps',
                  loop: true, // Enable infinite loop
                }}
              >
                <CarouselContent className="-ml-4 flex h-full px-2 py-4">
                  {projectItems}
                </CarouselContent>
                <CarouselPrevious
                  className={cn(carouselButtonClass, 'left-2 lg:-left-12')}
                  variant="outline"
                >
                  <ChevronLeft className="size-4 text-pink-500 dark:text-cyan-500" />
                </CarouselPrevious>
                <CarouselNext
                  className={cn(carouselButtonClass, 'right-2 lg:-right-12')}
                  variant="outline"
                >
                  <ChevronRight className="size-4 text-pink-500 dark:text-cyan-500" />
                </CarouselNext>
              </Carousel>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
