import React from 'react';
import { notFound } from 'next/navigation';
import { allPostsNewToOldPublished } from '@/lib/utils/contentLayerAdapter';
import PostLayout from '@/components/Blog/Post/PostLayout';
type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  return allPostsNewToOldPublished.map((post) => post.slug);
};

const BlogPost = ({ params }: Props) => {
  const post = allPostsNewToOldPublished.find((post) => {
    return post.slug === params.slug;
  });

  if (!post) notFound();

  const postIndex = allPostsNewToOldPublished.findIndex(
    (post) => post.slug === params.slug
  );
  const prevPost = allPostsNewToOldPublished[postIndex + 1];
  const nextPost = allPostsNewToOldPublished[postIndex - 1];

  return <PostLayout post={post} prevPost={prevPost} nextPost={nextPost} />;
};

export default BlogPost;
