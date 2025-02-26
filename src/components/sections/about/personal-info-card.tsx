import { Avatar } from '@/components/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

import { cardVariants, containerVariants } from './variants';

interface PersonalInfoCardProps {
  cardClassName: string;
}

export function PersonalInfoCards({ cardClassName }: PersonalInfoCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 gap-4 md:grid-cols-12"
    >
      {/* Avatar Card */}
      <motion.div
        variants={cardVariants}
        initial={false}
        className="md:col-span-3 lg:col-span-2"
      >
        <Card className={cn(cardClassName, 'h-full')}>
          <CardHeader>
            <CardTitle>./avatar.png</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col p-4 pt-0">
            <div className="relative aspect-square w-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key="avatar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center rounded-lg bg-pink-100/50 dark:bg-cyan-950/50"
                >
                  <Avatar
                    email="oscarcoll.930714@gmail.com"
                    className="size-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personal Info Card */}
      <motion.div
        variants={cardVariants}
        initial={false}
        className="md:col-span-9 lg:col-span-10"
      >
        <Card className={cn(cardClassName, 'h-full')}>
          <CardHeader>
            <CardTitle>./personal_info.txt</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence initial={false}>
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-700 dark:text-gray-300">
                  我喜歡研究奇奇怪怪的東西，是真的奇奇怪怪的東西，像是會嘴砲你的機器人之類的。然後我會畫畫，但我只有手癢才畫，所以不要叫我畫圖。最後我想說，我的網頁好好看喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔喔！！！！！
                </p>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
