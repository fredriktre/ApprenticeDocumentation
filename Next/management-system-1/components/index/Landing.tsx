import React from 'react'

const Landing = () => {
  return (
    <div className='w-4/5 h-full mx-auto flex flex-col justify-center items-center gap-10'>
        <h1 className='text-4xl'>Management dashboard</h1>
        
        <div className='w-80 h-40 grid grid-cols-10 grid-rows-6 border-2 border-black'>
          <div className='w-full h-full col-start-1 col-end-2 row-span-6 bg-black'></div>
          <div className='w-full h-full col-start-2 col-end-11 row-span-1 bg-black'></div>
          <div className='w-full h-full col-start-3 col-end-5 row-start-3 row-end-7 bg-black'></div>
          <div className='w-full h-full col-start-6 col-end-11 row-start-3 row-end-4 bg-black'></div>
          <div className='w-full h-full col-start-6 col-end-11 row-start-5 row-end-7 bg-black'></div>
        </div>
      </div>
  )
}

export default Landing