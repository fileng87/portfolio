import BackgroundEffects from '@/components/backgrounds/backgroundEffects';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Marquee } from '@/components/marquee';
import About from '@/components/sections/about';
import Guestbook from '@/components/sections/guestbook';
import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';

export default function Home() {
  return (
    <>
      <Header />
      <BackgroundEffects />
      <main className="relative">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <Marquee text="AMBATUKAM" />

        <section id="projects">
          <Projects />
        </section>

        <section id="guestbook">
          <Guestbook />
        </section>
      </main>
      <Footer />
    </>
  );
}
