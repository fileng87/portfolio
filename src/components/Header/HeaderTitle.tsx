import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {};

export default function HeaderTitle({}: Props) {
  return (
    <Link href={'https://www.youtube.com/watch?v=2GXlAJPa-KM'} target="_blank">
      <span
        className={clsx(
          'md:writing-vertical-rl',
          'md:rotate-180',
          'md:text-theme-main',
          'text-lg  md:text-base'
        )}
      >
        LIFeng87
      </span>
    </Link>
  );
}
