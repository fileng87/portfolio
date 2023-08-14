import React from 'react';
import styles from './PostBody.module.scss';
import clsx from 'clsx';

type Props = { children: React.ReactNode };

export default function PostBody({ children }: Props) {
  return (
    <article
      className={clsx(
        'p-4',
        'prose dark:prose-invert lg:prose-xl',
        'bg-slate-50/20 dark:bg-neutral-800',
        styles.postBody
      )}
    >
      {children}
    </article>
  );
}
