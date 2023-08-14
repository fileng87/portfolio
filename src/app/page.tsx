import About from '@/components/Home/About/About';
import Arrow from '@/components/Home/Arrow';
import Hero from '@/components/Home/Hero/Hero';
import Backgrand from '@/components/Layout/Backgrand';

export default function Home() {
  return (
    <>
      <div className="page snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <Backgrand />
        <section
          id="home"
          className="page-content flex min-h-screen snap-center justify-center md:max-w-[80%]"
        >
          <Hero />
          <Arrow />
        </section>
        <section id="about" className="page-content snap-center">
          <div className="page-root flex min-h-screen justify-center">
            <About />
          </div>
        </section>
        <div className=""></div>
      </div>
    </>
  );
}
