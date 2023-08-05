import ArtPhoto from '@/components/Layout/ArtPhoto';
import PageWapper from '@/components/Layout/PageWapper';
import React from 'react';

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <PageWapper>
        <div className="h-full flex flex-wrap justify-center items-start py-40">
          <div className="h-full flex flex-col gap-6">
            <h1 className="md:text-5xl text-2xl font-semibold">Hello There</h1>
            <p className="md:text-2xl text-sm max-w-lg text-neutral-400 md:leading-8">
              我的名字叫 LIFeng87 (好啦其實不是)
              ，18歲。住在台灣，未婚。職業是學生。常常都要上課到下午5點才能回家。
              我不抽煙，偶爾喝酒。晚上很晚睡，每天睡不足8個小時。睡前，我一定喝一杯水，然後在床上滑20分鐘的手機，
              滑完後，直接睡不著。失眠到天亮，絕對把疲勞和壓力留到第二天。
            </p>
          </div>
          <div className="ms-32">
            <ArtPhoto />
          </div>
        </div>
      </PageWapper>
    </>
  );
};

export default About;
