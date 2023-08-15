import Link from 'next/link';
import React from 'react';

type Props = {};

export default function HeaderTitle({}: Props) {
  return (
    <Link href={'https://www.youtube.com/watch?v=2GXlAJPa-KM'} target="_blank">
      <span className="md:writing-vertical-rl text-lg md:rotate-180 md:text-base md:text-cyan-400">
        LIFeng87
      </span>
    </Link>
  );
}
