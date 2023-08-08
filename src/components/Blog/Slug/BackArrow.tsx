'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

type Props = {};

export default function BackArrow({}: Props) {
  return (
    <div className="flex">
      <motion.div whileHover={{ x: -5 }} whileTap={{ x: -10 }} className="p-2">
        <Link href={'/blog'}>
          <IoIosArrowBack size={'1.4rem'} />
        </Link>
      </motion.div>
    </div>
  );
}
