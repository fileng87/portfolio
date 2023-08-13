import React from 'react';
import { MdSearch } from 'react-icons/md';

type Props = {};

export default function Searchbar({}: Props) {
  return (
    <div className="relative flex h-12 w-[50%] items-center">
      <div className="pointer-events-none absolute z-40 p-4">
        <MdSearch size={'1.4rem'} />
      </div>

      <input
        type="search"
        placeholder="沒有用的搜尋欄"
        className="h-full w-full rounded-xl bg-slate-50/20 pe-2 ps-12 shadow-lg backdrop-blur dark:bg-black/20 "
      />
    </div>
  );
}
