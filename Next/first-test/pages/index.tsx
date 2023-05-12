import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
// import { withSessionSsr } from "@/lib/auth/withSession";
import { getIronSession } from "iron-session";
import useUserStore from "@/store/userstore";
import Link from "next/link";
import Card from "@/components/Card";
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { sessionOptions } from "@/lib/auth/session";

// export const getServerSideProps = withSessionSsr(
//   async function getServerSideProps({req}) {
//     const user = req.session.user;

//     if (!user) {
//       return {
//         props: {
//           user: {}
//         }
//       }
//     }

//     return {
//       props: { 
//         user
//       }
//     }
//   }
// )

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
    dataSarp: [],
    dataOslo: [],
  });
  const titles = ['Welcome', 'Velkommen', 'ようこぞ'];
  let k = 0;
  const weatherCodes = [
    {
      code: "clearsky",
      content: ["clearsky"]
    },
    {
      code: "cloudy",
      content: ["cloudy", "partlycloudy","fair"]
    },
    {
      code: "rain",
      content: ["rain", "rainshowers", "sleet", "lightrain", "lightsleet", "lightrainshowers", "lightsleetshowers"]
    },
    {
      code: "snow",
      content: ["snow", "heavysnow", "heavysnowandthunder", 
      "heavysnowshowers", "heavysnowshowersandthunder", "snowandthunder", 
      "snowshowers", "snowshowersandthunder", "lightsnow", "lightsnowandthunder",
      "lightsnowshowers", "lightsnowshowersandthunder", "heavysnow"]
    },
    {
      code: "heavyrain",
      content: ["heavyrain", "heavysleet", "heavysleetshowers", "heavyrainshowers"]
    },
    {
      code: "rainthunder",
      content: ["rainandthunder", "rainshowersandthunder", "lightsleetandthunder", 
      "lightssleetshowersandthunder", "lightrainshowersandthunder", "lightrainandthunder",
      "heavyrainandthunder", "heavyrainshowersandthunder", "heavysleetandthunder", 
      "heavysleetshowersandthunder"]
    },
    {
      code: "fogcloud",
      content: ["fog"]
    },
  ]
  

  useEffect(() => {
    if (user != null) {
      console.log(user.admin)
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
        const responseSarp = await axios.get("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.283041839978246&lon=11.107144565259663&altitude=4150") 
        const dataSarp = []
        for (let i = 0; i < 10; i++) {
          const sarpWeatherRaw = responseSarp.data.properties.timeseries[i].data.next_1_hours.summary.symbol_code.split("_");
          let sarpWeather;
          let osloWeather;
          weatherCodes.forEach((weathercode:{code:string, content:string[]}) => {
            if (weathercode.content.includes(sarpWeatherRaw[0])) {
              sarpWeather = weathercode.code
            }
          })
          const d = new Date(responseSarp.data.properties.timeseries[i].time)
          dataSarp.push({
            airtemp: responseSarp.data.properties.timeseries[i].data.instant.details.air_temperature,
            humidity: responseSarp.data.properties.timeseries[i].data.instant.details.relative_humidity,
            weather: sarpWeather,
            hour: d.getHours()
          })
        }
        setWeather({
          dataSarp,
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

          <Card bg="bg-cyan-800" bordercolor="border-cyan-300" className="h-28 sm:w-4/5 w-60">
            <h1 className="font-bruno">{showTitle}|</h1>
          </Card>

          <div className="sm:w-4/5 w-60 flex lg:flex-row flex-col  justify-between gap-10">
            <div className="w-full flex flex-col gap-5">
              <Link href={"/about"}>
                <Card 
                bg="bg-cyan-800" 
                bordercolor="border-cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">About</p>
                </Card>
              </Link>
              <Link href={"/portfolio"}>
                <Card 
                bg="bg-cyan-800" 
                bordercolor="border-cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Portfolio</p>
                </Card>
              </Link>
              <Link href={"/posts"}>
                <Card 
                bg="bg-cyan-800" 
                bordercolor="border-cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Posts</p>
                </Card>
              </Link>
              <Link href={"/contact"}>
                <Card 
                bg="bg-cyan-800" 
                bordercolor="border-cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Contact</p>
                </Card>
              </Link>
              <Link href={"/merch"}>
                <Card 
                bg="bg-cyan-800" 
                bordercolor="border-cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                  <p className="text-white sm:text-lg text-md font-bruno">Merch</p>
                </Card>
              </Link>
            </div>
            <div className="w-full flex flex-col gap-5">
              {
                store.user.id.length > 0
                ? <Link href={"/user"}>
                  <Card bg="bg-gray-800" bordercolor="border-gray-300">
                    <p className="font-bruno text-md sm:text-lg">{store.user.data.fullName}</p>
                  </Card>
                </Link>
                : <Link href={"/signIn"}>
                  <Card bg="bg-gray-800" bordercolor="border-gray-300">
                    <p className="font-bruno text-md sm:text-lg">Sign in</p>
                  </Card>
                </Link>
              }              
              <Card bg="bg-gray-800" bordercolor="border-gray-300" className="font-bruno">
                <h2><span className="sm:inline hidden">Status:</span> {status}</h2>
              </Card>
              <Card bg="bg-gray-800" bordercolor="border-gray-300" className="h-full flex flex-col justify-center items-center gap-10">
                {
                  weather.dataSarp.length > 0 &&
                  <Link href={"/sarpsborg"} className="w-full">
                    <Card bg="bg-gray-700" bordercolor="border-gray-300" className="hover:bg-gray-600
                     active:bg-gray-900 transition-colors duration-300 flex justify-center">
                      <p className="flex justify-center items-center gap-5 text-md sm:text-lg font-bruno">
                        <span className="sm:inline hidden">Sarpsborg</span> <Image 
                          alt="sarpsborg" 
                          width={"64"} 
                          height={"64"}
                          src={`/weathericons/${weather.dataSarp[0].weather != "clearsky" 
                          ? `${weather.dataSarp[0].weather}` : `${timeofday ? 'day' : 'moon'}`}.svg`} />
                      </p>
                    </Card>
                  </Link>
                }
              </Card>
            </div>
          </div>
          
        </section>

        <footer className="relatve flex flex-col gap-10 justify-center items-center w-full py-10  text-white">
          

        </footer>
        {/* https://www.instagram.com/fredrikst_dev/ */}
    </Layout>

  )
}
