import React from 'react'
import { SignOutButton } from "@clerk/nextjs";


function page() {
  return (
    <div className='bg-black'>
      Hola Reds

<div className='bg-red-700'>

      <SignOutButton />
</div>
    </div>
  )
}

export default page
