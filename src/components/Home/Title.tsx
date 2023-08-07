'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {};

export default function Title({}: Props) {
  return (
    <h1 className="md:text-8xl text-6xl font-medium drop-shadow-md font-oswald tracking-wider">
      <Typewriter
        options={{
          delay: 80,
          deleteSpeed: 30,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(
              '<span class="text-yellow-300">Still</span> code for <span class="text-red-600">henta</span>'
            )
            .deleteChars(5)
            .typeString(`<span class="text-[#22a7f2]">fun</span>`)
            .callFunction((state) => {
              // turn off animation
              state.elements.cursor.style.animation = 'none';
              // hide cursor
              state.elements.cursor.style.display = 'none';
            })
            .start();
        }}
      />
    </h1>
  );
}
