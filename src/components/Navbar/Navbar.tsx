'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = {};

const links = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Blog', url: '/blog' },
  { title: 'GuestBook', url: '/guestbook' },
];

const Navbar = (props: Props) => {
  const pathName = usePathname();

  return (
    <nav className="flex flex-col gap-6 justify-center items-center font-semibold">
      {links.map((link) => (
        <Link key={link.url} href={link.url} className="relative flex">
          {pathName === link.url && (
            <motion.span
              layoutId="nav_underline"
              className="absolute md:block h-full w-[2px] bg-yellow-400 end-0 rounded-full hidden"
            />
          )}
          <span className="md:rotate-180 rotate-0 md:writing-vertical-rl">
            {link.title}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
