import React from 'react';
import Link from 'next/link';
import { allPostsNewToOld } from '@/lib/utils/contentLayerAdapter';
import PostsList from '@/components/Blog/PostsList';

type Props = {};

export default function HomeBlogLayout({}: Props) {
  const posts = allPostsNewToOld.filter((post) => post.published).slice(0, 3);

  return (
    <>
      <div className="divide-y divide-neutral-500">
        <div className="space-y-5 py-8">
          <h1 className="text-4xl font-semibold">Blog State</h1>
          <p className="text-lg text-neutral-500">Latest published blog post</p>
        </div>

        <PostsList posts={posts} />
      </div>

      <div className="flex justify-end font-medium leading-6">
        <Link className="text-theme-main" href="/blog">
          All posts →
        </Link>
      </div>
    </>
  );
}
