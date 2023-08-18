import React from 'react';
import Avatar from './Avatar';
import Content from './Content';
import clsx from 'clsx';

type Props = {};

export default function AboutLayout({}: Props) {
  return (
    <div
      className={clsx(
        'min-h-full w-full',
        'flex',
        'items-center justify-center'
      )}
    >
      <div
        className={clsx(
          'w-full md:w-full',
          'flex flex-wrap',
          'justify-center gap-6'
        )}
      >
        <div className={clsx('w-full max-w-[20rem]')}>
          <Avatar />
        </div>

        <div className={clsx('h-full w-[40rem]', 'grow')}>
          <Content />
        </div>
      </div>
    </div>
  );
}
