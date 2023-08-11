import React from 'react';
import Comment from '@/components/Gusetbook/Comment';

type Props = {};

const GuestBook = (props: Props) => {
  return (
    <div className="page overflow-hidde">
      <div className="w-full overflow-y-auto flex flex-col items-center md:pt-24">
        <div className="page-noheader flex justify-center">
          <div className="md:w-[60%] w-full">
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
