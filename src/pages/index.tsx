import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';

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
					<div className="h-screen"></div>
				</section>
			</main>
		</>
	);
}
