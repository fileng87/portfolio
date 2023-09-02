'use client';

import { Post } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import clsx from 'clsx';
import PostAuthors from './PostAuthors';
import mdxComponents from '@/lib/mdxComponents';
import PostFooter from './PostFooter';
import TableOfContents from './TableOfContents';
import ScrollToTopBtn from '@/components/Layout/ScrollToTopBtn';

type Props = {
  post: Post;
  prevPost?: Post;
  nextPost?: Post;
};

export default function PostLayout({ post, prevPost, nextPost }: Props) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <div className="overflow-y-auto scroll-smooth">
        <ScrollToTopBtn />

        <article>
          <div
            className={clsx(
              'page-root page-content',
              'pb-8',
              'space-y-0 xl:space-y-8 xl:divide-y xl:divide-neutral-500'
            )}
          >
            <PostHeader {...post} />

            <div className="grid-cols-5 grid-rows-[auto_1fr] gap-x-6 xl:grid">
              <dl className="border-b border-neutral-500 py-10">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <PostAuthors authors={post.authors} />
                </dd>
              </dl>

              <aside className="col-start-5 row-span-2 row-start-1 border-b border-neutral-500 xl:border-hidden">
                <div className="py-4">
                  <TableOfContents source={post.body.raw} />
                </div>
              </aside>

              <div className="col-span-3 col-start-2 row-span-2 row-start-1">
                <PostBody>
                  <MDXContent components={mdxComponents} />
                </PostBody>
              </div>

              <PostFooter nextPost={nextPost} prevPost={prevPost} post={post} />
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
