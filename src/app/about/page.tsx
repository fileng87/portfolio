import React from 'react';

type Props = {};

const About = (props: Props) => {
  return (
    <div className="page-layout-center">
      <span className="font-semibold md:text-6xl text-4xl">
        {`I'm not `}
        <span className="text-red-600">GAY</span>
      </span>
    </div>
  );
};

export default About;
