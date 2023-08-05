'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

const PageWapper = (props: Props) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="h-full w-full md:px-48 px-10 my-10 overflow-y-auto"
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageWapper;
