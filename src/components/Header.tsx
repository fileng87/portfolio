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
			} duration-200 select-none`}
		>
			<div
				className={`absolute top-0 flex flex-row md:flex-nowrap flex-wrap justify-between items-center w-screen max-w-7xl py-6 px-10 overflow-hidden`}
			>
				<div>
					<button onClick={() => (location.href = '/')} className="uppercase font-semibold text-2xl">
						LIFeng87
					</button>
				</div>
				<button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <MdOutlineClear size={28} /> : <MdOutlineMenu size={28} />}
				</button>
				<nav
					className={`relative md:block md:w-auto w-screen md:right-0 ${
						isOpen ? 'right-0' : '-right-[50rem]'
					} duration-200`}
				>
					<ul className="flex flex-col md:flex-row gap-6 items-start md:pt-0 pt-6">
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
						{/*<li>
							<Link href="#projects">
								<button className="header-btn" onClick={() => setIsOpen(false)}>
									Projects
								</button>
							</Link>
						</li>
						<li>
							<Link href="#contact">
								<button className="header-btn" onClick={() => setIsOpen(false)}>
									Contact
								</button>
							</Link>
				</li>*/}
					</ul>
				</nav>
			</div>
		</header>
	);
}
