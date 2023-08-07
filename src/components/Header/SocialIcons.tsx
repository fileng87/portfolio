'use client';

import React from 'react';
import { BsGithub, BsTwitter, BsYoutube } from 'react-icons/bs';
import SocialBtn from './SocialBtn';

type Props = {};

const socialButtons = [
  {
    icon: <BsTwitter />,
    url: 'https://twitter.com/lifeng87',
  },
  {
    icon: <BsYoutube />,
    url: 'https://www.youtube.com/channel/UC-4_DC84v16kkJHEiqFQa0w',
  },
  { icon: <BsGithub />, url: 'https://github.com/lifeng-87' },
];

export default function SocialIcons({}: Props) {
  return (
    <>
      {socialButtons.map((btn) => (
        <SocialBtn key={btn.url} {...btn} />
      ))}
    </>
  );
}
