import { useState } from "react"

interface Props {
    source: string,
    id: string,
    clickHandler?: any
    clickable: boolean
    title: string,
}

const VideoPlayer = ({source, title, id, clickHandler, clickable}:Props) => {
    const [videoHeaderShow, setVideoHeaderShow] = useState<boolean>(false)
    const [timeoutStarted, setTimeoutStarted] = useState<boolean>(false)

    function handleMouseOut () {
        
        if (timeoutStarted === false) {
            setTimeoutStarted(true)
            setTimeout(() => {
                setVideoHeaderShow(false)
                setTimeoutStarted(false)
            }, 500)
        }

    }

  return (
    <div onMouseEnter={() => setVideoHeaderShow(true)} onMouseLeave={handleMouseOut}
        className="w-full bg-black h-full object-contain rounded-lg relative flex
        justify-center items-center overflow-hidden md:max-h-96 max-h-72">

        <video width={"100%"} height={"100%"} controls className="w-full h-full">
            <source src={source} type="video/mp4" />
        </video>

        <div className={`absolute top-0 left-0 w-full h-12 overflow-hidden px-4
            flex justify-start items-center transition-opacity duration-150 ${videoHeaderShow ? 
            "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>

            <p className="text-white z-20 text-sm">{title}</p>

            <span className="absolute top-0 left-0 w-full h-[110%] bg-gradient-to-b 
            from-black to-transparent"></span>
        </div>
        
        <button id={id} onClick={() => clickHandler(id)}
        className={`absolute top-5 right-5 z-50
        bg-white p-4 rounded-full ${clickable &&
          videoHeaderShow ? "pointer-events-auto opacity-100" :
        "pointer-events-none opacity-0"} transition-opacity duration-150`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
    </div>
  )
}

export default VideoPlayer