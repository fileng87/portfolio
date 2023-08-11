import PostList from '@/components/Blog/PostList';
import Searchbar from '@/components/Blog/SearchBar';
import React, { useRef } from 'react';
type Props = {};

const Blog = (props: Props) => {
  return (
    <div className="page">
      <div className="w-full flex flex-col items-center gap-4 md:pt-4 overflow-hidden">
        <div className="page-noheader">
          <div className="hidden md:flex justify-center">
            <Searchbar />
          </div>
        </div>

        <div className="overflow-y-auto w-full h-full flex justify-center">
          <div className="page-noheader-center flex flex-col gap-4">
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
