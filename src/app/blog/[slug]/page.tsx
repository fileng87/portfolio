import React from 'react';
import { notFound } from 'next/navigation';
import { allPosts } from '@/lib/utils/contentLayerAdapter';
import PostLayout from '@/components/Blog/Post/PostLayout';
type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  return allPosts.map((post) => post.slug);
};

const BlogPost = ({ params }: Props) => {
  const post = allPosts.find((post) => {
    return post.slug === params.slug;
  });

  if (!post || !post.published) notFound();

  return <PostLayout post={post} />;
};

export default BlogPost;
