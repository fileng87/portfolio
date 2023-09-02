import React from 'react';
import styles from './PostBody.module.scss';
import clsx from 'clsx';

type Props = { children: React.ReactNode };

export default function PostBody({ children }: Props) {
  return (
    <div>
      <div className={clsx('py-6', 'prose dark:prose-invert lg:prose-lg', styles.postBody)}>
        {children}
      </div>
    </div>
  );
}
