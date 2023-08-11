'use client';

import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import SocialIcons from './SocialIcons';
import { Turn as Hamburger } from 'hamburger-react';
import ThemeToggle from './ThemeToggle';
import { IconContext } from 'react-icons';

type Props = {};

const links = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Blog', url: '/blog' },
  { title: 'Guestbook', url: '/guestbook' },
];

export default function Header({}: Props) {
  const [isOpen, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <>
      {/** pc */}

      <Popover.Root defaultOpen={false} open={isOpen} onOpenChange={setOpen}>
        <Popover.Anchor />
        <header className="fixed flex justify-center items-center md:h-full md:w-[10%] w-full h-24 font-semibold z-50 select-none">
          <IconContext.Provider value={{ size: '1.4rem' }}>
            <div className="md:h-full w-full md:w-auto flex md:flex-col justify-between items-center md:py-16 p-6 top-0 dark:text-zinc-200">
              <div className="flex md:flex-col gap-6">
                <Link
                  href={'https://www.youtube.com/watch?v=2GXlAJPa-KM'}
                  target="_blank"
                >
                  <span className="md:rotate-180 md:writing-vertical-rl md:text-cyan-400 text-lg md:text-base">
                    LIFeng87
                  </span>
                </Link>

                <nav className="hidden md:flex flex-col gap-6">
                  {links.map((link) => (
                    <Link
                      className="relative flex"
                      href={link.url}
                      key={link.url}
                    >
                      {pathName === link.url && (
                        <motion.span
                          layoutId="nav_underline"
                          className="absolute h-full w-[2px] bg-cyan-400 end-0 rounded-full"
                        />
                      )}
                      <motion.span
                        initial={{ rotate: 180 }}
                        animate={{ rotate: 180 }}
                        whileHover={{ x: -3 }}
                        className="rotate-180 writing-vertical-rl"
                      >
                        {link.title}
                      </motion.span>
                    </Link>
                  ))}
                </nav>
              </div>

              <Popover.Trigger className="md:hidden">
                <Hamburger toggled={isOpen} size={20} />
              </Popover.Trigger>

              <div className="hidden md:flex md:flex-col gap-6">
                <SocialIcons />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <Popover.Portal forceMount>
                    <Popover.Content className="w-screen h-screen dark:bg-dark bg-light bg-switch">
                      <motion.div
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        className="h-[90%] w-full mx-auto flex flex-col overflow-y-auto justify-between items-center pt-24 pb-16 dark:text-zinc-200 font-semibold text-xl shadow-md"
                      >
                        <nav className="flex flex-col items-center gap-6">
                          {links.map((link) => (
                            <Link
                              onClick={() => {
                                setOpen(false);
                              }}
                              href={link.url}
                              key={link.url}
                              className="relative flex"
                            >
                              <motion.span whileHover={{ y: -3 }}>
                                {link.title}
                              </motion.span>
                              {pathName === link.url && (
                                <span className="absolute w-full h-[2px] bg-cyan-400 bottom-0 rounded-full" />
                              )}
                            </Link>
                          ))}
                        </nav>
                        <IconContext.Provider value={{ size: '1.6rem' }}>
                          <div className="flex md:hidden justify-between w-full px-12">
                            <div className="flex gap-6">
                              <SocialIcons />
                            </div>

                            <ThemeToggle />
                          </div>
                        </IconContext.Provider>
                      </motion.div>
                    </Popover.Content>
                  </Popover.Portal>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:block fixed top-0 right-0 p-8">
              <ThemeToggle />
            </div>
          </IconContext.Provider>
        </header>
      </Popover.Root>
    </>
  );
}
