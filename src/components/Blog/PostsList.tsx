import { allPostsNewToOld } from '@/lib/utils/contentLayerAdapter';
import Link from 'next/link';
import React from 'react';
import PostCard from './PostCard';

type Props = {};

export default function PostsList({}: Props) {
  const posts = allPostsNewToOld.filter((post) => post.published);

  return (
    <>
      {posts.map(
        (post) =>
          post.published && (
            <Link
              className="w-full"
              key={post.slug}
              href={`/blog/${post.slug}`}
            >
              <PostCard {...post} />
            </Link>
          )
      )}
    </>
  );
}
