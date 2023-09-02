'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';

import copy from 'copy-to-clipboard';
import clsx from 'clsx';
import { MdCheck, MdContentCopy } from 'react-icons/md';
import { removeDuplicateNewLine } from '@/lib/utils/removeDuplicateNewLine';

type Props = React.ComponentPropsWithoutRef<'pre'>;

export default function Pre({ children, className, ...props }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const onClick = async () => {
    if (preRef.current?.innerText) {
      copy(removeDuplicateNewLine(preRef.current.innerText));
      setCopied(true);
    }
  };
  return (
    <div className="group relative">
      <pre
        {...props}
        ref={preRef}
        className={clsx(className, 'focus:outline-none')}
      >
        <div className="absolute right-0 top-0 m-2 flex items-center justify-center rounded-md">
          <span
            className={clsx('hidden px-2 text-xs text-neutral-500 ease-in', {
              'group-hover:flex': copied,
            })}
          >
            Copied!
          </span>

          <button
            aria-label="Copy to copyboard"
            type="button"
            onClick={onClick}
            disabled={copied}
            className={clsx(
              'hidden rounded-md border p-2 transition ease-in focus:outline-none group-hover:flex',
              'border-neutral-500 hover:border-neutral-400'
            )}
          >
            <MdContentCopy
              className={clsx({ block: !copied, hidden: copied })}
            />
            <MdCheck className={clsx({ block: copied, hidden: !copied })} />
          </button>
        </div>

        {children}
      </pre>
    </div>
  );
}
