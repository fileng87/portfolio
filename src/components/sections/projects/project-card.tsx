import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, GitFork, Globe, Star } from 'lucide-react';
import Image from 'next/image';

import { CommitHeatmap } from './commit-heatmap';
import { GitHubRepo } from './types';

interface ProjectCardProps {
  repo: GitHubRepo;
  className?: string;
}

export const ProjectCard = ({ repo, className }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        margin: '-10%',
        amount: 0.1,
      }}
      transition={{
        opacity: { duration: 0.4, ease: 'easeOut' },
        y: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
      }}
      className="h-full will-change-transform"
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
        }}
      >
        <Card
          className={cn(
            className,
            'relative border-pink-300/50 bg-white/10 backdrop-blur-sm dark:border-cyan-900/50 dark:bg-gray-800/10',
            'shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]',
            'flex h-full max-h-[28rem] min-h-[28rem] flex-col',
            'transform-gpu' // 使用 GPU 加速
          )}
        >
          <CardHeader className="flex flex-none flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="line-clamp-1 text-xl font-bold">
              {repo.name}
            </CardTitle>
            <div className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-pink-300/50 dark:border-cyan-900/50">
              <Image
                src={repo.ownerAvatar}
                alt="Owner avatar"
                width={40}
                height={40}
                className="size-full object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between gap-4">
            <p className="line-clamp-3 text-gray-700 dark:text-gray-300">
              {repo.description || 'No description available'}
            </p>
            <div className="mt-auto flex flex-col justify-end gap-4">
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 3).map((topic, i) => (
                  <div key={i}>
                    <Badge
                      variant="secondary"
                      className="bg-pink-100 dark:bg-cyan-900/30"
                    >
                      {topic}
                    </Badge>
                  </div>
                ))}
                {repo.topics.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-pink-100/50 dark:bg-cyan-900/20"
                  >
                    +{repo.topics.length - 3}
                  </Badge>
                )}
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 text-yellow-500" />
                    <span>{repo.stars}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <GitFork className="size-4 text-blue-500" />
                    <span>{repo.forks}</span>
                  </div>

                  {repo.openIssues > 0 && (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="size-4 text-red-500" />
                      <span>{repo.openIssues}</span>
                    </div>
                  )}

                  <div className="ml-auto flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="size-3" />
                    <span title={new Date(repo.updatedAt).toLocaleDateString()}>
                      {formatDistanceToNow(new Date(repo.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {repo.isArchived && (
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-500 dark:bg-gray-800/50"
                    >
                      Archived
                    </Badge>
                  )}
                </div>

                {repo.commitActivity && (
                  <CommitHeatmap activity={repo.commitActivity} />
                )}

                {repo.languages && repo.languages.length > 0 ? (
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200/30 backdrop-blur-sm dark:bg-gray-700/30">
                      {repo.languages.map((lang, i) => (
                        <div
                          key={i}
                          className="h-full"
                          style={{
                            width: `${lang.percentage}%`,
                            backgroundColor: `${lang.color}`,
                          }}
                          title={`${lang.name}: ${lang.percentage}%`}
                        ></div>
                      ))}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-700 dark:text-gray-300">
                      {repo.languages.slice(0, 3).map((lang, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span
                            className="size-2 rounded-full"
                            style={{
                              backgroundColor: lang.color,
                            }}
                          ></span>
                          <span>{lang.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {lang.percentage}%
                          </span>
                        </div>
                      ))}
                      {repo.languages.length > 3 && (
                        <span className="text-gray-500 dark:text-gray-400">
                          +{repo.languages.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-8 w-full items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      No language data available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <motion.a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'text-pink-500 dark:text-cyan-500',
                'transition-colors duration-200',
                'hover:underline'
              )}
            >
              GitHub
            </motion.a>
            {repo.homepage && (
              <motion.a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2',
                  'text-pink-500 dark:text-cyan-500',
                  'transition-colors duration-200',
                  'hover:underline'
                )}
              >
                <Globe className="size-4" />
                Live Demo
              </motion.a>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};
