'use client';

import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="relative flex h-screen w-full justify-center items-center">
      <div className="absolute flex flex-col gap-4 max-w-4xl items-start text-white rounded-md p-6">
        <div className="flex justify-start items-center gap-4 w-full">
          <h2 className="text-xl font-medium text-neutral-400 ps-2 drop-shadow-xl font-oswald">
            LIFeng87
          </h2>
          <span className="h-[2px] w-[30%] bg-neutral-400 rounded-full" />
        </div>

        <h1 className="md:text-8xl text-6xl font-medium drop-shadow-md font-oswald">
          Still <span className="text-yellow-400">code</span> for fun.
        </h1>

        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          className="flex p-3 mt-4 ms-2 bg-yellow-400 justify-center items-center rounded-lg text-neutral-700 font-semibold gap-2 drop-shadow-md hover:bg-yellow-500 duration-300"
        >
          Just do it!
          <FiExternalLink />
        </a>
      </div>
    </div>
  );
};

export default Hero;
