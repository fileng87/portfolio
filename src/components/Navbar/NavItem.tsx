'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = { link: { id: number; title: string; url: string } };

const NavItem = (props: Props) => {
  const pathName = usePathname();

  return (
    <div className="table py-4 hover:text-neutral-200 duration-300">
      <div className="my-[50%] h-0 flex items-center">
        <div className="relative block origin-center -rotate-90 me-[2px]">
          <Link href={props.link.url}>{props.link.title}</Link>
          <motion.div
            initial={{
              width: '0%',
            }}
            animate={{
              width: pathName == props.link.url ? '100%' : '0%',
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 h-[2px] w-full bg-yellow-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default NavItem;
