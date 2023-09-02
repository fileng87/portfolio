import React from 'react';

type Props = {};

export default function Avatar({}: Props) {
  return (
    <div className="relative hidden md:flex">
      <div className=" relative -bottom-4 -end-4 rounded-sm bg-theme-main">
        <div
          className="aspect-h-1 aspect-w-1 relative -start-4 -top-4 w-[33rem] rounded-sm bg-contain bg-right-bottom bg-no-repeat drop-shadow-md"
          style={{ backgroundImage: `url(/images/lifeng87-avatar.png)` }}
        />
      </div>
    </div>
  );
}
