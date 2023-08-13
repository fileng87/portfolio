'use client';

import React from 'react';
import Title from './Title';
import ArtPhoto from './ArtPhoto';
import SubTitle from './SubTitle';
import Author from './Author';

type Props = {};

const Hero = (props: Props) => {
  return (
    <>
      <div className="flex min-h-full w-full select-none items-center justify-between gap-6">
        <div className="relative flex h-full flex-col items-start justify-center">
          <Author />

          <Title />

          <SubTitle />
        </div>

        <div className="hidden xl:block">
          <ArtPhoto />
        </div>
      </div>
    </>
  );
};

export default Hero;
