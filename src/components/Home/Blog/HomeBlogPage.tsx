import React from 'react';
import HomePostList from './HomePostList';
import Link from 'next/link';

type Props = {};

export default function HomeBlogPage({}: Props) {
  return (
    <>
      <div className="divide-y divide-neutral-500">
        <div className="space-y-5 py-8">
          <h1 className="text-4xl font-semibold">Blog Latest</h1>
          <p className="text-lg text-neutral-500">Latest published blog post</p>
        </div>

        <HomePostList />
      </div>

      <div className="flex justify-end font-medium leading-6">
        <Link className="text-cyan-500" href="/blog">
          All posts →
        </Link>
      </div>
    </>
  );
}
