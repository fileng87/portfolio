import React from 'react';
import Comment from './Comment';

type Props = {};

export default function GuestbookLayout({}: Props) {
  return (
    <div className="overflow-hidde">
      <div className="page-root flex w-full flex-col items-center overflow-y-auto md:pt-24">
        <div className="page-content flex justify-center">
          <Comment />
        </div>
      </div>
    </div>
  );
}
