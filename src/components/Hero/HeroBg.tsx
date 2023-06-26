"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {};

const HeroBg = (props: Props) => {
  return (
    <div className="relative lg:flex justify-end items-end h-screen w-screen overflow-hidden z-0 hidden">
      <motion.div 
        initial={{opacity: 0, x:-200}} 
        animate={{opacity:1, x:0}}
        transition={{ duration: 0.3 }}
        className="absolute flex gap-14 origin-bottom-left h-[200vh] end-[35%] -top-[60%] transform rotate-45 drop-shadow-lg">
        <div className="bg-yellow-400 h-full 2xl:w-[200px] w-[150px]" />
        <div className="bg-yellow-400 h-full 2xl:w-[100px] w-[75px]" />
      </motion.div>
      <div className="absolute xl:w-[38rem] w-[28rem]">
        <Image
          width={1024}
          height={1449}
          alt="bruh"
          src={'/images/lifeng87_nb.png'}
        />
      </div>
    </div>
  );
};

export default HeroBg;
