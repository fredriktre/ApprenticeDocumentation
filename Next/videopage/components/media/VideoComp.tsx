import { useEffect, useState } from "react"
import { MagnifyingGlass } from 'react-loader-spinner';

interface Props {
    source: string
    title: string
}

const VideoComp = ({source, title}:Props) => {
    const [mouseMoved, setMouseMoved] = useState<boolean>(true)

    useEffect(() => {
        if (mouseMoved) {
            setTimeout(() => {
                setMouseMoved(false)
            }, 10000)
        }
    }, [mouseMoved])

  return (
    <div className={`relative ${source.length < 1 ? "w-full aspect-video" : "w-fit h-fit"} rounded-lg overflow-hidden`}
        onMouseMove={() => {
            if (source.length > 0) {
                setMouseMoved(true)
            }
        }}>
        { source.length < 1 &&
            <div className="w-full aspect-video absolute top-0 left-0 z-20 bg-black flex justify-center items-center">
                <MagnifyingGlass
                    visible={true}
                    height="150"
                    width="150"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor = '#111111'
                    color = '#ffffff'
                />
            </div>
        }
        <video className={`${source.length < 1 && "opacity-0"}`}
            src={source}
            controls>
        </video>
        <div className={`absolute top-0 left-0 z-10 w-full p-2 pb-12 
        bg-gradient-to-b from-black to-transparent ${source.length < 1 ? "opacity-0" : `${mouseMoved ? "opacity-100" : "opacity-0"}`} pointer-events-none
        transition-opacity duration-300`}>
            <h2 className="text-white text-2xl">{title}</h2>
        </div>
    </div>
  )
}

export default VideoComp