import Layout from "@/components/Layout"
import Card from '@/components/Card'
import { useRef, useState } from "react"
import Link from "next/link"

const bio = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = useRef(null)

  function calcAge() {
    const date = new Date("13 June 2004")
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }

  function handleAudio() {
    const currAudio:any = audio.current
    if (currAudio) {
      setIsPlaying(!isPlaying)
      if (isPlaying) {
        currAudio.pause()
      } else {
        currAudio.play()
      }
    }
  }
  return (
    <Layout UseNav={true}>

      <section className="w-4/5 mx-auto flex flex-col gap-10">

        <Card
        bg="cyan-800"
        bordercolor="cyan-300"
        className="flex-col gap-5">
          <h1 className="mr-auto">Details</h1>
          <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Given Name</h2>
              <p className="mr-auto">Fredrik Sjøli Trevland</p>
            </Card>
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Gender</h2>
              <p className="mr-auto">Male ♂</p>
            </Card>
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Birthdate</h2>
              <p className="mr-auto">13 - 06 - 2004</p>
            </Card>
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">From</h2>
              <p className="mr-auto">Sarpsborg - Norway</p>
            </Card>
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Currently living in</h2>
              <p className="mr-auto">Sarpsborg - Norway</p>
            </Card>     
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Age</h2>
              <p className="mr-auto">{calcAge()}</p>
            </Card>
          </div>
        </Card>

        <Card
        bg="cyan-800"
        bordercolor="cyan-300"
        className="flex-col gap-5">
          <h1 className="mr-auto">Misc</h1>
          <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Favorite game</h2>
              <p className="mr-auto">Rimworld</p>
            </Card>
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Favorite song</h2>
              <div className="mr-auto flex flex-col gap-2">
                  <Link target={"_blank"} href={"https://youtu.be/-poPQhpb4fU"}
                  ><p>Iris - Goo Goo Dolls | Jonathan Young</p></Link>
                <audio ref={audio} src="https://fredfolio.s3.eu-north-1.amazonaws.com/IRISJONATHANYOUNG.mp3"></audio>
                <div className="flex gap-5">
                  <button onClick={() => handleAudio()} type="button" className="px-4 py-2 w-fit bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  
                </div>
              </div>
            </Card>
            <Card bg="cyan-700" bordercolor="cyan-300" className="flex-col">
              <h2 className="mr-auto">Favorite food</h2>
              <p className="mr-auto">Spaghetti</p>
            </Card>
          </div>
        </Card>

      </section>

    </Layout>
  )
}

export default bio