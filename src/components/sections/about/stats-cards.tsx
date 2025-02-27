import type { WakaTimeData } from '@/app/api/wakatime/stats/route';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatWakaTime } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

import { itemVariants } from '../variants';

interface GithubStatsData {
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributedTo: number;
}

interface StatsCardsProps {
  cardClassName: string;
  githubStats: GithubStatsData | null;
  wakaStats: WakaTimeData;
  githubLoading: boolean;
  wakaLoading: boolean;
  githubError: Error | null;
  wakaError: Error | null;
}

export function StatsCards({
  cardClassName,
  githubStats,
  wakaStats,
  githubLoading,
  wakaLoading,
  githubError,
  wakaError,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Skills Card */}
      <Card className={cn(cardClassName, 'h-full')}>
        <CardHeader>
          <CardTitle>./skills.md</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 overflow-hidden">
            <div>
              <h4 className="mb-2 font-mono text-sm">Frontend:</h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm">Backend:</h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>Express</li>
                <li>NestJS</li>
                <li>FastAPI</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm">Tools:</h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>Git</li>
                <li>VS Code</li>
                <li>Docker</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Statistics Card */}
      <Card className={cn(cardClassName, 'h-full')}>
        <CardHeader>
          <CardTitle>./github_stats.md</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {githubLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </motion.div>
            ) : githubError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-4"
              >
                <span className="text-red-500">
                  Failed to load GitHub stats
                </span>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                {githubError ? (
                  <div className="flex justify-center py-4">
                    <span className="text-red-500">
                      Failed to load GitHub stats
                    </span>
                  </div>
                ) : !githubStats ? (
                  <div className="flex justify-center py-4">
                    <span className="text-gray-400">No data available</span>
                  </div>
                ) : (
                  githubStats && (
                    <>
                      {[
                        {
                          label: 'Total Stars',
                          value: githubStats.totalStars,
                        },
                        {
                          label: 'Total Commits',
                          value: githubStats.totalCommits,
                        },
                        {
                          label: 'Total PRs',
                          value: githubStats.totalPRs,
                        },
                        {
                          label: 'Total Issues',
                          value: githubStats.totalIssues,
                        },
                        {
                          label: 'Contributed to (last year)',
                          value: `${githubStats.contributedTo}`,
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label + index}
                          variants={itemVariants}
                          className="flex items-center justify-between"
                        >
                          <span className="w-32 font-mono text-sm text-gray-600 dark:text-gray-400">
                            {stat.label}
                          </span>
                          <span className="font-mono text-xl text-pink-500 dark:text-cyan-500">
                            {stat.value}
                          </span>
                        </motion.div>
                      ))}
                    </>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="md:col-span-2 lg:col-span-1">
        {/* WakaTime Card */}
        <Card className={cn(cardClassName, 'h-full')}>
          <CardHeader>
            <CardTitle>./coding_time.md</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-0">
            <AnimatePresence mode="wait">
              {wakaLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={'loading' + i} className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </motion.div>
              ) : wakaError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-4"
                >
                  <span className="text-red-500">
                    Failed to load WakaTime stats
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {wakaError ? (
                    <div className="flex justify-center py-4">
                      <span className="text-red-500">
                        Failed to load WakaTime stats
                      </span>
                    </div>
                  ) : !wakaStats ? (
                    <div className="flex justify-center py-4">
                      <span className="text-gray-400">No data available</span>
                    </div>
                  ) : (
                    wakaStats && (
                      <>
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center justify-between"
                        >
                          <span className="w-32 font-mono text-sm text-gray-600 dark:text-gray-400">
                            Total Time
                          </span>
                          <span className="font-mono text-xl text-pink-500 dark:text-cyan-500">
                            {formatWakaTime(wakaStats.human_readable_total)}
                          </span>
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center justify-between"
                        >
                          <span className="w-32 font-mono text-sm text-gray-600 dark:text-gray-400">
                            Daily Average
                          </span>
                          <span className="font-mono text-xl text-pink-500 dark:text-cyan-500">
                            {formatWakaTime(
                              wakaStats.human_readable_daily_average
                            )}
                          </span>
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center justify-between"
                        >
                          <span className="w-32 font-mono text-sm text-gray-600 dark:text-gray-400">
                            Active Days
                          </span>
                          <span className="font-mono text-xl text-pink-500 dark:text-cyan-500">
                            {wakaStats.days_minus_holidays}d
                          </span>
                        </motion.div>
                        {wakaStats.languages.slice(0, 3).map((lang, index) => (
                          <motion.div
                            key={lang.name + index}
                            variants={itemVariants}
                            className="flex items-center justify-between"
                          >
                            <span className="w-32 font-mono text-sm text-gray-600 dark:text-gray-400">
                              {lang.name}
                            </span>
                            <span className="font-mono text-xl text-pink-500 dark:text-cyan-500">
                              {formatWakaTime(lang.text)}
                            </span>
                          </motion.div>
                        ))}
                      </>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
