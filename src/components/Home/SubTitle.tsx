'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {};

function SubTitle({}: Props) {
  return (
    <div className="flex items-center mt-4 gap-4">
      <span className="bg-neutral-400 h-[2px] w-28 hidden md:block" />
      <h2 className="items-center flex text-neutral-400 text-4xl font-semibold font-oswald tracking-wider">
        <Typewriter
          options={{
            delay: 300,
          }}
          onInit={(typewriter) =>
            typewriter
              .typeString('And')
              .typeString(' I\'m not <span class="text-red-600">GAY</span>')
              .callFunction((state) => {
                // turn off animation
                state.elements.cursor.style.animation = 'none';
                // hide cursor
                state.elements.cursor.style.display = 'none';
              })
              .start()
          }
        />
      </h2>
    </div>
  );
}

export default SubTitle;
