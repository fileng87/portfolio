import clsx from 'clsx';
import React from 'react';

type Props = React.ComponentPropsWithoutRef<'a'>;

export default function A({ children, className, ...props }: Props) {
  return (
    <a className={clsx(className, 'text-theme-main')} {...props}>
      {children}
    </a>
  );
}
