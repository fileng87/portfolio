import { Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';
import BackArrow from './BackArrow';
import PostBody from './PostBody';

type Props = {
  post: Post;
};

export default function PostLayout({ post }: Props) {
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
}
