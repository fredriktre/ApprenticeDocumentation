import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className="w-full min-h-screen h-full bg-black flex flex-col gap-5 justify-center items-center">

        <div className='w-fit flex flex-col gap-5'>
            <div className="bg-gray-700 rounded-lg p-4 w-full max-w-[40rem] flex justify-center">
                <h1 className="md:text-6xl text-2xl text-white font-bold">BoredHub</h1>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 w-full max-w-[40rem] flex justify-center">
                <p className="md:text-2xl text-lg text-white font-bold">Made by Fredrik S. T.</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 w-full max-w-[40rem] mt-5 flex justify-center">
                <p className="md:text-2xl text-lg text-white font-bold">Match the cards</p>
            </div>

            <div className='w-fit h-full grid md:grid-cols-3 md:mx-0 mx-auto grid-cols-1 gap-5 justify-items-center'>
                <Link to={`/game4x4/standard`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">
                    4x4 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                </Link>
                <Link to={`/game6x4/standard`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">6x4</Link>                
                <Link to={`/game6x6/standard`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">6x6</Link>
                <Link to={`/game8x4/standard`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">8x4</Link>
                <Link to={`/game8x8/standard`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">8x8</Link>
                <Link to={`/game10x10/standard`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">10x10</Link>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 w-full max-w-[40rem] mt-5 flex justify-center">
                <p className="md:text-2xl text-lg text-white font-bold">Match the cards | Pokemon edition</p>
            </div>

            <div className='w-fit h-full grid md:grid-cols-3 md:mx-0 mx-auto grid-cols-1 gap-5 justify-items-center'>
                <Link to={`/game4x4/pokemon`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">
                    4x4 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                </Link>
                <Link to={`/game6x4/pokemon`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">6x4</Link>             
                <Link to={`/game6x6/pokemon`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">6x6</Link>
                <Link to={`/game8x4/pokemon`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">8x4</Link>
                <Link to={`/game8x8/pokemon`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">8x8</Link>
                <Link to={`/game10x10/pokemon`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">10x10</Link>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 w-full max-w-[40rem] mt-5 flex justify-center">
                <p className="md:text-2xl text-lg text-white font-bold">Match the cards | Coding edition</p>
            </div>

            <div className='w-fit h-full grid md:grid-cols-3 md:mx-0 mx-auto grid-cols-1 gap-5 justify-items-center'>
                <Link to={`/game4x4/proglang`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">
                    4x4 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                </Link>
                <Link to={`/game6x4/proglang`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">6x4</Link>             
                <Link to={`/game6x6/proglang`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">6x6</Link>
                <Link to={`/game8x4/proglang`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">8x4</Link>
                <Link to={`/game8x8/proglang`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">8x8</Link>
                <Link to={`/game10x10/proglang`} 
                className="text-4xl text-white font-bold w-40 aspect-square flex justify-center items-center
                rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
                active:bg-gray-900">10x10</Link>
            </div>
        </div>
        

    </div>
  )
}

export default Menu