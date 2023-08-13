import React from 'react';

type Props = {};

export default function Description({}: Props) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-bold md:text-6xl">👋 Welcome to my blog!</h1>
      <div className="flex flex-col gap-6 text-lg">
        <p>歡迎來到我的小破站</p>
        <p>這裡是我平常亂丟垃圾文的地方</p>
        <p>雖然我也不知道我會亂丟什麼</p>
      </div>
    </div>
  );
}
