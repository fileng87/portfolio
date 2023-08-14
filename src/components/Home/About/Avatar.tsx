import clsx from 'clsx';
import React from 'react';

type Props = {};

export default function Avatar({}: Props) {
  return (
    <div
      className={clsx(
        'aspect-h-1 aspect-w-1',
        'bg-contain bg-center bg-no-repeat',
        'shadow-md'
      )}
      style={{ backgroundImage: `url(/images/lifeng87-avatar.png)` }}
    ></div>
  );
}
