import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  herf: string;
  className?: string;
};

const SocialButton = (props: Props) => {
  return (
    <Link
      href={props.herf}
      target="_blank"
      className="hover:text-neutral-200 hover:scale-110 active:scale-90 duration-300"
    >
      {props.children}
    </Link>
  );
};

export default SocialButton;
