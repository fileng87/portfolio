import React from 'react';
import BackArrow from '@/components/Blog/Post/BackArrow';
import { notFound } from 'next/navigation';
import { allPosts } from '@/lib/utils/contentLayerAdapter';
import { useMDXComponent } from 'next-contentlayer/hooks';
import PostBody from '@/components/Blog/Post/PostBody';

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

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="page min-h-screen">
      <div className="page-root flex h-full w-full flex-col items-center gap-4">
        <div className="page-content flex w-full flex-col">
          <div className="flex w-full gap-2">
            <BackArrow />
            <h1 className="text-4xl font-semibold">{post.title}</h1>
          </div>
          <hr className="mt-4" />
        </div>

        <div className="page-content flex w-full overflow-hidden">
          <div className="w-full overflow-y-auto rounded-md p-4 ">
            <PostBody>
              <MDXContent />
            </PostBody>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
