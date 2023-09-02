import * as Avatar from '@radix-ui/react-avatar';
import { AuthorType } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';

type Props = {
  authors: AuthorType[];
};

export default function PostAuthors({ authors }: Props) {
  return (
    <>
      <ul className="flex flex-wrap justify-center gap-4 xl:block xl:space-y-8">
        {authors.map((author) => (
          <>
            <li key={author._id} className="flex items-center space-x-2">
              <Avatar.Root className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-theme-main">
                <Avatar.Image
                  className="rounded-[inherit] object-cover"
                  src={author.avatar}
                  alt={author.name}
                />

                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center"
                  delayMs={600}
                >
                  {author.name[0].toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>

              <dl>
                <dt className="sr-only">Name</dt>
                <dd>{author.name}</dd>
                {author.twitter_id && (
                  <>
                    <dt className="sr-only">Twitter</dt>
                    <dd>
                      <Link
                        className="text-sm text-theme-main"
                        href={`https://twitter.com/${author.twitter_id}`}
                        target="_blank"
                      >
                        @{author.twitter_id}
                      </Link>
                    </dd>
                  </>
                )}
              </dl>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
