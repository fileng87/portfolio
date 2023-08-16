import Description from '@/components/Blog/Description';
import PostsList from '@/components/Blog/PostsList';
import { allPostsNewToOld } from '@/lib/utils/contentLayerAdapter';

import React from 'react';
type Props = {};

const Blog = ({}: Props) => {
  const posts = allPostsNewToOld.filter((post) => post.published);

  return (
    <div className="page flex min-h-full flex-col overflow-y-auto scroll-smooth">
      <div className="page-root md:pt-24">
        <div className="space-y-8">
          <div className="page-content">
            <Description />
          </div>

          <div className="page-content divide-y divide-neutral-500">
            <h2 className="py-8 text-4xl font-semibold">Latest</h2>
            <PostsList posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
