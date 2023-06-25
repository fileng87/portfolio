import React from 'react';
import Navbar from '../Navbar/Navbar';
import Link from 'next/link';
import HeaderSocial from './HeaderSocial';
//import ThemeToggle from '../Button/ThemeToggle';
import HomeButton from '../Button/HomeButton';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="absolute flex w-screen justify-between text-neutral-400">
      <div className="flex flex-col h-screen px-14 py-20 items-center justify-between">
        <div className="flex flex-col items-center justify-center font-bold">
          <Link href={'/'} className="mb-6">
            <HomeButton />
          </Link>
          <Navbar />
        </div>
        <HeaderSocial />
      </div>
      {/*<div className="p-10">
        <ThemeToggle />
  </div>*/}
    </header>
  );
};

export default Header;
