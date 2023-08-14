import React from 'react';
import Cover from './Cover';
import Content from './Content';

type Props = {};

export default function About({}: Props) {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div className="flex w-full flex-wrap justify-center gap-6 md:w-full">
        <div className="w-full max-w-[20rem]">
          <Cover />
        </div>

        <div className="h-full w-[40rem] grow">
          <Content />
        </div>
      </div>
    </div>
  );
}
