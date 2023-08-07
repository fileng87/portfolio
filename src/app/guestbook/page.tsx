import React from 'react';
import Comment from '@/components/Gusetbook/Comment';

type Props = {};

const GuestBook = (props: Props) => {
  return (
    <div className="h-full w-full">
      <div className="page-layout-center overflow-y-auto">
        <div className="md:w-[60%] h-full md:pt-16 pt-24 md:px-6 px-4 backdrop-blur shadow-lg">
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
