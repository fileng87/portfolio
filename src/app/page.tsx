import Hero from "./components/hero";

export default function Home() {
  return (
    <main>
      <section className="h-screen w-screen relative" id="hero">
        <Hero />
      </section>
    </main>
  );
}
