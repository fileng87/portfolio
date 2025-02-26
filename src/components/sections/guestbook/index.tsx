'use client';

import { TextScramble } from '@/components/textScramble';
import { Card, CardContent } from '@/components/ui/card';
import Giscus from '@giscus/react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useTheme } from 'next-themes';

import { containerVariants, itemVariants } from './variants';

export default function Guestbook() {
  const { theme } = useTheme();

  return (
    <div className="relative flex items-center justify-center overflow-hidden pt-header">
      <div className="container relative mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl space-y-6"
        >
          <div className="flex items-center gap-4">
            <MessageSquare className="size-8 text-pink-500 dark:text-cyan-500" />
            <TextScramble
              segments={[
                { text: '$ cat', duration: 500 },
                { text: ' ~/guestbook/welcome.txt', duration: 1000 },
              ]}
              className="font-mono text-4xl font-bold after:ml-2 after:animate-cursor after:content-['|']"
              animate="animate"
            />
          </div>

          <motion.div variants={itemVariants}>
            <p className="font-mono text-base text-gray-600/90 dark:text-gray-400/90">
              <span className="text-pink-500/90 dark:text-cyan-500/90">
                {'>>'}
              </span>{' '}
              Leave a message, share your thoughts, or just say hi!
            </p>
          </motion.div>

          <Card className="border-pink-300/50 bg-white/10 backdrop-blur-sm dark:border-cyan-900/50 dark:bg-gray-800/10">
            <CardContent className="p-6">
              <Giscus
                id="comments"
                repo="fileng87/fileng87"
                repoId="R_kgDOGZvnlw"
                category="Announcements"
                categoryId="DIC_kwDOGZvnl84CYa4L"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                lang="zh-TW"
                loading="lazy"
                theme={`${process.env.NEXT_PUBLIC_BASE_URL}/giscus/${
                  theme == 'dark' ? 'dark' : 'light'
                }.css`}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
