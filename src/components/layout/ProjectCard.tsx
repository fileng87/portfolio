import React from 'react';

type Props = {
	children: JSX.Element;
};

export default function ProjectCard({ children }: Props) {
	return <div>{children}</div>;
}
