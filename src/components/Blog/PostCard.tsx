'use client';

import React from 'react';
import { Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

interface Props extends Post {}

export default function PostCard(props: Props) {
  return (
    <article>
      <div className="grid-cols-4 space-y-2 lg:grid lg:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-gray-600 dark:text-gray-400">
            <time dateTime={props.date}>
              {format(parseISO(props.date), 'LLLL d, yyyy')}
            </time>
          </dd>
        </dl>
        <div className="col-span-3 space-y-4">
          <div className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">
                <Link href={props.path} replace>
                  {props.title}
                </Link>
              </h2>
              <p className="text-sm text-theme-main">
                By {props.authors.map((author) => author.name).join(', ')}
              </p>
            </div>

            <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
              {props.description}
            </p>
          </div>

          <div className="text-base font-medium leading-6">
            <Link className="text-theme-main" href={props.path} replace>
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
