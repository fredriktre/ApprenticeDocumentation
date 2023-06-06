import Image from "next/image"
import Teamup from "../svg/teamup"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const Landing = () => {
  const landingRef = useRef<any>()
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (!landingRef) return

    const handleMouseMove = (event:MouseEvent) => {
      if (landingRef.current.offsetWidth > 768) {
        setMousePos({x:event.clientX - 200, y: event.clientY - 200})
      }
    }

    landingRef.current.addEventListener('mousemove', handleMouseMove)
  }, [landingRef])

  return (
    <div ref={landingRef} className='relative w-full h-full min-h-[30rem] flex flex-col justify-center items-center'>
      <div className="relative bg-teal-950 flex justify-center items-center gap-10 w-full h-full overflow-hidden">
        <div className="relative z-10 max-w-lg flex flex-col gap-5">
          <h1 className='text-4xl text-white'>Managing your business's tasks has never been easier</h1>
          <p className="text-white text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Link href={"/register"} className="w-fit bg-teal-100 hover:bg-teal-200 px-4 py-2 rounded-lg border-b-2 border-r-2
              border-teal-500 hover:border-teal-800 transition-all duration-150">Register now!</Link>          
        </div>
        <div className="lg:block hidden max-w-lg relative z-10">
          <Teamup />
        </div>
        <span className={`absolute z-0 rg-dot md:block hidden w-96 h-96`} style={{
            top: mousePos.y,
            left: mousePos.x,
          }}></span>
      </div>
      <div className='w-full'>
        <svg id="visual" viewBox="0 0 5000 600" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 229L64.2 232C128.3 235 256.7 241 384.8 239.3C513 237.7 641 228.3 769.2 221C897.3 213.7 1025.7 208.3 1153.8 201.3C1282 194.3 1410 185.7 1538.2 196.2C1666.3 206.7 1794.7 236.3 1923 250.5C2051.3 264.7 2179.7 263.3 2307.8 248.5C2436 233.7 2564 205.3 2692.2 204.7C2820.3 204 2948.7 231 3077 227.3C3205.3 223.7 3333.7 189.3 3461.8 191.2C3590 193 3718 231 3846.2 245.2C3974.3 259.3 4102.7 249.7 4230.8 248.5C4359 247.3 4487 254.7 4615.2 239.7C4743.3 224.7 4871.7 187.3 4935.8 168.7L5000 150L5000 0L4935.8 0C4871.7 0 4743.3 0 4615.2 0C4487 0 4359 0 4230.8 0C4102.7 0 3974.3 0 3846.2 0C3718 0 3590 0 3461.8 0C3333.7 0 3205.3 0 3077 0C2948.7 0 2820.3 0 2692.2 0C2564 0 2436 0 2307.8 0C2179.7 0 2051.3 0 1923 0C1794.7 0 1666.3 0 1538.2 0C1410 0 1282 0 1153.8 0C1025.7 0 897.3 0 769.2 0C641 0 513 0 384.8 0C256.7 0 128.3 0 64.2 0L0 0Z" fill="#042f2e" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
      </div>
    </div>
  )
}

export default Landing