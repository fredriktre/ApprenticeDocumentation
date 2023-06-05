import Layout from "@/components/g/Layout";
import { useEffect, useRef, useState } from "react"
import Image from "next/image";

export default function Home() {
  const video = useRef<any>(null)
  const [videoHover, setVideoHover] = useState<boolean>(false)

  useEffect(() => {
    if (!video.current) return
    video.current.play();
  }, [video.current])

  return (
    <Layout>
      
      <div className="w-4/5 mx-auto flex h-[90vh] md:flex-row flex-col justify-center items-center md:gap-40 gap-10">
        <div className="md:w-fit w-full">
          <h1 className="lg:text-6xl text-4xl pointer-events-none">Atmon</h1>
          <p className="lg:text-xl text-md pointer-events-none">Webshop</p>
        </div>
        <div 
        onMouseEnter={() => setVideoHover(true)} onMouseLeave={() => setVideoHover(false)}
        className="relative md:w-fit w-full flex lg:justify-center items-center overflow-hidden 
        border-4 border-emerald-200 hover:border-emerald-800 transition-colors duration-150">
          <video
            className="relative z-[2] md:w-80 w-full max-w-xs"
            ref={video}
            autoPlay={true}
            loop={true}
            muted={true}
            preload="auto">
            <source src={"/videos/landing/cup.mp4"}></source>
          </video>
          <div className={`absolute z-[3] ${videoHover ? "bottom-0" : "-bottom-1/2"} 
          w-full h-1/2 bg-emerald-800 text-white transition-all duration-150 p-4`}>
            <p>Advertisement Title</p>
            <p className="text-sm">This is an advertisement for some new goods</p>
          </div>
        </div>
      </div>

    </Layout>
  )
}
