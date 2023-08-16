'use client';

import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IconContext } from 'react-icons';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import SocialIcons from './SocialIcons';
import HeaderTitle from './HeaderTitle';
import Hamburger from 'hamburger-react';
import ThemeToggle from './ThemeToggle';

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
      <Popover.Root defaultOpen={false} open={isOpen} onOpenChange={setOpen}>
        <Popover.Anchor />
        <header className={clsx('h-24 w-full', 'fixed', 'z-50', 'select-none')}>
          <IconContext.Provider value={{ size: '1.4rem' }}>
            {/**Left */}
            <div className={clsx('sr-only md:not-sr-only')}>
              <div
                className={clsx(
                  'fixed inset-y-0',
                  'flex flex-col',
                  'w-[10%]',
                  'items-center justify-between',
                  'py-16'
                )}
              >
                <div className="flex flex-col gap-6 font-bold">
                  <HeaderTitle />

                  <nav className="flex flex-col gap-6">
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
                            className={clsx(
                              'h-full w-[2px]',
                              'rounded-full',
                              'absolute end-0 ',
                              'bg-theme-main'
                            )}
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

                <div className="flex flex-col gap-6">
                  <SocialIcons />
                </div>
              </div>

              <div className="flex h-24 items-center justify-end px-8">
                <div className="p-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/** Moblie */}
            <div
              className={clsx(
                'container',
                'flex',
                'h-full w-full',
                'items-center justify-between',
                'px-6',
                'font-bold',
                'not-sr-only md:sr-only'
              )}
            >
              <HeaderTitle />
              <Popover.Trigger className="md:hidden">
                <Hamburger toggled={isOpen} size={20} />
              </Popover.Trigger>
            </div>

            <AnimatePresence>
              {isOpen && (
                <Popover.Portal forceMount>
                  <Popover.Content className="bg-color h-screen w-screen">
                    <motion.div
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      className={clsx(
                        'flex flex-col',
                        'h-[90%] w-full',
                        'items-center justify-between',
                        'overflow-y-auto',
                        'mx-auto pb-16 pt-24',
                        'text-xl font-semibold',
                        'shadow-md'
                      )}
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
                              <span
                                className={clsx(
                                  'h-[2px] w-full',
                                  'rounded-full',
                                  'absolute bottom-0 ',
                                  'bg-theme-main'
                                )}
                              />
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
          </IconContext.Provider>
        </header>
      </Popover.Root>
    </>
  );
}
