import React from 'react';
import PostCard from './PostCard';
import { Post } from 'contentlayer/generated';

type Props = {
  posts: Post[];
};

export default function PostsList({ posts }: Props) {
  return (
    <ul className="divide-y divide-neutral-500 overflow-y-auto">
      {posts.map((post) => (
        <li key={post.slug} className="py-8">
          <PostCard {...post} />
        </li>
      ))}
    </ul>
  );
}
