'use client';

import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { motion } from 'framer-motion';

type Props = {};

export default function Arrow({}: Props) {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      whileTap={{ rotate: 90 }}
      className="absolute bottom-10 flex animate-bounce justify-center text-zinc-400 duration-200 hover:text-zinc-100"
    >
      <Link href="#about">
        <MdOutlineKeyboardArrowDown size={25} />
      </Link>
    </motion.div>
  );
}
