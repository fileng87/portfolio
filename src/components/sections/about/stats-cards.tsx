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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Skills Card */}
      <Card className={cn(cardClassName, 'h-full')}>
        <CardHeader>
          <CardTitle>./skills.md</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 overflow-hidden">
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">
                Frontend:
              </h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Vite</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">
                Backend & API:
              </h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>Express</li>
                <li>NestJS</li>
                <li>FastAPI</li>
                <li>REST API</li>
                <li>WebSocket</li>
                <li>GraphQL</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">
                Database:
              </h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Redis</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">
                Infrastructure:
              </h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>Linux</li>
                <li>Proxmox</li>
                <li>Docker</li>
                <li>Git</li>
                <li>Grafana</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">
                Security & Network:
              </h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>SSL/TLS</li>
                <li>OAuth/JWT</li>
                <li>TCP/IP</li>
                <li>VPN</li>
                <li>Firewall</li>
                <li>Load Balancer</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">AI:</h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>LangChain</li>
                <li>LangGraph</li>
                <li>Prompt Engineering</li>
                <li>MCP</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">
                Learning:
              </h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>CI/CD</li>
                <li>Kubernetes</li>
                <li>AWS/Azure</li>
                <li>Vue.js</li>
                <li>PHP</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm font-semibold">Tools:</h4>
              <ul className="list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
                <li>VS Code</li>
                <li>Postman</li>
                <li>Discord</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right column with two stacked cards */}
      <div className="flex flex-col gap-4">
        {/* GitHub Stats Card */}
        <Card className={cn(cardClassName, 'flex-1')}>
          <CardHeader>
            <CardTitle>./github_stats.md</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {githubLoading ? (
                <motion.div
                  key="github-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </motion.div>
              ) : githubError ? (
                <motion.div
                  key="github-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-4"
                >
                  <span className="text-red-500 text-sm">
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
                      <span className="text-red-500 text-sm">
                        Failed to load GitHub stats
                      </span>
                    </div>
                  ) : !githubStats ? (
                    <div className="flex justify-center py-4">
                      <span className="text-gray-400 text-sm">
                        No data available
                      </span>
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
                            label: 'Contributed to',
                            value: `${githubStats.contributedTo}`,
                          },
                        ].map((stat, index) => (
                          <motion.div
                            key={stat.label + index}
                            variants={itemVariants}
                            className="flex items-center justify-between"
                          >
                            <span className="font-mono text-base text-gray-600 dark:text-gray-400">
                              {stat.label}
                            </span>
                            <span className="font-mono text-lg text-pink-500 dark:text-cyan-500">
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

        {/* WakaTime Stats Card */}
        <Card className={cn(cardClassName, 'flex-1')}>
          <CardHeader>
            <CardTitle>./wakatime_stats.md</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {wakaLoading ? (
                <motion.div
                  key="waka-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={'loading' + i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </motion.div>
              ) : wakaError ? (
                <motion.div
                  key="waka-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-4"
                >
                  <span className="text-red-500 text-sm">
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
                      <span className="text-red-500 text-sm">
                        Failed to load WakaTime stats
                      </span>
                    </div>
                  ) : !wakaStats ? (
                    <div className="flex justify-center py-4">
                      <span className="text-gray-400 text-sm">
                        No data available
                      </span>
                    </div>
                  ) : (
                    wakaStats && (
                      <>
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center justify-between"
                        >
                          <span className="font-mono text-base text-gray-600 dark:text-gray-400">
                            Total Time
                          </span>
                          <span className="font-mono text-lg text-pink-500 dark:text-cyan-500">
                            {formatWakaTime(wakaStats.human_readable_total)}
                          </span>
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center justify-between"
                        >
                          <span className="font-mono text-base text-gray-600 dark:text-gray-400">
                            Daily Average
                          </span>
                          <span className="font-mono text-lg text-pink-500 dark:text-cyan-500">
                            {formatWakaTime(
                              wakaStats.human_readable_daily_average
                            )}
                          </span>
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center justify-between"
                        >
                          <span className="font-mono text-base text-gray-600 dark:text-gray-400">
                            Active Days
                          </span>
                          <span className="font-mono text-lg text-pink-500 dark:text-cyan-500">
                            {wakaStats.days_minus_holidays}d
                          </span>
                        </motion.div>
                        {wakaStats.languages.slice(0, 3).map((lang, index) => (
                          <motion.div
                            key={lang.name + index}
                            variants={itemVariants}
                            className="flex items-center justify-between"
                          >
                            <span className="font-mono text-base text-gray-600 dark:text-gray-400">
                              {lang.name}
                            </span>
                            <span className="font-mono text-lg text-pink-500 dark:text-cyan-500">
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
