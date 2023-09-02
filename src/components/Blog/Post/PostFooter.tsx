import { Post } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';
import TableOfContents from './TableOfContents';

type Props = {
  post: Post;
  prevPost?: Post;
  nextPost?: Post;
};

export default function PostFooter({ prevPost, nextPost, post }: Props) {
  return (
    <footer>
      <div className="col-start-1 row-start-2 divide-y divide-neutral-500 font-medium leading-5">
        <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
          {prevPost ? (
            <div>
              <h2 className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                Previous Article
              </h2>
              <div className="text-theme-main">
                <Link href={prevPost.path} replace>
                  {prevPost.title}
                </Link>
              </div>
            </div>
          ) : (
            <div />
          )}

          {nextPost && (
            <div>
              <h2 className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                Previous Article
              </h2>
              <div className="text-theme-main">
                <Link href={nextPost.path} replace>
                  {nextPost.title}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <Link className="text-theme-main" href="/blog">
          ← Back to the blog
        </Link>
      </div>
    </footer>
  );
}
