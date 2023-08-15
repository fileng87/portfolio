import Description from '@/components/Blog/Description';
import PostsList from '@/components/Blog/PostsList';
import Searchbar from '@/components/Blog/SearchBar';

import React from 'react';
type Props = {};

const Blog = ({}: Props) => {
  return (
    <div className="page flex min-h-full flex-col overflow-y-auto scroll-smooth">
      <div className="page-root flex h-full w-full flex-col items-center gap-10 md:pt-24">
        <div className="flex w-full flex-col gap-20">
          <div className="page-content">
            <Description />
          </div>

          <div className="page-content my-4 flex flex-col gap-4">
            <h2 className="text-4xl font-semibold">Latest</h2>
            <PostsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
