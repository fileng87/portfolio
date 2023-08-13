'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {};

function SubTitle({}: Props) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <span className="hidden h-[2px] w-28 bg-neutral-400 md:block" />
      <h2 className="flex items-center font-oswald text-4xl font-semibold tracking-wider text-neutral-400">
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
