import { useState } from "react"

interface Props {
    source: string
    alt: string
    id: string,
    clickable: boolean
    clickHandler?: any
}

const Image = ({source, alt, clickHandler, id, clickable}:Props) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative w-full bg-black h-full md:max-h-96 max-h-72
    rounded-lg flex justify-center items-center"
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => setHovering(false)}
    >

      <img 
        className="rounded-lg w-full h-full object-contain"
        src={source} 
        alt={alt}  />

      <button id={id} onClick={() => clickHandler(id)}
        className={`absolute top-5 right-5 z-50
        bg-white p-4 rounded-full ${clickable &&
          hovering ? "pointer-events-auto opacity-100" :
        "pointer-events-none opacity-0"} transition-opacity duration-150`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
    </div>
  )
}

export default Image