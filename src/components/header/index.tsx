'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { ModeToggle } from '../modeToggle';
import { Button } from '../ui/button';
import Navbar from './navbar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // 關閉菜單的函數
  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed z-50 w-screen"
    >
      <div
        className={cn(
          'grid h-[5rem] grid-cols-3 items-center',
          'px-10 md:px-20 lg:px-40',
          isOpen
            ? 'bg-pink-200/80 dark:bg-black/80'
            : 'bg-gradient-to-t from-transparent via-pink-200/60 to-pink-200/80 dark:via-black/60 dark:to-black/80',
          isOpen ? 'backdrop-blur-md' : 'backdrop-blur-sm',
          'transition-colors duration-300' // 添加過渡效果
        )}
      >
        {/* 左側 */}
        <div className="flex items-center justify-start">
          <Link href="/" className="text-xl font-bold">
            WenNya
          </Link>
        </div>

        {/* 中間 - 在桌面顯示導航 */}
        <div className="hidden items-center justify-center md:flex">
          <Navbar />
        </div>

        {/* 右側 */}
        <div className="col-span-2 flex items-center justify-end gap-4 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              '!bg-transparent',
              'hover:!bg-pink-300/10',
              'dark:hover:!bg-cyan-900/20'
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={cn(
                'transition-transform duration-200',
                isOpen ? 'rotate-90' : 'rotate-0'
              )}
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </div>
          </Button>
        </div>

        {/* Desktop Mode Toggle */}
        <div className="hidden items-center justify-end md:flex">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-x-0 top-20 overflow-hidden border-t border-pink-300 dark:border-cyan-950 md:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                delay: 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="bg-pink-200/80 px-10 py-8 backdrop-blur-md dark:bg-black/80"
            >
              <Navbar mobile onLinkClick={handleCloseMenu} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
