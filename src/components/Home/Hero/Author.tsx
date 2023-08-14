import clsx from 'clsx';
import React from 'react';

type Props = {};

export default function Author({}: Props) {
  return (
    <div className="flex w-full items-center gap-4">
      <p
        className={clsx(
          'flex shrink-0',
          'items-center',
          'font-oswald text-lg font-semibold tracking-wider text-neutral-400'
        )}
      >
        Hello there! 👋
      </p>
      <span
        className={clsx(
          'grow md:grow-0',
          'h-[2px] w-28',
          'bg-neutral-400',
          'me-6'
        )}
      />
    </div>
  );
}
