import Head from 'next/head';
import React from 'react';
import About from '../components/About';
import Contant from '../components/Contant';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';

export default function Home() {
	return (
		<>
			<Head>
				<title>LIFeng87</title>
			</Head>
			<Header />
			<main className="min-h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory h-screen">
				<section id="home" className="snap-center">
					<Hero />
				</section>
				<section id="about" className="snap-center">
					<About />
				</section>
				<section id="projects" className="snap-center">
					<Projects />
				</section>
				<section id="contant" className="snap-center">
					<Contant />
				</section>
			</main>
		</>
	);
}
