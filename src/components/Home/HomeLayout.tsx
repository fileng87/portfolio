import React from 'react';
import Backgrand from '../Layout/Backgrand';
import HeroLayout from './Hero/HeroLayout';
import Arrow from './Arrow';
import AboutLayout from './About/AboutLayout';
import HomeBlogLayout from './Blog/HomeBlogLayout';

type Props = {};

export default function HomeLayout({}: Props) {
  return (
    <div className="page snap-y snap-mandatory overflow-y-auto scroll-smooth">
      <section id="home" className="relative min-h-screen snap-center">
        <Backgrand />
        <div className="page-content fixed inset-0 -z-40 flex min-h-screen justify-center md:max-w-[80%]">
          <HeroLayout />
        </div>
        <div className="absolute inset-x-0 bottom-10">
          <Arrow />
        </div>
      </section>

      <div className="bg-color">
        <section id="about" className="page-content">
          <div className="page-root flex min-h-screen snap-center justify-center">
            <AboutLayout />
          </div>
        </section>

        <section id="blog" className="page-content">
          <div className="page-root min-h-screen snap-start">
            <HomeBlogLayout />
          </div>
        </section>
      </div>
    </div>
  );
}
