import React from 'react';
import ProjectCard from './layout/ProjectCard';

type Props = {};

export default function Projects({}: Props) {
	return (
		<div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
			<h1 className="absolute uppercase lg:text-3xl text-2xl tracking-[2rem] pl-[2rem] text-gray-500 select-none top-24">
				Projects
			</h1>

			<div className="flex flex-row mt-20 w-full gap-10 overflow-x-scroll overflow-y-hidden snap-x snap-mandatory"></div>
		</div>
	);
}
