'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { TextScramble } from '@/components/textScramble';
import { useQuery } from '@tanstack/react-query';
import { containerVariants, itemVariants, cardVariants } from './variants';
import { fetchGitHubStats, fetchWakaTimeStats } from './api';
import { PersonalInfoCards } from './personal-info-card';
import { StatsCards } from './stats-cards';

export default function About() {
  const {
    data: githubStats,
    isLoading: githubLoading,
    error: githubError,
  } = useQuery({
    queryKey: ['githubStats', 'fileng87'],
    queryFn: () => fetchGitHubStats('fileng87'),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  const {
    data: wakaStats,
    isLoading: wakaLoading,
    error: wakaError,
  } = useQuery({
    queryKey: ['wakaTime', 'fileng87'],
    queryFn: () => fetchWakaTimeStats('fileng87'),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  const cardClassName =
    'relative border-pink-300/50 dark:border-cyan-900/50 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]';

  return (
    <div className="relative flex items-center justify-center overflow-hidden pt-header">
      <div className="container relative mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl space-y-12"
        >
          {/* Title */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <Terminal className="size-8 text-pink-500 dark:text-cyan-500" />
            <TextScramble
              segments={[{ text: '$ whoami', duration: 1000 }]}
              className="font-mono text-4xl font-bold after:ml-2 after:animate-cursor after:content-['\|']"
              animate="animate"
            />
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={cardVariants}>
              <PersonalInfoCards cardClassName={cardClassName} />
            </motion.div>

            <motion.div variants={cardVariants}>
              <StatsCards
                cardClassName={cardClassName}
                githubStats={githubStats}
                wakaStats={wakaStats}
                githubLoading={githubLoading}
                wakaLoading={wakaLoading}
                githubError={githubError}
                wakaError={wakaError}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
