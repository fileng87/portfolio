'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const PageWapper = (props: Props) => {
  const path = usePathname();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        key={path}
        className="w-full h-full"
      >
        {props.children}
      </motion.div>
    </>
  );
};

export default PageWapper;
