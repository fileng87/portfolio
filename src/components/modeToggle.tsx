'use client';

import * as React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // 在組件掛載後再顯示
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 避免服務器端渲染時的閃爍
  if (!mounted) {
    return (
      <button className="rounded-full border-none p-2 shadow-none transition-all duration-300 hover:scale-110 hover:bg-primary/10 active:scale-95">
        <div className="size-[1.2rem]" />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className="rounded-full border-none p-2 shadow-none transition-all duration-300 hover:scale-110 hover:bg-primary/10 active:scale-95"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="size-[1.2rem]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="size-[1.2rem]" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
