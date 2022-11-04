import React from 'react';

type Props = {
	name?: string;
	url?: string;
	description?: string;
	language?: string;
	contributors_url?: string;
	stargazers_count?: number;
	forks_count?: number;
	open_issues_count?: number;
};

export default function ProjectCard({
	name,
	url,
	description,
	language,
	contributors_url,
	stargazers_count,
	forks_count,
	open_issues_count,
}: Props) {
	return (
		<div className="relative flex justify-center w-screen items-center p-10 shrink-0 snap-center">
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl font-semibold">{name}</h1>
				<h2 className="text-gray-400 text-lg">{description}</h2>
			</div>
		</div>
	);
}
