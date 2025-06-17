'use client';

import { TextScramble } from '@/components/textScramble';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

import { containerVariants, itemVariants } from '../variants';
import { fetchGitHubStats, fetchWakaTimeStats } from './api';
import { PersonalInfoCards } from './personal-info-card';
import { StatsCards } from './stats-cards';

const useGitHubStats = (username: string) => {
  return useQuery({
    queryKey: ['githubStats', username],
    queryFn: () => fetchGitHubStats(username),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};

const useWakaTimeStats = (username: string) => {
  return useQuery({
    queryKey: ['wakaTime', username],
    queryFn: () => fetchWakaTimeStats(username),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};

export default function About() {
  const {
    data: githubStats,
    isLoading: githubLoading,
    error: githubError,
  } = useGitHubStats('fileng87');

  const {
    data: wakaStats,
    isLoading: wakaLoading,
    error: wakaError,
  } = useWakaTimeStats('fileng87');

  const cardClassName =
    'relative border-pink-300/50 dark:border-cyan-900/50 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xs shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]';

  return (
    <div className="relative flex items-center justify-center overflow-hidden pt-header">
      <div className="container relative mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            margin: '-10%',
            amount: 0.1,
          }}
          variants={containerVariants}
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
              className="font-mono text-4xl font-bold after:ml-2 after:animate-cursor after:content-['|']"
              animate="animate"
            />
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-4">
            <PersonalInfoCards cardClassName={cardClassName} />
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
      </div>
    </div>
  );
}
