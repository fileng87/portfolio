'use client';

import Backgrand from '@/components/Layout/Backgrand';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
