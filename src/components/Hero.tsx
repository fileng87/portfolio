import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { IconContext } from 'react-icons';
import { BsGithub, BsTwitch, BsTwitter, BsYoutube } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Typewriter from 'typewriter-effect';
import SocialButton from './layout/SocialButton';

type Props = {};

export default function Hero({}: Props) {
	return (
		<div className="relative h-screen flex flex-col gap-4 justify-center items-center text-center inset-0">
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 1,
				}}
				className="relative bg-gray-400 w-28 h-28 mx-auto space-y-8 flex justify-center items-center text-center p-2 rounded-full object-cover"
			>
				<Image width={500} height={500} src="/logo.png" alt="" priority />
			</motion.div>

			<motion.h2
				initial={{
					y: -100,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					duration: 3,
					type: 'spring',
				}}
				className="text-gray-400 uppercase font-semibold tracking-[2px] ml-[2px]"
			>
				A person who loves to code
			</motion.h2>

			<motion.h1
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 1.5,
					type: 'circInOut',
				}}
				className="relative text-5xl lg:text-6xl font-silkscreen drop-shadow-md"
			>
				<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
					<Typewriter
						options={{
							delay: 80,
							deleteSpeed: 30,
						}}
						onInit={(typewriter) => {
							typewriter
								.typeString(
									'<span class="text-[#98c371]">Just</span> Code for <span class="text-[red]">henta</span>'
								)
								.deleteChars(5)
								.typeString(`<span class="text-[#22a7f2]">fun</span>`)
								.start();
						}}
					/>
				</a>
			</motion.h1>

			<motion.div
				initial={{
					y: 100,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					duration: 3,
					type: 'spring',
				}}
				className="flex flex-row justify-center items-center md:gap-20 gap-10 pt-6 text-gray-400"
			>
				<IconContext.Provider value={{ size: '1.6em' }}>
					<SocialButton href="https://twitter.com/lifeng87">
						<BsTwitter />
					</SocialButton>
					<SocialButton href="https://www.youtube.com/channel/UC-4_DC84v16kkJHEiqFQa0w">
						<BsYoutube />
					</SocialButton>
					<SocialButton href="https://www.twitch.tv/lifeng87">
						<BsTwitch />
					</SocialButton>
					<SocialButton href="https://github.com/lifeng-87">
						<BsGithub />
					</SocialButton>
				</IconContext.Provider>
			</motion.div>
			<div className="absolute text-gray-500 bottom-10 animate-bounce hover:text-gray-300 duration-200 z-10">
				<a href="#about">
					<MdOutlineKeyboardArrowDown size={25} />
				</a>
			</div>
		</div>
	);
}
