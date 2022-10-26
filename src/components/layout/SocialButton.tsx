import Link from 'next/link';
import React from 'react';

type Props = {
	children?: JSX.Element;
	id?: string;
	className?: string;
	href: string;
};

export default function SocialButton({ children, id, className, href }: Props) {
	return (
		<Link
			href={href}
			target="_blank"
			className="hover:text-gray-300 hover:scale-110 active:scale-90 duration-200 transition ease-in-out"
		>
			{children}
		</Link>
	);
}
