import Card from "@/components/Card";
import CardWrapper from "@/components/CardWrapper";
import Layout from "@/components/Layout";
import Skillcard from "@/components/Skillcard";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { IoIosAirplane, IoMdSchool } from "react-icons/io";
import { IoCodeSlash } from "react-icons/io5";

export default function Home() {

  const [showTitle, setShowTitle] = useState('');
  const [status, setStatus] = useState(0);
  const [skills, setSkills] = useState<Array<{}>>([]);
  const [age, setAge] = useState(0)
  const [contactEmail, setContactEmail] = useState('');
  const [contactContent, setContactContent] = useState('');
  const titles = ['Web-Developer', 'UI-Designer'];
  let k = 0;

  useEffect(() => {
    if (k > 0) {
      controlText(0)
    }
    k++;

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


        <section aria-label="landing" className="relative flex justify-center items-center w-full min-h-[95vh] h-full text-white text-center">

          <div className="w-4/5 lg:h-4/5 aspect-square absolute z-0">
            {status === 0 && (
              <IoCodeSlash className="w-full h-full text-gray-900" />
            )}
            {status === 1 && (
              <IoIosAirplane className="w-full h-full text-gray-900" />
            )}
            {status === 2 && (
              <IoMdSchool className="w-full h-full text-gray-900" />
            )}
            {status > 2 && (
              <IoCodeSlash className="w-full h-full text-gray-900" />
            )}
            

          </div>

          <div className="relative z-1">
            <h1 className="font-bruno">{showTitle}|</h1>
            <h3 className="font-normal mt-2 underline decoration-2 underline-offset-8">Fredrik Sjøli Trevland</h3>
            <h3 className="font-normal">Converting ideas to software</h3>
          </div>
          
        </section>

        <section aria-label="about" className="relatve flex flex-col gap-10 justify-center items-center w-full min-h-screen h-full text-white">

          <h1>About me</h1>

          <div className="grid gap-4 md:grid-cols-6 grid-cols-1">
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
              
            <CardWrapper title="Skills" className="col-span-2 overflow-hidden relative">
              <div className="absolute -top-14 hover:top-0 left-0 w-full bg-black p-4 rounded-lg opacity-0 hover:opacity-100 transition-all">
                <p>This is based on my confidence level in my different skills.</p>
              </div>
              <div className="flex flex-col gap-4" style={{
                minHeight: '30rem'
              }}>
                {
                  skills.map(({title, content}:any) => (
                    <Card key={title} title={title} className={`transition-all duration-500 max-h-[3.2rem] hover:max-h-full overflow-y-hidden hover:h-auto`}>
                      {content.map(({name, skill}:any) => (
                        <Skillcard key={name} name={name} skill={skill} />
                        ))}
                    </Card>

                  ))
                }
              </div>
            </CardWrapper>

            <CardWrapper title="Licenses and certifications" className="col-span-2">
              <Card title="Agillic - Basic Configurator">
                <p className="text-sm">Recieved: 22.08.2022</p>
              </Card>
            </CardWrapper>

            <CardWrapper title="Miscellenious" className="col-span-3">
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
              <Card title="Primary School">
                <p className="text-sm">Elementary school: Lande Barneskole</p>
                <p className="text-sm">Middle school: Kruseløkka Ungdomskole</p>
                <p className="text-sm">From: August 2010 | To: June 2020</p>
              </Card>
              <Card title="Halden Videregående Skole - Porsnes Avd.">
                <p className="text-sm">Type: High school</p>
                <p className="text-sm">From: August 2020 | To: June 2021</p>
              </Card>
              <Card title="Glemmen Videregående skole">
                <p className="text-sm">Type: High school</p>
                <p className="text-sm">From: August 2021 | To: June 2022</p>
              </Card>
              <Card title="Opplæringssenteret for visuell kommunikasjon">
                <p className="text-sm">Type: Apprentice</p>
                <p className="text-sm">From: August 2022 | To: August 2024</p>
              </Card>
            </CardWrapper>              
          </div>
        </section>

        <section id="contact" className="relatve flex flex-col gap-10 justify-center items-center w-full h-full min-h-[60vh] py-10 text-white">
          <h1 className="text-center">Contact me!</h1>
          <div className="md:w-2/3 w-full mx-auto grid md:grid-cols-2 grid-cols-1 gap-4">
            <CardWrapper title="Information">
              <Card title="Email">
                <p className="text-sm">trevlandf0604@gmail.com</p>
              </Card>
              <Card title="Discord">
                <p className="text-sm">ArcticWolf#8141</p>
              </Card>
              <Card title="Public Discord Server">
                <a href="https://discord.gg/m7hH3Ybdjd" target="_blank" className="text-sm underline underline-offset-4 decoration-white">Join here!</a>
              </Card>
            </CardWrapper>
            <CardWrapper>
              <form onSubmit={sendContact} className="flex flex-col gap-4 h-full">
                <input className="p-4 bg-gray-950 rounded-md placeholder:text-white outline-none border-2 border-transparent focus:border-blue-500" type="email" placeholder="Your Email" onChange={ev => setContactEmail(ev.target.value)} value={contactEmail}  />
                <textarea className="p-4 bg-gray-950 rounded-md placeholder:text-white outline-none border-2 border-transparent focus:border-blue-500 resize-none h-full" placeholder="Email Content" onChange={ev => setContactContent(ev.target.value)} value={contactContent}/>
                <button type="submit" className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75">Send</button>
              </form>
            </CardWrapper>                  
          </div>
        </section>

        <footer className="relatve flex flex-col gap-10 justify-center items-center w-full py-10 bg-black text-white">
          
          <div className="text-center">
            <h2>Need help with your project?</h2>
            <p>Come talk to me, and we can work together to make your project a success!</p>
            <div className="pt-5">
              <button onClick={() => {
                const pos = document.getElementById("contact")?.offsetTop
                window.scrollTo({
                  top: pos,
                  left: 0,
                  behavior: "smooth"
                })
              }} className="p-4 bg-blue-500 rounded-md hover:bg-blue-400 active:bg-blue-600 transition-all duration-75 text-white">Contact</button>
            </div>
          </div>

        </footer>
        {/* https://www.instagram.com/fredrikst_dev/ */}
    </Layout>

  )
}
