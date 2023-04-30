import Card from "@/components/Card";
import CardWrapper from "@/components/CardWrapper";
import Layout from "@/components/Layout";
import Skillcard from "@/components/Skillcard";
import { useEffect, useState } from "react";

export default function Home() {

  const [showTitle, setShowTitle] = useState('');
  const [currentWorld, setCurrentWorld] = useState(0);
  const [skills, setSkills] = useState<Array<{name: string, skill: number}>>([]);
  const [age, setAge] = useState(0)
  const [contactEmail, setContactEmail] = useState('');
  const [contactContent, setContactContent] = useState('');
  const titles = ['Web-Developer', 'UI-Designer'];
  let k = 0;

  useEffect(() => {
    if (k > 0) {
      controlText(0)
      console.log("started")
    }
    k++;

    const dob = new Date("06/13/2004");
    const month_diff = Date.now() - dob.getTime();
    const age_dt = new Date(month_diff);
    setAge(Math.abs(age_dt.getUTCFullYear() - 1970))

    setSkills([
      {
        name: 'HTML',
        skill: 4
      },
      {
        name: 'HTML Email',
        skill: 5
      },
      {
        name: 'CSS',
        skill: 4
      },
      {
        name: 'Javascript',
        skill: 3
      },
      {
        name: 'React.js',
        skill: 2
      },
      {
        name: 'Next.js',
        skill: 2
      },
      {
        name: 'Vue.js',
        skill: 1
      },
    ])
  }, [])

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

  function sendContact(ev:any) {
    ev.preventDefault();

    console.log(ev.target[0].value)
    console.log(ev.target[1].value)

    setContactEmail('');
    setContactContent('');
  }

  return (

    <Layout description="This is a portfolio website" Keywords="Portfolio, Web-Development, Design, UI, UX, Web">


        <section aria-label="landing" className="relative flex justify-center items-center w-full min-h-[95vh] h-full text-white text-center">

          <div className="h-4/5 aspect-square absolute z-0">
            <span className="absolute right-0 top-0 h-full w-3/4"></span>
            <svg className="w-full h-full text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              {currentWorld === 0 && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
              )}
              {currentWorld === 1 && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />

              )}
              {currentWorld === 2 && (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
              )}
            </svg>

          </div>

          <div className="relative z-1">
            <h1 className="font-bruno">{showTitle}|</h1>
            <h3 className="font-normal mt-2 underline decoration-2 underline-offset-8">Fredrik Sjøli Trevland</h3>
            <h3 className="font-normal">Converting ideas to software</h3>
          </div>
          
        </section>



        <section className="relatve flex flex-col gap-10 justify-center items-center w-full min-h-screen h-full text-white">

          <h1>About me</h1>

          <div className="grid gap-4 grid-cols-6">
            <CardWrapper title="Work Experience" className="col-span-2">
              <Card title="KGH">
                <p className="text-sm">Title: Office Worker</p>
                <p className="text-sm">From: 20.06.2022 | To: 12.08.2022</p>
                <p className="text-sm">Time: 3 months</p>
              </Card>
              <Card title="Bas Kommunikasjon">
                <p className="text-sm">Title: Front-end Developer</p>
                <p className="text-sm">From: 15.08.2022 | To: 15.08.2024</p>
                <p className="text-sm">Time: ongoing...</p>
              </Card>
            </CardWrapper>
              
            <CardWrapper title="Skills" className="col-span-2">
              {skills.map(({name, skill}) => (
                <Skillcard key={name} name={name} skill={skill} />
              ))}
            </CardWrapper>

            <CardWrapper title="Licenses and certifications" className="col-span-2">
              <Card title="Agillic - Basic Configurator">
                <p className="text-sm">Recieved: 22.08.2022</p>
              </Card>
            </CardWrapper>

            <CardWrapper title="Bio" className="col-span-3">
              <Card title="Details">
                <p className="text-sm">Place of residence: Sarpsborg - Viken - Norway</p>
                <p className="text-sm">Born in: Fredrikstad - Viken - Norway</p>
                <p className="text-sm">Birthdate: 13.06.2004</p>
                <p className="text-sm">Age: {age}</p>
              </Card>
              <Card title="Likes">
                <p className="text-sm">When code works :D</p>
                <p className="text-sm">Anime & Manga</p>
                <p className="text-sm">Games in the genres: Management, Strategy, Realistic FPS</p>
                <p className="text-sm">Music</p>
              </Card>
              <Card title="Disikes">
                <p className="text-sm">When code doesn't works D:</p>
                <p className="text-sm">Outlook</p>
                <p className="text-sm">Shallots and Licorice</p>
              </Card>
            </CardWrapper>

            <CardWrapper title="Education" className="col-span-3">
              <Card title="Lande Barneskole">
                <p className="text-sm">Type: Elementary school</p>
                <p className="text-sm">From: August 2010 | To: June 2017</p>
              </Card>
              <Card title="Kruseløkka Ungdomskole">
                <p className="text-sm">Type: Middle school</p>
                <p className="text-sm">From: August 2017 | To: June 2020</p>
              </Card>
              <Card title="Halden Videregående Skole - Porsnes Avd.">
                <p className="text-sm">Type: High school</p>
                <p className="text-sm">From: August 2020 | To: June 2021</p>
              </Card>
              <Card title="Glemmen Videregående skole">
                <p className="text-sm">Type: High school</p>
                <p className="text-sm">From: August 2021 | To: June 2022</p>
              </Card>
            </CardWrapper>              
          </div>
        </section>

        <section className="relatve flex flex-col gap-10 justify-center items-center w-full h-full min-h-screen text-white">
          <h1 className="text-center">Contact me!</h1>
          <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
            <CardWrapper title="Information">
              <Card title="Email">
                <p className="text-sm">trevlandf0604@gmail.com</p>
              </Card>
              <Card title="Discord">
                <p className="text-sm">ArcticWolf#8141</p>
              </Card>
            </CardWrapper>
            <CardWrapper>
              <form onSubmit={sendContact} className="flex flex-col gap-4">
                <input className="p-4 bg-gray-950 rounded-md placeholder:text-white outline-none border-2 border-transparent focus:border-blue-500" type="text" placeholder="Your Email" onChange={ev => setContactEmail(ev.target.value)} value={contactEmail}  />
                <textarea className="p-4 bg-gray-950 rounded-md placeholder:text-white outline-none border-2 border-transparent focus:border-blue-500 resize-none" placeholder="Email Content" onChange={ev => setContactContent(ev.target.value)} value={contactContent}/>
                <button type="submit" className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75">Send</button>
              </form>
            </CardWrapper>                  
          </div>
        </section>

    </Layout>

  )
}
