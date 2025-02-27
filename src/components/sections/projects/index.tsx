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

import { containerVariants, itemVariants } from '../variants';
import { fetchRepos } from './api';
import { ProjectCard } from './project-card';
import { ProjectSkeleton } from './project-skeleton';

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

  // 優化自動播放邏輯
  useEffect(() => {
    if (!api || !repos || !autoPlay) return;

    const intervalId = setInterval(() => {
      requestAnimationFrame(() => {
        api.scrollNext();
      });
    }, 4000); // 增加間隔時間到4秒

    return () => clearInterval(intervalId);
  }, [api, repos, autoPlay]);

  // 優化觸摸事件處理
  useEffect(() => {
    if (!api) return;

    const element = api.rootNode();
    let touchTimeout: NodeJS.Timeout;

    const onMouseEnter = () => setAutoPlay(false);
    const onMouseLeave = () => setAutoPlay(true);
    const onTouchStart = () => {
      setAutoPlay(false);
      clearTimeout(touchTimeout);
    };
    const onTouchEnd = () => {
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => setAutoPlay(true), 2000); // 增加延遲時間
    };

    element.addEventListener('mouseenter', onMouseEnter, { passive: true });
    element.addEventListener('mouseleave', onMouseLeave, { passive: true });
    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchend', onTouchEnd);
      clearTimeout(touchTimeout);
    };
  }, [api]);

  const projectItems = useMemo(() => {
    if (!repos) return null;

    return repos.map((repo) => (
      <CarouselItem
        key={repo.name}
        className={cn('pl-4 md:basis-1/2 lg:basis-1/3')}
      >
        <div className="h-full">
          <ProjectCard repo={repo} />
        </div>
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          margin: '-10%',
          amount: 0.1,
        }}
        variants={containerVariants}
        className="container relative mx-auto max-w-5xl space-y-12 px-4 py-16"
      >
        <motion.div
          variants={itemVariants}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
          className="flex items-center gap-4"
        >
          <Code2 className="size-8 text-pink-500 dark:text-cyan-500" />
          <TextScramble
            segments={[{ text: '$ ls ./projects', duration: 1000 }]}
            className="font-mono text-4xl font-bold after:ml-2 after:animate-cursor after:content-['|']"
            animate="animate"
          />
        </motion.div>

        <div>
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
                dragFree: false,
                skipSnaps: false,
                containScroll: 'trimSnaps',
                loop: true,
                inViewThreshold: 0.5, // 添加視圖閾值
                dragThreshold: 10, // 增加拖動閾值
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
        </div>
      </motion.div>
    </div>
  );
}
