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
        <header className="fixed z-50 flex h-24 w-full select-none items-center justify-center font-semibold md:h-full md:w-[10%]">
          <IconContext.Provider value={{ size: '1.4rem' }}>
            <div className="top-0 flex w-full items-center justify-between p-6 dark:text-zinc-200 md:h-full md:w-auto md:flex-col md:py-16">
              <div className="flex gap-6 md:flex-col">
                <Link
                  href={'https://www.youtube.com/watch?v=2GXlAJPa-KM'}
                  target="_blank"
                >
                  <span className="md:writing-vertical-rl text-lg md:rotate-180 md:text-base md:text-cyan-400">
                    LIFeng87
                  </span>
                </Link>

                <nav className="hidden flex-col gap-6 md:flex">
                  {links.map((link) => (
                    <Link
                      className="relative flex"
                      href={link.url}
                      key={link.url}
                      scroll={false}
                    >
                      {pathName === link.url && (
                        <motion.span
                          layoutId="nav_underline"
                          className="absolute end-0 h-full w-[2px] rounded-full bg-cyan-400"
                        />
                      )}
                      <motion.span
                        initial={{ rotate: 180 }}
                        animate={{ rotate: 180 }}
                        whileHover={{ x: -3 }}
                        className="writing-vertical-rl rotate-180"
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

              <div className="hidden gap-6 md:flex md:flex-col">
                <SocialIcons />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <Popover.Portal forceMount>
                    <Popover.Content className="dark:bg-dark bg-light bg-transition h-screen w-screen">
                      <motion.div
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        className="mx-auto flex h-[90%] w-full flex-col items-center justify-between overflow-y-auto pb-16 pt-24 text-xl font-semibold shadow-md dark:text-zinc-200"
                      >
                        <nav className="flex flex-col items-center gap-6">
                          {links.map((link) => (
                            <Link
                              onClick={() => {
                                setOpen(false);
                              }}
                              href={link.url}
                              key={link.url}
                              scroll={false}
                              className="relative flex"
                            >
                              <motion.span whileHover={{ y: -3 }}>
                                {link.title}
                              </motion.span>
                              {pathName === link.url && (
                                <span className="absolute bottom-0 h-[2px] w-full rounded-full bg-cyan-400" />
                              )}
                            </Link>
                          ))}
                        </nav>
                        <IconContext.Provider value={{ size: '1.6rem' }}>
                          <div className="flex w-full justify-between px-12 md:hidden">
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

            <div className="fixed right-0 top-0 z-50 hidden p-8 md:block">
              <ThemeToggle />
            </div>
          </IconContext.Provider>
        </header>
      </Popover.Root>
    </>
  );
}
