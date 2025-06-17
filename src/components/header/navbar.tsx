import { JSX } from 'react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDown, Mail } from 'lucide-react';
import Link from 'next/link';

const navLinks: { title: string; url: string }[] = [
  { title: 'Home', url: '#hero' },
  { title: 'About', url: '#about' },
  { title: 'Projects', url: '#projects' },
  { title: 'Guestbook', url: '#guestbook' },
];

const socialLinks: { title: string; url: string; icon: JSX.Element }[] = [
  {
    title: 'GitHub',
    url: 'https://github.com/fileng87',
    icon: <FaGithub className="size-4" />,
  },
  {
    title: 'Twitter / X',
    url: 'https://x.com/fileng87',
    icon: <FaXTwitter className="size-4" />,
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/channel/UC-4_DC84v16kkJHEiqFQa0w',
    icon: <FaYoutube className="size-4" />,
  },
  {
    title: 'Email',
    url: 'mailto:oscarcoll.930714@gmail.com',
    icon: <Mail className="size-4" />,
  },
];

interface NavbarProps {
  mobile?: boolean;
  onLinkClick?: () => void; // 添加這個屬性
}

export default function Navbar({ mobile, onLinkClick }: NavbarProps) {
  return (
    <NavigationMenu
      className={cn(
        'w-full bg-transparent', // Added w-full here
        mobile && 'flex flex-col items-start'
      )}
    >
      <NavigationMenuList
        className={cn(
          'w-full bg-transparent', // Added w-full here
          mobile
            ? 'flex-col items-start gap-4' // Mobile styles
            : 'flex justify-center' // Desktop styles
        )}
      >
        {navLinks.map(({ title, url }) => (
          <NavigationMenuItem
            key={title}
            className={cn(mobile && 'w-full')}
            onClick={mobile ? onLinkClick : undefined}
          >
            <Link href={url} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent! transition-colors',
                  mobile && 'w-full justify-start! text-lg',
                  !mobile && 'hover:bg-primary/10! active:bg-primary/10!',
                  'rounded-full!'
                )}
              >
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem className={cn('w-full', !mobile && 'w-auto')}>
          {mobile ? (
            <Accordion type="single" collapsible className="w-full px-4">
              <AccordionItem value="links" className="border-none">
                <AccordionTrigger
                  className={cn(
                    'justify-start! gap-2 bg-transparent! py-2 text-lg transition-colors',
                    'no-underline!'
                  )}
                >
                  Links
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <ul className="space-y-2">
                    {socialLinks.map(({ title, url, icon }) => (
                      <li key={title}>
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onLinkClick} // 添加點擊事件處理
                          className={`flex w-full items-center gap-2 rounded-lg! bg-transparent! px-3 py-2 transition-colors hover:bg-pink-300/10! focus:bg-transparent! active:bg-pink-300/20! dark:hover:bg-cyan-900/30! dark:active:bg-cyan-900/50!`}
                        >
                          {icon}
                          <span className="text-gray-700 dark:text-gray-300">
                            {title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="group flex items-center gap-1 rounded-full! bg-transparent! transition-colors hover:bg-primary/10! active:bg-primary/10!"
                >
                  Links
                  <ChevronDown className="size-4 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="relative min-w-32 rounded-lg border-pink-300/50 bg-white/10 p-2 shadow-[0_0_15px_rgba(0,0,0,0.1)] backdrop-blur-xs dark:border-cyan-900/50 dark:bg-gray-800/10 dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                <ul className="space-y-2">
                  {socialLinks.map(({ title, url, icon }) => (
                    <li key={title}>
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex w-full items-center gap-2 rounded-lg! bg-transparent! px-3 py-2 transition-colors hover:bg-pink-300/10! focus:bg-transparent! active:bg-pink-300/20! dark:hover:bg-cyan-900/30! dark:active:bg-cyan-900/50!`}
                      >
                        {icon}
                        <span className="text-gray-700 dark:text-gray-300">
                          {title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
