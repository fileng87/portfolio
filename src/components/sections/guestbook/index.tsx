'use client';

import { motion } from 'framer-motion';
import { containerVariants } from './variants';
import { Card, CardContent } from '@/components/ui/card';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

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
          className="mx-auto max-w-5xl space-y-12"
        >
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Guestbook</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Leave a message, share your thoughts, or just say hi!
            </p>
          </div>

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
