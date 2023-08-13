import React from 'react';
import Description from './Description';
import PostsList from './PostsList';

type Props = {};

export default function BlogPage({}: Props) {
  return (
    <div className="flex w-full flex-col gap-20">
      <div className="page-content">
        <Description />
      </div>

      <div className="page-content flex flex-col gap-4">
        <h2 className="text-4xl font-semibold">Newest</h2>
        <PostsList />
      </div>
    </div>
  );
}
