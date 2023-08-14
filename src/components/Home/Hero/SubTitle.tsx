'use client';

import clsx from 'clsx';
import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {};

function SubTitle({}: Props) {
  return (
    <div className={clsx('mt-4 gap-4', 'flex', 'items-center ')}>
      <span
        className={clsx('grow md:grow-0', 'h-[2px] w-28', 'bg-neutral-400')}
      />
      <h2
        className={clsx(
          'flex shrink-0',
          'items-center',
          'font-oswald font-semibold tracking-wider text-neutral-400',
          'text-2xl md:text-4xl'
        )}
      >
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
