import PostList from '@/components/Blog/PostList';
import Searchbar from '@/components/Blog/SearchBar';
import React, { useRef } from 'react';
type Props = {};

const Blog = (props: Props) => {
  return (
    <div className="w-full h-full">
      <div className="md:absolute inset-0 w-full h-full flex flex-col gap-7 items-center justify-center md:mt-8 px-4">
        <Searchbar />

        <div className="overflow-y-auto w-full h-full flex justify-center">
          <div className="flex flex-col gap-4 mt-2 max-w-7xl w-full md:max-w-page">
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
