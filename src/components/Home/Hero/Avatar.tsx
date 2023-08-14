import React from 'react';
import clsx from 'clsx';

type Props = {};

const Avatar = (props: Props) => {
  return (
    <>
      <div
        className={clsx(
          'relative',
          'hidden md:flex',
          'items-center justify-center'
        )}
      >
        <div
          className={clsx(
            'absolute',
            'bottom-10 end-10',
            'h-[30rem] w-[30rem]',
            'bg-cyan-400 drop-shadow-md'
          )}
        >
          <div className="relative">
            <div
              className={clsx(
                'absolute',
                'z-0',
                'origin-center translate-x-[-50%] translate-y-[-25%]'
              )}
            >
              <h2
                className={clsx(
                  'writing-vertical-rl',
                  'font-hina text-7xl font-extrabold'
                )}
              >
                ハローワールド
              </h2>
            </div>
          </div>
        </div>

        <div
          className="aspect-h-5 aspect-w-4 relative w-[35rem] bg-contain bg-right-bottom bg-no-repeat"
          style={{ backgroundImage: `url(/images/lifeng87_nbsd.png)` }}
        ></div>
      </div>
    </>
  );
};

export default Avatar;
