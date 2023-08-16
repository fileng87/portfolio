import clsx from 'clsx';
import React from 'react';

type Props = {};

export default function Content({}: Props) {
  return (
    <div className={clsx('h-80', 'flex flex-col gap-4')}>
      <h2
        className={clsx('text-2xl font-bold md:text-4xl')}
      >{`👋 Hi I'm LIFeng87`}</h2>

      <p
        className={clsx(
          'h-40 grow',
          'overflow-y-auto',
          'text-base leading-loose md:text-lg',
          'py-4',
          'border-t-[1px] border-t-neutral-500'
        )}
      >{`我的名字叫LIFeng87，19歲。\
      住在台灣，未婚。職業是學生。\
      每天都要上課到下午5點才能回家。我不抽煙，不喝酒。\
      晚上很晚睡，每天睡不足8個小時。\
      睡前，我一定喝一杯水，然後在床上滑20分鐘的手機，滑完後，直接睡不著。\
      失眠到天亮，絕對把疲勞和壓力留到第二天。醫生都說我過輕。`}</p>

      <p className={clsx('w-full', 'text-right text-neutral-500')}>
        2023/08/15 - LIFeng87
      </p>
    </div>
  );
}
