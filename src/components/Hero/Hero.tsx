import React from 'react';
import HeroBg from './HeroBg';
import { FiExternalLink } from 'react-icons/fi';

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="relative flex flex-col h-screen justify-center items-center">
      <div className="absolute flex flex-col gap-4 max-w-xl items-start start-72 text-white z-50 rounded-md p-6">
        <div className="flex justify-start items-center gap-6 w-full">
          <h2 className="text-xl font-semibold text-neutral-400 ps-2 drop-shadow-xl">
            LIFeng87
          </h2>
          <div className="h-[2px] w-[12rem] bg-neutral-400 rounded-full" />
        </div>

        <h1 className="md:text-8xl text-4xl font-extrabold drop-shadow-2xl">
          Just code for fun.
        </h1>

        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          className="flex p-3 mt-4 ms-2 bg-yellow-400 justify-center items-center rounded-lg text-neutral-700 font-semibold gap-2"
        >
          Just do it!
          <FiExternalLink />
        </a>
      </div>
      <HeroBg />
    </div>
  );
};

export default Hero;
