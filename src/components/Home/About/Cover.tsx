import ImageLayout from '@/components/Layout/ImageLayout';
import React from 'react';

type Props = {};

export default function Cover({}: Props) {
  return (
    <div className="aspect-square w-full">
      <ImageLayout src={'/images/ai_cover.png'} alt="cover" />
    </div>
  );
}
