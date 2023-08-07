import React from 'react';
import Image from 'next/image';

type Props = {};

const ArtPhoto = (props: Props) => {
  return (
    <>
      <div className="relative justify-center items-center hidden md:flex ms-16">
        <div className="absolute bg-cyan-400 -translate-x-10 translate-y-10 w-[30rem] h-[30rem] drop-shadow-md">
          <div className="relative">
            <div className="absolute z-0 origin-center -translate-x-[50%] -translate-y-[25%]">
              <h2 className="font-hina font-extrabold text-7xl writing-vertical-rl">
                ハローワールド
              </h2>
            </div>
          </div>
        </div>

        <div className="relative w-[30rem]">
          <Image
            width={560}
            height={768}
            alt="bruh"
            src={'/images/lifeng87_nbsd.png'}
          />
        </div>
      </div>
    </>
  );
};

export default ArtPhoto;
