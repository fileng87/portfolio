import React from 'react';
import Comment from '@/components/Gusetbook/Comment';

type Props = {};

const GuestBook = (props: Props) => {
  return (
    <div className="page-layout-center overflow-y-auto">
      <div className="md:w-[60%] h-full w-full md:pt-16 pt-24 md:px-6 px-4 backdrop-blur md:shadow-lg">
        <Comment />
      </div>
    </div>
  );
};

export default GuestBook;
