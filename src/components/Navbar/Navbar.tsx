import React from 'react';
import NavItem from './NavItem';

type Props = {};

const links = [
  { id: 1, title: 'About', url: '/about' },
  { id: 2, title: 'Blog', url: '/blog' },
  { id: 3, title: 'GuestBook', url: '/guestbook' },
];

const Navbar = (props: Props) => {
  return (
    <nav>
      <div className="flex flex-col items-center justify-center mb-4">
        {links.map((link) => (
          <div key={link.id}>
            <NavItem link={link} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
