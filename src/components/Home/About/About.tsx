import React from 'react';
import Cover from './Cover';
import Content from './Content';

type Props = {};

export default function About({}: Props) {
  return (
    <div className="flex min-h-full flex-col items-center md:justify-center">
      <div className="page-anchor"></div>
      <div className="mt-4 flex flex-col items-center gap-4 md:mt-0 md:w-full md:flex-row md:justify-between">
        <div className="max-w-[90%] md:w-[30rem]">
          <Cover />
        </div>

        <div className="h-full md:w-[50%]">
          <Content />
        </div>
      </div>
    </div>
  );
}
