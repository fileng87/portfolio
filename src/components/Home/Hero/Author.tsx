import React from 'react';

type Props = {};

export default function Author({}: Props) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <p className="flex items-center font-oswald text-lg font-semibold tracking-wider text-neutral-400">
        Hello there! 👋
      </p>
      <span className="hidden h-[1px] w-28 bg-neutral-400 md:block" />
    </div>
  );
}
