import React from 'react';
import Markdown from 'markdown-to-jsx';
import { getPost, getPostMetadata } from '@/utils/posts';
import Image from 'next/image';
import BackArrow from '@/components/Blog/Slug/BackArrow';
import { notFound } from 'next/navigation';

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
    <>
      <div className="w-full h-full flex flex-col items-center gap-4 md:mt-8">
        <div className="w-full md:max-w-page flex flex-col px-4">
          <div className="w-full flex gap-2">
            <BackArrow />
            <h1 className="text-4xl font-semibold">{post.title}</h1>
          </div>
          <hr className="mt-4" />
        </div>

        <div className="w-full flex justify-center overflow-y-auto">
          <div className="md:max-w-page w-full px-4 flex justify-center">
            <article className="prose lg:prose-xl dark:prose-invert w-full">
              <div className="w-full md:h-40 h-20 flex justify-center relative overflow-hidden items-center mb-6">
                <Image
                  className="absolute"
                  src={post.avatar}
                  alt={post.title}
                  width={1024}
                  height={1024}
                />
              </div>
              <Markdown>{post.content}</Markdown>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
