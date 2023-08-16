import About from '@/components/Home/About/About';
import Arrow from '@/components/Home/Arrow';
import HomeBlogPage from '@/components/Home/Blog/HomeBlogPage';
import Hero from '@/components/Home/Hero/Hero';
import Backgrand from '@/components/Layout/Backgrand';

export default function Home() {
  return (
    <>
      <div className="page snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <section id="home" className="relative min-h-screen snap-center">
          <Backgrand />
          <div className="page-content fixed inset-0 -z-40 flex min-h-screen justify-center md:max-w-[80%]">
            <Hero />
          </div>
          <div className="absolute inset-x-0 bottom-10">
            <Arrow />
          </div>
        </section>

        <div className="bg-color">
          <section id="about" className="page-content">
            <div className="page-root flex min-h-screen snap-center justify-center">
              <About />
            </div>
          </section>

          <section id="blog" className="page-content">
            <div className="page-root min-h-screen snap-start">
              <HomeBlogPage />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
