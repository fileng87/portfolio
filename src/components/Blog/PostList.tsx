import { getPostMetadata } from '@/utils/posts';
import Link from 'next/link';
import React from 'react';
import PostCard from './PostCard';

type Props = {};

export default function PostList({}: Props) {
  const postMetaData = getPostMetadata();
  const postPreviews = postMetaData.map((post) => (
    <>
      {post && (
        <Link key={post?.slug} href={`/blog/${post?.slug}`}>
          <PostCard {...post} />
        </Link>
      )}
    </>
  ));

  return <>{postPreviews}</>;
}
