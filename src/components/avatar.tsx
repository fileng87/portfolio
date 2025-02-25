import { motion } from 'framer-motion';
import md5 from 'md5';
import { cn } from '@/lib/utils';

interface AvatarProps {
  className?: string;
  email: string;
  size?: number;
}

export function Avatar({ className, email, size = 400 }: AvatarProps) {
  const gravatarHash = md5(email.toLowerCase().trim());
  const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?s=${size}`;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-pink-100/50 dark:bg-cyan-950/50',
        className
      )}
    >
      <motion.img
        src={gravatarUrl}
        alt="Avatar"
        className="size-full object-cover"
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
