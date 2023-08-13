import React from 'react';
import Comment from '@/components/Gusetbook/Comment';

type Props = {};

const GuestBook = (props: Props) => {
  return (
    <div className="page overflow-hidde">
      <div className="page-root flex w-full flex-col items-center overflow-y-auto md:pt-24">
        <div className="page-content flex justify-center">
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
