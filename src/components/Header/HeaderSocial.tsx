import React from 'react';
import SocialButton from '../Button/SocialButton';
import { BsGithub, BsYoutube, BsTwitter } from 'react-icons/bs';

type Props = {};

const HeaderSocial = (props: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <SocialButton herf="https://github.com/lifeng-87">
        <BsGithub size={'1.4rem'} />
      </SocialButton>
      <SocialButton herf="https://www.youtube.com/channel/UC-4_DC84v16kkJHEiqFQa0w">
        <BsYoutube size={'1.4rem'} />
      </SocialButton>
      <SocialButton herf="https://twitter.com/lifeng87">
        <BsTwitter size={'1.4rem'} />
      </SocialButton>
    </div>
  );
};

export default HeaderSocial;
