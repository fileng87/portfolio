import About from '@/components/Home/About/About';
import Arrow from '@/components/Home/Arrow';
import Hero from '@/components/Home/Hero/Hero';
import Backgrand from '@/components/Layout/Backgrand';

export default function Home() {
  return (
    <>
      <div className="page">
        <Backgrand />
        <div className="page-content absolute inset-0 -z-40 md:max-w-[80%]">
          <Hero />
        </div>
        <div className="h-full snap-y snap-mandatory overflow-y-auto scroll-smooth">
          <section
            id="home"
            className="page-content flex min-h-screen snap-center justify-center"
          >
            <Arrow />
          </section>
          <div className="bg-color bg-transition z-50 w-full">
            <section id="about" className="page-content snap-center">
              <div className="page-root flex min-h-screen justify-center">
                <About />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
