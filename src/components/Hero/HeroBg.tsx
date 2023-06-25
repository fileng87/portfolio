import React from 'react';
import Image from 'next/image';

type Props = {};

const HeroBg = (props: Props) => {
  return (
    <div className="relative lg:flex justify-end items-end h-screen w-screen overflow-hidden z-0 hidden">
      <div className="absolute flex gap-14 origin-bottom-left h-[200vh] end-[35%] -top-[60%] transform rotate-45 drop-shadow-lg">
        <div className="bg-yellow-400 h-full 2xl:w-[200px] w-[150px]" />
        <div className="bg-yellow-400 h-full 2xl:w-[100px] w-[75px]" />
      </div>
      <div className="absolute xl:w-[38rem] w-[28rem]">
        <Image
          width={2894}
          height={4093}
          alt="bruh"
          src={'/images/lifeng87_nb.png'}
        />
      </div>
    </div>
  );
};

export default HeroBg;
