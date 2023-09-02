import React from 'react'

type Props = {}

export default function Avatar({}: Props) {
  return (
    <div className='hidden md:flex relative'>
      <div className=' bg-theme-main relative -bottom-4 -end-4 rounded-sm'>
      <div
          className="aspect-h-1 aspect-w-1 w-[33rem] bg-contain bg-right-bottom bg-no-repeat relative -start-4 -top-4 drop-shadow-md rounded-sm"
          style={{ backgroundImage: `url(/images/lifeng87-avatar.png)` }}
        />
      </div>
    </div>
  )
}