import { report } from '@/public/images'
import Image from 'next/image'
import React from 'react'


export default function Reports() {
  return (
    <div className='flex w-screen h-screen'>
      <Image src={report}></Image>
    </div>
  )
}
