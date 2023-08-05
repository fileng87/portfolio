import React from 'react';
import Navbar from '../Navbar/Navbar';
import { BsGithub, BsTwitter, BsYoutube } from 'react-icons/bs';
import Link from 'next/link';

type Props = {};

const socialButtons = [
  { icon: <BsTwitter size={'1.4rem'} />, url: 'https://twitter.com/lifeng87' },
  {
    icon: <BsYoutube size={'1.4rem'} />,
    url: 'https://www.youtube.com/channel/UC-4_DC84v16kkJHEiqFQa0w',
  },
  { icon: <BsGithub size={'1.4rem'} />, url: 'https://github.com/lifeng-87' },
];

const Header = (props: Props) => {
  return (
    <header className="absolute flex flex-col justify-between items-center text-neutral-400 z-50 md:w-auto w-full h-screen md:p-20 p-10">
      <div className="h-full md:block flex justify-center">
        <Navbar />
      </div>

      <div className="w-full">
        <div className="flex md:flex-col gap-6">
          {socialButtons.map((btn) => (
            <Link key={btn.url} href={btn.url} target="_blank">
              {btn.icon}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
