'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { ModeToggle } from '../modeToggle';
import { Button } from '../ui/button';
import Navbar from './navbar';

// 确保导入cn函数

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed z-50 w-screen">
      <div
        className={cn(
          'grid h-[5rem] grid-cols-3 items-center',
          'px-10 md:px-20 lg:px-40',
          isOpen
            ? 'bg-pink-200/80 dark:bg-black/80'
            : 'bg-gradient-to-t from-transparent via-pink-200/60 to-pink-200/80 dark:via-black/60 dark:to-black/80',
          isOpen ? 'backdrop-blur-md' : 'backdrop-blur-sm'
        )}
      >
        <div className="flex items-center justify-start">
          <Link href="/" className="text-xl font-bold">
            WenNya
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center md:flex">
          <Navbar />
        </div>

        {/* Mobile Navigation */}
        <div className="col-span-2 flex items-center justify-end gap-4 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              '!bg-transparent',
              'hover:!bg-pink-300/10',
              'dark:hover:!bg-cyan-900/30'
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </motion.div>
          </Button>
        </div>

        {/* Desktop Mode Toggle */}
        <div className="hidden items-center justify-end md:flex">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={cn(
              'absolute left-0 right-0 top-[5rem] md:hidden',
              'backdrop-blur-md',
              'overflow-hidden',
              'border-t-[1px] border-pink-300 dark:border-cyan-950'
            )}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className={cn('px-10 py-8', 'bg-pink-200/80 dark:bg-black/80')}
            >
              <Navbar mobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
