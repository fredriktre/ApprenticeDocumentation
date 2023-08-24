import { useEffect, useState } from 'react'
// import "./s1.css"
import "./s2.css"
import { motion, useAnimation } from 'framer-motion'

function App() {
  const [currentHoveredButton, setCurrentHoveredButton] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPagePart, setCurrentPagePart] = useState(0);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const devlangController = useAnimation()
  const frameworksController = useAnimation()
  const librariesController = useAnimation()
  const languagesController = useAnimation()
  const interestsController = useAnimation()

  useEffect(() => {

    if (currentPage === 3) {
      if (currentPagePart === 1) {
        devlangController.start("visible");
        frameworksController.start("hidden");
        librariesController.start("hidden");
        languagesController.start("hidden");
      } else if (currentPagePart === 2) {
        devlangController.start("hidden");
        frameworksController.start("visible");
        librariesController.start("hidden");
        languagesController.start("hidden");
      } else if (currentPagePart === 3) {
        devlangController.start("hidden");
        frameworksController.start("hidden");
        librariesController.start("visible");
        languagesController.start("hidden");
      } else if (currentPagePart === 4) {
        devlangController.start("hidden");
        frameworksController.start("hidden");
        librariesController.start("hidden");
        languagesController.start("visible");
      } else {
        devlangController.start("hidden");
        frameworksController.start("hidden");
        librariesController.start("hidden");
        languagesController.start("hidden"); 
      }

    }
    
    if (currentPage === 6) {
      if (currentPagePart === 10) {
        interestsController.start("visible");
      } else {
        interestsController.start("hidden");
      }
    }
  }, [currentPage])

  const pages = [
    {
      name: "home",
      image: "/assets/home.png"
    },
    {
      name: "education",
      image: "/assets/education.png"
    },
    {
      name: "experience",
      image: "/assets/experience.png"
    },
    {
      name: "Skillset",
      image: "/assets/devlang.png"
    },
    {
      name: "Portfolio",
      image: "/assets/portfolio.png"
    },
    {
      name: "AIImages",
      image: "/assets/aistuff.png"
    },
    {
      name: "Freetime",
      image: "/assets/freetime.png"
    },
  ]

  const devlang = [
    {
      name: "HTML",
      confidence: 8
    },
    {
      name: "CSS",
      confidence: 8
    },
    {
      name: "Javacript",
      confidence: 7
    },
  ]
  const frameworks = [
    {
      name: "React",
      confidence: 6
    },
    {
      name: "Vue",
      confidence: 2
    },
    {
      name: "Svelte",
      confidence: 0
    },
  ]

  const interests = [
    {
      name: "Gaming",
      like: 10
    },
    {
      name: "AI image generation",
      like: 6
    },
    {
      name: "Music | Listening",
      like: 8
    },
    {
      name: "Anime / Manga",
      like: 8
    },
    {
      name: "Exercise",
      like: 8
    },
    {
      name: "Front - End Development",
      like: 6
    },
    {
      name: "Back - End Development",
      like: 5
    },
    {
      name: "Email - Development",
      like: 4
    },
    {
      name: "Game - Development",
      like: 7
    },
  ]

  const hackify = (id:string) => {
    const button = document.getElementById(id)
    let iterations = 0;
    const interval = setInterval(() => {
      button?.childNodes.forEach((childNode:any, index:number) => {
        if (index < iterations) {
          childNode.innerText = id.split("-")[0][index];
          childNode.style = "color: #ffffff";
        } else {
          childNode.innerText = alphabet[Math.floor(Math.random() * alphabet.length)]
          childNode.style = "color: #00ff00";
        }
      })
      iterations += 1 / 6;
      if (iterations > 10) clearInterval(interval);
    }, 10)
  }

  return (
    <div className='home-page'>
      <nav>
          {
            pages.map((page:any, index:number) => (
              <>
                <button id={`${page.name}-${index}`} key={index} onClick={() => {
                  setCurrentPage(index)
                  setCurrentPagePart(0)
                }}
                onMouseEnter={() => {
                  hackify(`${page.name}-${index}`);
                  setCurrentHoveredButton(index + 1)
                }}
                onMouseLeave={() => setCurrentHoveredButton(0)}
                >
                  {
                    page.name.split("").map((letter:string, index:number) => (
                      <span key={`${letter}-${index}`}>{letter}</span>
                    ))
                  }
                </button>
                <img src={page.image} className={`${currentHoveredButton === index + 1 ? "active" : "inactive"}`} />
              </>
            ))
          }
      </nav>
      
      <div className='content-container'>
        <div className={`content-wrapper card-wrapper ${currentPage === 1 ? "active" : ""}`}>
          <div>
            <div>
              <h1>Lande Barneskole</h1>
              <p>August 2010 -{">"} June 2017</p>
              <p>General Education</p>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
          <div>
            <div>
              <h1>Kruseløkka Ungdomskole</h1>
              <p>August 2017 -{">"} June 2020</p>
              <p>General Education</p>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
          <div>
            <div>
              <h1>Halden Videregående Skole</h1>
              <p>August 2020 -{">"} June 2021</p>
              <p>Information Technology and Media production</p>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>  
            </button>
          </div>
          <div>
            <div>
              <h1>Glemmen Videregående Skole</h1>
              <p>August 2021 -{">"} June 2022</p>
              <p>Information Technology</p>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`content-wrapper card-wrapper  ${currentPage === 2 ? "active" : ""}`}>
          <div>
            <div>
              <h1>KGH</h1>
              <p>June 2022 -{">"} August 2022</p>
              <p>BLANK</p>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
          <div>
            <div>
              <h1>Bas Kommunikasjon</h1>
              <p>June 2022 -{">"} August 2023</p>
              <p>Email Template Developer</p>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`content-wrapper  ${currentPage === 3 ? "active" : ""}`}>
          <div className='pagepartbtn-wrapper'>
            <button
              onClick={() => setCurrentPagePart(1)}>
              Dev - Languages
            </button>
            <button
              onClick={() => setCurrentPagePart(2)}>
              Frameworks
            </button>
            <button
              onClick={() => setCurrentPagePart(3)}>
              Libraries
            </button>
            <button
              onClick={() => setCurrentPagePart(4)}>
              Languages
            </button>
          </div>
          <div className='card-container'>

          </div>
          <div className={`static-cards card-wrapper ${currentPagePart === 1 ? "cactive" : ""}`}>
            {
              devlang.map((skill:any, index:number) => {

                return (
                  <div key={`${skill.name}-${index}`}>
                    <h1>{skill.name}</h1>
                    <div className='skill-meter'>
                      <p
                      className='skill-meter-txt'
                      >{skill.confidence}/10</p>
                      <motion.span 
                      variants={{
                        hidden: { width: 0 },
                        visible: { width: 12 + skill.confidence * 10 }
                      }}
                      initial="hidden"
                      animate={devlangController}
                      transition={{ ease: "easeInOut", duration: 1, delay: 0.1 }}
                      className='skill-meter-fg'
                      ></motion.span>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className={`card-wrapper ${currentPagePart === 2 ? "cactive" : ""}`}>
            {
              devlang.map((skill:any, index:number) => {

                return (
                  <div key={`${skill.name}-${index}`}>
                    <h1>{skill.name}</h1>
                    <div className='skill-meter'>
                      <p
                      className='skill-meter-txt'
                      >{skill.confidence}/10</p>
                      <motion.span 
                      variants={{
                        hidden: { width: 0 },
                        visible: { width: 12 + skill.confidence * 10 }
                      }}
                      initial="hidden"
                      animate={devlangController}
                      transition={{ ease: "easeInOut", duration: 1, delay: 0.1 }}
                      className='skill-meter-fg'
                      ></motion.span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={`content-wrapper  ${currentPage === 6 ? "active" : ""}`}>
          <div className='pagepartbtn-wrapper'>
            <button
              onClick={() => setCurrentPagePart(10)}>
              Interests
            </button>
          </div>
          <div className={`card-wrapper ${currentPagePart === 10 ? "cactive" : ""}`}>
            {
              interests.map((interest:any, index:number) => {

                return (
                  <div key={`${interest.name}-${index}`}>
                    <h1>{interest.name}</h1>
                    <div className='skill-meter'>
                      <p
                      className='skill-meter-txt'
                      >{interest.like}/10</p>
                      <motion.span 
                      variants={{
                        hidden: { width: 0 },
                        visible: { width: 12 + interest.like * 10 }
                      }}
                      initial="hidden"
                      animate={interestsController}
                      transition={{ duration: 1, delay: 0.1 }}
                      className='skill-meter-fg'
                      ></motion.span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <span></span>
    </div>
  )
}

export default App