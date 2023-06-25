'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = {};

const HomeButton = (props: Props) => {
  const pathName = usePathname();

  return (
    <div className="relative w-10 h-10">
      <motion.div
        initial={{ scale: '95%' }}
        animate={{ scale: pathName == '/' ? '110%' : '95%' }}
        transition={{ duration: 0.3 }}
        className="absolute w-full h-full bg-yellow-400 rounded-full"
      />
      <div className="absolute hover:scale-110 active:scale-100 duration-300">
        <Image
          width={512}
          height={512}
          src="/images/lifeng87_sq.png"
          alt=""
          className="rounded-full"
          priority
        />
      </div>
    </div>
  );
};

export default HomeButton;
