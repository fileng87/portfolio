import React from 'react';

type Props = {};

export default function Author({}: Props) {
  return (
    <div className="flex items-center mt-4 gap-4">
      <p className="items-center flex text-lg text-neutral-400 font-oswald tracking-wider font-semibold">
        Hello there! 👋
      </p>
      <span className="bg-neutral-400 h-[1px] w-28 hidden md:block" />
    </div>
  );
}
