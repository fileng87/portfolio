import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {};

export default function About({}: Props) {
	return (
		<div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
			<h1 className="md:absolute uppercase md:text-3xl text-2xl tracking-[2rem] pl-[2rem] text-gray-500 select-none top-24 md:pt-0 pt-4">
				About
			</h1>
			<div className="relative flex md:flex-row flex-col gap-4 justify-center md:items-start items-center pt-6">
				<motion.div
					initial={{ x: -250, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 1.5, type: 'spring' }}
					exit={{ x: -250, opacity: 0 }}
					className="md:h-80 md:w-80 h-52 w-52"
				>
					<Image src="/images/AIArt.png" alt={''} height={500} width={500} />
				</motion.div>
				<div className="flex flex-col w-80 h-full">
					<motion.h2
						initial={{ x: 250, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ duration: 1.5, type: 'spring' }}
						exit={{ x: 250, opacity: 0 }}
						className="font-medium text-3xl pb-2 md:text-start text-center"
					>
						👋 Hello there
					</motion.h2>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1.5 }}
						exit={{ opacity: 0 }}
						className="bg-transparent border-b-[1px] border-gray-600"
					/>
					<motion.div
						initial={{ y: 250, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 1.5, type: 'spring' }}
						exit={{ opacity: 0 }}
						className="flex flex-col p-2 text-gray-400 justify-between h-full"
					>
						<p className="md:text-md text-base">
							我的名字叫 LIFeng87
							，18歲。住在台灣，未婚。職業是學生。常常都要上課到下午5點才能回家。
							我不抽煙，偶爾喝酒。晚上很晚睡，每天睡不足8個小時。睡前，我一定喝一杯水，然後在床上滑20分鐘的手機，
							滑完後，直接睡不著。失眠到天亮，絕對把疲勞和壓力留到第二天。
						</p>
						<div className="md:absolute flex justify-end pt-4  md:bottom-2 md:right-2">
							<span className="">
								{'2022/10 by '}
								<Link
									href="https://github.com/lifeng-87"
									className="text-blue-500"
								>
									@lifeng87
								</Link>
							</span>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
