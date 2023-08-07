'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import React from 'react';
import { MdOutlineWbSunny, MdOutlineDarkMode } from 'react-icons/md';

type Props = {};

const ThemeToggle = (props: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <>
          <MdOutlineWbSunny role="button" onClick={() => setTheme('light')} />
        </>
      );
    } else {
      return (
        <>
          <MdOutlineDarkMode role="button" onClick={() => setTheme('dark')} />
        </>
      );
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1, rotate: 180 }}
    >
      {mounted && renderThemeChanger()}
    </motion.div>
  );
};

export default ThemeToggle;
