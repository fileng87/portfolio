import { Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

interface Props extends Post {}

export default function HomePostCard(props: Props) {
  return (
    <article>
      <div className="grid-cols-4 space-y-2 lg:grid lg:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-neutral-500">
            <time dateTime={props.date}>
              {format(parseISO(props.date), 'LLLL d, yyyy')}
            </time>
          </dd>
        </dl>
        <div className="col-span-3 space-y-4">
          <div className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">
                <Link href={`/blog/${props.slug}`}>{props.title}</Link>
              </h2>
              <p className="text-sm text-cyan-500">By {props.author}</p>
            </div>

            <p className="line-clamp-2 text-neutral-500">{props.description}</p>
          </div>

          <div className="text-base font-medium leading-6">
            <Link className="text-cyan-500" href={`/blog/${props.slug}`}>
              Read more
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
