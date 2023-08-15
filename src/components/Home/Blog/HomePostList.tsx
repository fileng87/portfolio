import { allPostsNewToOld } from '@/lib/utils/contentLayerAdapter';
import React from 'react';
import HomePostCard from './HomePostCard';

type Props = {};

export default function HomePostList({}: Props) {
  const posts = allPostsNewToOld.slice(0, 3);

  return (
    <ul className="divide-y divide-neutral-500 overflow-y-auto">
      {posts.map((post) => (
        <li key={post.slug} className="py-8">
          <HomePostCard {...post} />
        </li>
      ))}
    </ul>
  );
}
