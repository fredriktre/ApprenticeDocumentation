import { useState } from "react"

interface Props {
    source: string,
    title: string,
}

const VideoPlayer = ({source, title}:Props) => {
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
        justify-center items-center">

        <video width={"100%"} height={"100%"} controls>
            <source src={source} type="video/mp4" />
        </video>

        <div className={`absolute top-0 left-0 w-full h-12 overflow-hidden px-4
            flex justify-start items-center transition-opacity duration-150 ${videoHeaderShow ? 
            "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>

            <p className="text-white z-20 text-sm">{title}</p>

            <span className="absolute top-0 left-0 w-full h-[110%] bg-gradient-to-b 
            from-black to-transparent"></span>
        </div>
    </div>
  )
}

export default VideoPlayer