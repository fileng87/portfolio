import React from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default async function ImageLayout({ src, alt, className }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={1024}
      height={1024}
    />
  );
}
