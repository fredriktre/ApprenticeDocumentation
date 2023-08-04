import { useState } from 'react'
import './App.css'

function App() {
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div className='w-full min-h-screen h-full bg-blue-200 flex justify-center items-center perspective relative'>
     
      <div className='max-w-2xl aspect-square w-full rounded-full bg-blue-800 shadow-c centerpiece relative'>
      
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 card-aspect'>
          <div className='px-2 py-4 w-full h-full bg-black rounded-lg'>
            <div className='w-full h-full bg-white flex justify-center items-center rounded-lg'>
              <div className='rounded-full bg-black aspect-square w-4/5 flex justify-center items-center'>
                <p className='text-6xl text-white'>1</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='absolute top-3/4 left-1/2 -translate-x-1/2 w-4/5 h-64 p-4 bg-blue-800 rounded-xl shadow-c flex 
      gap-2 overflow-x-auto custom-scroll'>
        <div className='relative z-10 px-2 py-4 h-full card-aspect bg-black rounded-lg'>
          <div className='w-full h-full bg-white flex justify-center items-center' onClick={() => setCurrentCard(1)}>
            <div className='rounded-full bg-black aspect-square w-4/5 flex justify-center items-center'>
              <p className='text-6xl text-white'>+2</p>
            </div>
          </div>
          <div className={`absolute z-20 top-0 left-0 w-full h-1/2 flex justify-center items-center
          ${currentCard === 1 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
          transition-all duration-150`}>
            <button className='relative z-30 w-fit h-fit px-4 py-2 bg-blue-800 rounded-xl text-white
            '>Use</button>
            <span className='absolute z-20 top-0 left-0 w-full h-full bg-black opacity-60'></span>
          </div>
        </div>
        <span className='absolute z-[5] w-full h-full top-0 left-0' onClick={() => setCurrentCard(0)}></span>
      </div>

    </div>
  )
}

export default App
