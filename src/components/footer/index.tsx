import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

// 复用 Navbar 中的社交链接数据
const socialLinks = [
  {
    title: 'GitHub',
    url: 'https://github.com/fileng87',
    icon: <FaGithub className="size-5" />,
  },
  {
    title: 'Twitter / X',
    url: 'https://x.com/fileng87',
    icon: <FaXTwitter className="size-5" />,
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/channel/UC-4_DC84v16kkJHEiqFQa0w',
    icon: <FaYoutube className="size-5" />,
  },
  {
    title: 'Email',
    url: 'mailto:oscarcoll.930714@gmail.com',
    icon: <Mail className="size-5" />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-transparent to-pink-200/50 py-8 backdrop-blur-sm dark:to-black/50">
      <div className="container mx-auto px-4 md:px-20 lg:px-40">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-xl font-bold">
              WenNya
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              © {currentYear} All rights reserved
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="mb-4 flex space-x-4">
              {socialLinks.map(({ title, url, icon }) => (
                <SocialLink key={title} href={url} icon={icon} label={title} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by{' '}
              <Link
                className="transition-colors hover:text-pink-500 hover:underline dark:hover:text-cyan-400"
                href="https://github.com/fileng87"
                target="_blank"
                rel="noopener noreferrer"
              >
                @fileng87
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'rounded-full p-2 transition-colors',
        'text-foreground/80 hover:text-foreground',
        'bg-transparent hover:bg-pink-300/10 dark:hover:bg-cyan-900/30'
      )}
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
