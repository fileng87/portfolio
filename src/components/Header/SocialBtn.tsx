'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  icon: React.ReactNode;
  url: string;
};

export default function SocialBtn({ icon, url }: Props) {
  return (
    <>
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1 }}>
        <Link href={url} target="_blank">
          {icon}
        </Link>
      </motion.div>
    </>
  );
}
