import Layout from "@/components/Layout"
import Card from '@/components/Card'
import Link from 'next/link'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from "react"


const about = () => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [currHover, setCurrHover] = useState(0)
    const imageCard = useRef<any>(null)

    useLayoutEffect(() => {
        if (imageCard.current) {
            if (imageCard.current != null) {
                const curr = imageCard.current
                console.log(curr.offsetWidth)
                if (curr.offsetWidth <= 480) {
                    setWidth(curr.offsetWidth)
                    setHeight(curr.offsetWidth * 0.5)
                } else {
                    setWidth(480)
                    setHeight(480 * 0.5)
                }
            }
        }
    }, [])

    return (
      <Layout UseNav={true}>

          <div className="w-4/5 mx-auto flex lg:flex-row flex-col gap-5">
              <div className="w-full flex flex-col gap-5">
                <Link href={"/about/education"} onMouseEnter={() => setCurrHover(1)} onMouseLeave={() => setCurrHover(0)}>
                  <Card 
                  bg="bg-cyan-800" 
                  bordercolor="border-cyan-300" 
                  className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                    <p className="text-white sm:text-lg text-md font-bruno">Education</p>
                  </Card>
                </Link>
                <Link href={"/about/experience"} onMouseEnter={() => setCurrHover(2)} onMouseLeave={() => setCurrHover(0)}>
                  <Card 
                  bg="bg-cyan-800" 
                  bordercolor="border-cyan-300" 
                  className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                    <p className="text-white sm:text-lg text-md font-bruno">Experience</p>
                  </Card>
                </Link>
                <Link href={"/about/skills"} onMouseEnter={() => setCurrHover(3)} onMouseLeave={() => setCurrHover(0)}>
                  <Card 
                  bg="bg-cyan-800" 
                  bordercolor="border-cyan-300" 
                  className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                    <p className="text-white sm:text-lg text-md font-bruno">Skills</p>
                  </Card>
                </Link>
                <Link href={"/about/bio"} onMouseEnter={() => setCurrHover(4)} onMouseLeave={() => setCurrHover(0)}>
                  <Card 
                  bg="bg-cyan-800" 
                  bordercolor="border-cyan-300" 
                  className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                    <p className="text-white sm:text-lg text-md font-bruno">Bio</p>
                  </Card>
                </Link>
                <Link href={"/about/plans"} onMouseEnter={() => setCurrHover(5)} onMouseLeave={() => setCurrHover(0)}>
                  <Card 
                  bg="bg-cyan-800" 
                  bordercolor="border-cyan-300" 
                  className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                    <p className="text-white sm:text-lg text-md font-bruno">Future plans</p>
                  </Card>
                </Link>
              </div>
              <div className="w-full flex flex-col gap-5" ref={imageCard}>
                  <Card
                  bg="bg-gray-800"
                  bordercolor="border-gray-300">
                      <Image 
                      src={"/test.jpg"} 
                      alt="me" 
                      className="border-gray-300 border-2 rounded-lg mx-auto" 
                      width={width} 
                      height={height} />
                  </Card>   
                  <Card
                  bg="bg-gray-800"
                  bordercolor="border-gray-300"
                  className="h-full">
                    { currHover === 0 && 
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-24 h-24 mx-auto`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    { currHover === 1 && 
                        <p>
                            Here you can read about my education and what schools I have been
                            going to. And also a bit about how I experienced the whole education process.
                        </p> 
                    }
                    { currHover === 2 && 
                        <p>
                            Here you can read about my work experience and what jobs I have had.
                            And also a bit about how I have experienced worklife.
                        </p> 
                    }
                    { currHover === 3 && 
                        <p>
                            Here you can read about my skills, and see an estimate of my confidence
                            in my different skills visualized as a meter!
                        </p> 
                    }
                    { currHover === 4 && 
                        <p>
                            Here you can read more about me as a person. A bit about how life has been,
                            my interests, etc.
                        </p> 
                    }
                    { currHover === 5 && 
                        <p>
                            Here you can read about my future plans. Whether they are set in stone or not.
                            This of course is about things like travelling, learning and similar stuff.
                        </p> 
                    }
                  </Card>
              </div>         
          </div>

      </Layout>
    )
}

export default about