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
      <div className="h-full w-full flex items-center justify-between gap-6">
        <div className="relative h-full flex items-start justify-center flex-col">
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
