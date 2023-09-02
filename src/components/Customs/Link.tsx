import React from 'react';
import { LuExternalLink } from 'react-icons/lu';

type Props = React.ComponentPropsWithoutRef<'a'>;

export default function Link({ href, children, ...rest }: Props) {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      className="text-theme-main"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    >
      {children}
      {typeof children === 'string' && (
        <LuExternalLink className="ml-1 inline-block h-4 w-4" />
      )}
    </a>
  );
}
