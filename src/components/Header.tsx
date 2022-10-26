import Link from 'next/link';
import React, { useState } from 'react';
import { MdOutlineClear, MdOutlineMenu } from 'react-icons/md';

type Props = {};

export default function Header({}: Props) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<header
			className={`relative text-white flex justify-center items-center z-50 md:h-auto ${
				isOpen ? 'h-screen' : 'h-0'
			} duration-200`}
		>
			<div className="absolute top-0 flex flex-row md:flex-nowrap flex-wrap justify-between items-stretch w-screen max-w-7xl py-6 px-10">
				<div>
					<button
						onClick={() => (location.href = '/')}
						className="uppercase font-semibold text-2xl"
					>
						LIFeng87
					</button>
				</div>
				<button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <MdOutlineClear size={28} /> : <MdOutlineMenu size={28} />}
				</button>
				<nav
					className={`relative md:block md:w-auto w-screen md:top-0 ${
						isOpen ? 'top-0' : '-top-[50rem]'
					} duration-200`}
				>
					<ul className="flex flex-col md:flex-row gap-6 items-center md:pt-0 pt-6">
						<li>
							<Link href="#home">
								<button className="header-btn" onClick={() => setIsOpen(false)}>
									Home
								</button>
							</Link>
						</li>
						<li>
							<Link href="#about">
								<button className="header-btn" onClick={() => setIsOpen(false)}>
									About
								</button>
							</Link>
						</li>
						<li>
							<Link href="#projects">
								<button className="header-btn" onClick={() => setIsOpen(false)}>
									Projects
								</button>
							</Link>
						</li>
						<li>
							<Link href="#contant">
								<button className="header-btn" onClick={() => setIsOpen(false)}>
									Contant
								</button>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
