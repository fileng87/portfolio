'use client';

import React, { useEffect, useState } from 'react';
import { LuArrowUp } from 'react-icons/lu';

type Props = {};

export default function ScrollToTopBtn({}: Props) {
  const [backToTopButton, setBackToTopButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100) {
        setBackToTopButton(true)
      } else {
        setBackToTopButton(false)
      }
    })
  }, []);

  const scrollToTop = ()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  return (
    <>
    { backToTopButton && (<button
      className="fixed bottom-0 right-0 m-10 p-2 dark:bg-neutral-700 bg-neutral-300 rounded-full z-40"
      onClick={scrollToTop}
    >
      <LuArrowUp size={25} />
    </button>)}
    </>
  );
}
