import React from 'react';
import { MdSearch } from 'react-icons/md';

type Props = {};

export default function Searchbar({}: Props) {
  return (
    <div className="relative w-[50%] h-12 md:flex items-center hidden">
      <div className="absolute p-4 z-40 pointer-events-none">
        <MdSearch size={'1.4rem'} />
      </div>

      <input
        type="search"
        placeholder="沒有用的搜尋欄"
        className="w-full h-full dark:bg-black/20 bg-slate-50/20 backdrop-blur shadow-lg rounded-xl ps-12 pe-2 "
      />
    </div>
  );
}
