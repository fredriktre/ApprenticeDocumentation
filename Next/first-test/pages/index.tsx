import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { getIronSession } from "iron-session";
import useUserStore from "@/store/userstore";
import Link from "next/link";
import Card from "@/components/Card";
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { sessionOptions } from "@/lib/auth/session";
import { weatherCodes } from "@/lib/weather";


export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  return {
    props: {
      user: user || null,
    }
  }
}

interface Props {
  user: {
    id: string
    data: {
      email: string
      fullName: string
    }
    admin: boolean
  } | null,
}

export default function Home({ user }:Props) {
  const store = useUserStore();
  const [showTitle, setShowTitle] = useState('');
  const [status, setStatus] = useState("Studying");
  const [skills, setSkills] = useState<Array<{}>>([]);
  const [age, setAge] = useState(0)
  const [contactEmail, setContactEmail] = useState('');
  const [contactContent, setContactContent] = useState('');
  const [timeofday, setTimeofday] = useState(true);
  const [weather, setWeather] = useState<any>({
    place: "",
    data: [],
  });
  const [changeWeather, setChangeWeather] = useState({
    lat: 59.283041839978246,
    long: 11.107144565259663,
    place: "Sarpsborg"
})
  const titles = ['Welcome', 'Velkommen', 'ようこぞ'];
  let k = 0;  

  useEffect(() => {
    if (user != null && store.user.id.length <= 0) {
      store.setUser(user)
    }

    getWeather()

    if (k > 0) {
      controlText(0)
    }
    k++;

    const today = new Date();
    if (today.getHours() >= 6 && today.getHours() <= 22) {
      setTimeofday(true)
    } else {
      setTimeofday(false)
    }

    const dob = new Date("06/13/2004");
    const month_diff = Date.now() - dob.getTime();
    const age_dt = new Date(month_diff);
    setAge(Math.abs(age_dt.getUTCFullYear() - 1970))

    setSkills([
      {
        title: "Web-Dev Basics",
        content: [
          {
            name: 'HTML',
            skill: 4
          },
          {
            name: 'CSS',
            skill: 4
          },
          {
            name: 'Javascript',
            skill: 3
          },
        ]
      },
      {
        title: "Javascript Frameworks",
        content: [
          {
            name: 'React.js',
            skill: 3
          },
          {
            name: 'Next.js',
            skill: 2
          },
          {
            name: 'Vue.js',
            skill: 1
          },
        ]
      },
      {
        title: "Misc Coding",
        content: [
          {
            name: 'HTML Email',
            skill: 4
          },
        ]
      }
    ])
  }, [])

  async function getWeather() {
    try {
        const response = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${changeWeather.lat}&lon=${changeWeather.long}`) 
        const data = []
        for (let i = 0; i < 10; i++) {
          const weatherRaw = response.data.properties.timeseries[i].data.next_1_hours.summary.symbol_code.split("_");
          let weather;
          weatherCodes.forEach((weathercode:{index:number, content:string[]}) => {
            if (weathercode.content.includes(weatherRaw[0])) {
              weather = weathercode.index
            }
          })
          const d = new Date(response.data.properties.timeseries[i].time)
          data.push({
            airtemp: response.data.properties.timeseries[i].data.instant.details.air_temperature,
            humidity: response.data.properties.timeseries[i].data.instant.details.relative_humidity,
            weather: weather,
            hour: d.getHours()
          })
        }
        setWeather({
            place: changeWeather.place,   
            data,
        })
    } catch (error){
      console.log(error)
    }
  }

  function controlText(current:number) {
    addText(current).then(() => {
      removeText(current).then(() => {
        if (current === titles.length - 1) {
          controlText(0)
        } else {
          controlText(current + 1);
        }
      })
    })
  }

  function addText(current:number) {
    return new Promise(resolve => {
      for (let i = 0; i < titles[current].length + 1; i++) {
        setTimeout(() => {
          setTimeout(() => {
            setShowTitle(titles[current].substring(0, i))
          }, 100)
          if (i === titles[current].length) {
            setTimeout(() => {
              resolve("done");
            }, 1000)
          }
        }, 200 * i)
      }
    })
  }
  function removeText(current:number) {
    return new Promise(resolve => {
      for (let j = 0; j < titles[current].length + 1; j++) {
        setTimeout(() => {
          setTimeout(() => {
            setShowTitle(titles[current].substring(0, titles[current].length - j))
          }, 100)
          if (j === titles[current].length) {
            setTimeout(() => {
              resolve("done");
            }, 1000)
          }
        }, 50 * j)
      }
    })
  }

  async function sendContact(ev:any) {
    ev.preventDefault();
    const datenow = Date.now().toString();
    const data = {
      title: contactEmail,
      sent: datenow,
      content: contactContent
    }

    axios.post("/api/contact", data).then((response:any) => {
      console.log(`
        status ${response.status}
        comment: ${response.data.comment}
        type: ${response.data.type}`)
      setContactEmail('');
      setContactContent('');
    })
  }

  return (

    <Layout description="This is a portfolio website" Keywords="Portfolio, Web-Development, Design, UI, UX, Web">


        <section aria-label="landing" 
        className="relative flex flex-col justify-center gap-10 items-center w-full min-h-[95vh] h-full text-center p-10">

          <Card bg="cyan-800" bordercolor="cyan-300" className="h-28 sm:w-4/5 w-60 overflow-hidden">
            <h1 className="font-bruno">{showTitle}|</h1>
          </Card>

          <div className="sm:w-4/5 w-60 flex lg:flex-row flex-col justify-between gap-10">
            <div className="w-full flex flex-col gap-5">
              <Link href={"/about"}>
                <Card 
                bg="cyan-800" 
                bordercolor="cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">About</p>
                </Card>
              </Link>
              <Link href={"/portfolio"}>
                <Card 
                bg="cyan-800" 
                bordercolor="cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Portfolio</p>
                </Card>
              </Link>
              <Link href={"/posts"}>
                <Card 
                bg="cyan-800" 
                bordercolor="cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Posts</p>
                </Card>
              </Link>
              <Link href={"/contact"}>
                <Card 
                bg="cyan-800" 
                bordercolor="cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Contact</p>
                </Card>
              </Link>
              <Link href={"/merch"}>
                <Card 
                bg="cyan-800" 
                bordercolor="cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Merch</p>
                </Card>
              </Link>
            </div>
            <div className="w-full flex flex-col gap-5">
              <Card bg="gray-800" bordercolor="gray-300" className="font-bruno">
                <h2><span className="sm:inline hidden">Status:</span> {status}</h2>
              </Card>

              {
                store.user.id.length > 0
                ? <Link href={"/user"}>
                  <Card bg="gray-800" bordercolor="gray-300" 
                  className="hover:bg-gray-700 active:bg-gray-900 transition-colors duration-300">
                    <p className="font-bruno text-md sm:text-lg">{store.user.data.fullName}</p>
                  </Card>
                </Link>
                : <Link href={"/auth"}>
                  <Card bg="gray-800" bordercolor="gray-300"
                  className="hover:bg-gray-700 active:bg-gray-900 transition-colors duration-300">
                    <p className="font-bruno text-md sm:text-lg">Sign in</p>
                  </Card>
                </Link>
              }          
              
              <Link href={"/weather"} className="w-full">
                <Card bg="gray-800" bordercolor="gray-300" 
                className="w-full h-full flex flex-col justify-center items-center 
                gap-5 hover:bg-gray-700 active:bg-gray-900 transition-colors duration-300">
                {
                  weather.data.length > 0 &&
                    <p className="mr-auto flex justify-center items-center gap-5 font-bruno">
                      <span className="sm:inline hidden">Weather in {weather.place}:</span> 
                      <span className="flex items-center gap-2">{weatherCodes[weather.data[0].weather].name} <Image 
                        alt="sarpsborg" 
                        width={"32"} 
                        height={"32"}
                        src={`/weathericons/${weatherCodes[weather.data[0].weather].code != "clearsky" 
                        ? `${weatherCodes[weather.data[0].weather].code}` : `${timeofday ? 'day' : 'moon'}`}.svg`} /></span>
                    </p>
                }
                </Card>
              </Link>

              <Card
              bg="gray-800"
              bordercolor="gray-300">
              <p className="text-left">My name is Fredrik Sjøli Trevland, and this is my personal website!<br />
                  I mainly do email & web-development, but I am working on my design skills as well.<br />
                  My goal is to make functional, beautiful websites. And to get as good as I can at that task.</p>
              </Card>
            </div>
          </div>
          
        </section>
        {/* https://www.instagram.com/fredrikst_dev/ */}
        {/* <p className="text-left">My name is Fredrik Sjøli Trevland, and this is my personal website!<br />
                  I mainly do email & web-development, but I am working on my design skills as well.<br />
                  My goal is to make functional, beautiful websites. And to get as good as I can at that task.</p> */}
    </Layout>

  )
}