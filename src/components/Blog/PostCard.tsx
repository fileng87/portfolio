'use client';

import type { PostMetadata } from '@/types/PostMetadata';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import React from 'react';
import { motion } from 'framer-motion';
import ImageLayout from '../Layout/ImageLayout';

interface Props extends PostMetadata {}

export default function PostCard({
  author,
  avatar,
  title,
  subtitle,
  date,
  slug,
}: Props) {
  return (
    <motion.div
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      whileHover={{ y: -5 }}
      whileTap={{ y: 0 }}
      className="flex md:gap-6 gap-4 dark:bg-black/20 bg-slate-50/20 backdrop-blur rounded-xl shadow-lg overflow-hidden"
    >
      <div className="lg:w-72 md:w-52 w-36 flex overflow-hidden">
        <AspectRatio.Root ratio={16 / 9} asChild className="flex">
          <div className="flex justify-center items-center bg-black">
            <ImageLayout src={avatar} alt={title} />
          </div>
        </AspectRatio.Root>
      </div>
      <div className="flex flex-col md:gap-2 md:my-4 my-2">
        <h2 className="md:text-3xl text-lg font-semibold">{title}</h2>
        <h3 className=" text-zinc-400 text-xs md:text-base">
          By {author} | {date}
        </h3>
        <h3 className="text-sm md:text-lg">{subtitle}</h3>
      </div>
    </motion.div>
  );
}
