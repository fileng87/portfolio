import React from 'react';
import { getPost, getPostMetadata } from '@/utils/posts';
import BackArrow from '@/components/Blog/Slug/BackArrow';
import { notFound } from 'next/navigation';
import MarkdownViewer from '@/components/Blog/Slug/MarkdownViewer';

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((posts) => ({
    slug: posts?.slug,
  }));
};

const BlogPost = (props: Props) => {
  const slug = props.params.slug;

  const post = getPost(`${slug}.md`);

  if (!post) notFound();

  return (
    <div className="page">
      <div className="w-full flex flex-col items-center gap-4 md:pt-4 overflow-hidden">
        <div className="page-noheader w-full flex flex-col">
          <div className="w-full flex gap-2">
            <BackArrow />
            <h1 className="text-4xl font-semibold">{post.title}</h1>
          </div>
          <hr className="mt-4" />
        </div>

        <div className="w-full flex justify-center overflow-y-auto">
          <div className="page-noheader-center w-full flex justify-center">
            <article className="prose lg:prose-xl dark:prose-invert w-full py-4">
              <MarkdownViewer source={post.content} />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
