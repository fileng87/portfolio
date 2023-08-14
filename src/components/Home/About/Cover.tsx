import clsx from 'clsx';
import React from 'react';

type Props = {};

export default function Cover({}: Props) {
  return (
    <div
      className={clsx(
        'aspect-h-1 aspect-w-1',
        'bg-contain bg-center bg-no-repeat'
      )}
      style={{ backgroundImage: `url(/images/lifeng87_sq.png)` }}
    ></div>
  );
}
