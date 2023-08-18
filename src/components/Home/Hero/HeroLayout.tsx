'use client';

import React from 'react';
import Title from './Title';
import Avatar from './Avatar';
import SubTitle from './SubTitle';
import Author from './Author';
import clsx from 'clsx';

type Props = {};

export default function HeroLayout({}: Props) {
  return (
    <>
      <div
        className={clsx(
          'flex gap-6',
          'min-h-full w-full',
          'select-none',
          'items-center',
          'justify-center md:justify-between'
        )}
      >
        <div
          className={clsx(
            'relative',
            'h-full',
            'flex flex-col',
            'items-start justify-center'
          )}
        >
          <Author />

          <Title />

          <SubTitle />
        </div>

        <div className="hidden xl:block">
          <Avatar />
        </div>
      </div>
    </>
  );
}
