import React from 'react';
import Comment from '@/components/Gusetbook/Comment';

type Props = {};

const GuestBook = (props: Props) => {
  return (
    <div className="md:absolute inset-0 w-full h-full flex flex-col gap-7 items-center justify-center md:pt-24 px-4 overflow-y-auto">
      <div className="w-full h-full flex justify-center md:max-w-[60%]">
        <Comment />
      </div>
    </div>
  );
};

export default GuestBook;
