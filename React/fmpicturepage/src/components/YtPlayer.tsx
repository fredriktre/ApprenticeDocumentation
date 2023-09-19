import { useState } from "react"

interface Props {
  source: string,
  id: string,
  clickHandler?: any
  clickable: boolean
}

const YtPlayer = ({source, id, clickHandler, clickable}:Props) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="w-full bg-black h-full object-contain rounded-lg relative flex
    justify-center items-center overflow-hidden md:max-h-96 max-h-72"
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => setHovering(false)}
    >
        <iframe className="w-full h-full"
          width={"853"}
          height={"480"}
          src={`https://www.youtube.com/embed/${source}`} 
          frameBorder={"0"}
          allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
          allowFullScreen
          title="Embedded youtube"
        />
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

export default YtPlayer