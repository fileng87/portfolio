import React from 'react';
import { format, parseISO } from 'date-fns';
import { Post } from 'contentlayer/generated';

interface Props extends Post {}

export default function PostHeader(props: Props) {
  return (
    <header>
      <div className="space-y-1 text-center">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-gray-600 dark:text-gray-400">
            <time dateTime={props.date}>
              {format(parseISO(props.date), 'LLLL d, yyyy')}
            </time>
          </dd>
        </dl>
        <div>
          <h1 className="text-5xl font-semibold tracking-wide">
            {props.title}
          </h1>
        </div>
      </div>
    </header>
  );
}
