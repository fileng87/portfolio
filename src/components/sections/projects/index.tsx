'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TextScramble } from '@/components/textScramble';
import { useQuery } from '@tanstack/react-query';
import { ProjectCard } from './project-card';
import { ProjectSkeleton } from './project-skeleton';
import { containerVariants, itemVariants, cardVariants } from './variants';
import { fetchRepos } from './api';

export default function Projects() {
  const { data: repos, isLoading } = useQuery({
    queryKey: ['repos'],
    queryFn: fetchRepos,
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const projectItems = useMemo(() => {
    if (!repos) return null;

    return repos.map((repo, index) => (
      <CarouselItem key={repo.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-25px', // 減少margin值
            amount: 0.3, // 只需要顯示30%就觸發動畫
          }}
          custom={index}
          transition={{
            delay: Math.min(index * 0.03, 0.2), // 減少延遲時間
            duration: 0.5, // 添加動畫持續時間
          }}
          className="h-full"
        >
          <ProjectCard repo={repo} />
        </motion.div>
      </CarouselItem>
    ));
  }, [repos]);

  // 優化 skeleton 渲染
  const skeletons = useMemo(
    () => (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="pl-4">
            <ProjectSkeleton />
          </div>
        ))}
      </div>
    ),
    []
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
              className="font-mono text-4xl font-bold after:ml-2 after:animate-cursor after:content-['\\|']"
              animate="animate"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.3 }} // 添加過渡時間
          >
            {isLoading ? (
              skeletons
            ) : (
              <Carousel
                className="w-full"
                opts={{
                  dragFree: true,
                  skipSnaps: true,
                  containScroll: 'trimSnaps', // 改善滾動行為
                }}
              >
                <CarouselContent className="-ml-4 flex h-full px-2 py-4">
                  {projectItems}
                </CarouselContent>
                <CarouselPrevious
                  className="left-2 border-pink-300/50 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 dark:border-cyan-900/50 dark:bg-gray-800/10 dark:hover:bg-gray-800/20 lg:-left-12"
                  variant="outline"
                >
                  <ChevronLeft className="size-4 text-pink-500 dark:text-cyan-500" />
                </CarouselPrevious>
                <CarouselNext
                  className="right-2 border-pink-300/50 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 dark:border-cyan-900/50 dark:bg-gray-800/10 dark:hover:bg-gray-800/20 lg:-right-12"
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
