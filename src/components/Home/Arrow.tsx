import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {};

export default function Arrow({}: Props) {
  return (
    <div className="absolute inset-x-0 bottom-10 flex animate-bounce justify-center text-zinc-400 duration-200 hover:text-zinc-100">
      <Link href="#about">
        <MdOutlineKeyboardArrowDown size={25} />
      </Link>
    </div>
  );
}
