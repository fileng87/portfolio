import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

export default function About({}: Props) {
	return (
		<div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
			<h1 className="md:absolute uppercase lg:text-3xl text-2xl tracking-[2rem] pl-[2rem] text-gray-500 select-none top-24 md:pt-0 pt-4">
				About
			</h1>
			<div className="relative flex lg:flex-row flex-col gap-4 justify-center lg:items-start items-center pt-6">
				<div className="lg:h-80 lg:w-80 h-52 w-52">
					<Image src="/images/AIArt.png" alt={''} height={500} width={500} />
				</div>
				<div className="flex flex-col lg:w-[40rem] w-80 h-full">
					<h2 className="font-medium text-3xl border-b-[1px] border-gray-600 pb-1 lg:text-start text-center">
						👋 Hello there
					</h2>
					<div className="flex flex-col p-2 text-gray-400 justify-between h-full">
						<p className="md:text-lg text-base">
							我的名字叫 LIFeng87 ，18歲。住在台灣，未婚。職業是學生。常常都要上課到下午5點才能回家。
							我不抽煙，偶爾喝酒。晚上很晚睡，每天睡不足8個小時。睡前，我一定喝一杯水，然後在床上滑20分鐘的手機，
							滑完後，直接睡不著。失眠到天亮，絕對把疲勞和壓力留到第二天。
						</p>
						<div className="lg:absolute flex justify-end pt-4  lg:bottom-2 lg:right-2">
							<span className="">
								{'2022/10 by '}
								<Link href="https://github.com/lifeng-87" className="text-blue-500">
									@lifeng87
								</Link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
