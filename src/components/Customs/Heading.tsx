type HeadingProps = React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
> & { Component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' };

function Heading({ Component, id, children, ...otherProps }: HeadingProps) {
  return (
    <Component
      id={id}
      className="group scroll-mt-24 space-x-4 whitespace-pre-wrap"
      {...otherProps}
    >
      <a
        href={id && `#${id}`}
        className="inline-flex h-6 w-6 items-center justify-center rounded-md text-theme-main no-underline"
        aria-label="Anchor"
      >
        #
      </a>
      <span className="mr-3">{children}</span>
    </Component>
  );
}

export const H1 = (props: React.ComponentPropsWithoutRef<'h1'>) => (
  <Heading Component="h1" {...props} />
);
export const H2 = (props: React.ComponentPropsWithoutRef<'h2'>) => (
  <Heading Component="h2" {...props} />
);
export const H3 = (props: React.ComponentPropsWithoutRef<'h3'>) => (
  <Heading Component="h3" {...props} />
);
export const H4 = (props: React.ComponentPropsWithoutRef<'h4'>) => (
  <Heading Component="h4" {...props} />
);
export const H5 = (props: React.ComponentPropsWithoutRef<'h5'>) => (
  <Heading Component="h5" {...props} />
);
export const H6 = (props: React.ComponentPropsWithoutRef<'h6'>) => (
  <Heading Component="h6" {...props} />
);
