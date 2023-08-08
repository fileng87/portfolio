'use client';

import { giscusConfigs } from '@/configs/giscusConfigs';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import React from 'react';

type Props = {};

export default function Comment({}: Props) {
  const { theme } = useTheme();

  return (
    <Giscus
      repo={giscusConfigs.repo}
      repoId={giscusConfigs.repoId}
      category={giscusConfigs.category}
      categoryId={giscusConfigs.categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'transparent_dark' : 'light'}
      loading="lazy"
    />
  );
}
