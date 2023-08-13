'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';

interface Props extends Post {}

export default function PostCard({
  title,
  description,
  date,
  author,
  cover,
}: Props) {
  return (
    <motion.div
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
      className="flex overflow-hidden rounded-md bg-slate-50/20 shadow-lg backdrop-blur dark:bg-black/20"
    >
      <div className="h-full min-w-[10rem] bg-black md:min-w-[15rem]">
        <div
          className="aspect-h-9 aspect-w-16 h-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cover})` }}
        />
      </div>
      <div className="mx-4 my-2 flex flex-col md:mx-6 md:my-4 md:gap-2">
        <h2 className="line-clamp-1 text-lg font-semibold md:text-3xl">
          {title}
        </h2>
        <h3 className="line-clamp-1 text-xs text-zinc-400 md:text-base">
          By {author} | {format(parseISO(date), 'LLLL d, yyyy')}
        </h3>
        <h3 className="line-clamp-1 text-sm md:text-lg">{description}</h3>
      </div>
    </motion.div>
  );
}
