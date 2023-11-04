import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

function App() {
  const [currentHoveredButton, setCurrentHoveredButton] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPagePart, setCurrentPagePart] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [portfolioModalContent, setPortfolioModalContent] = useState({
    name: "",
    desc: "",
    tags: [],
    link: "",
    images: []
  },);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const devlangController = useAnimation();
  const frameworksController = useAnimation();
  const librariesController = useAnimation();
  const languagesController = useAnimation();
  const recreationalController = useAnimation();
  const workrelatedController = useAnimation();

  // const firebaseConfig = {
  //   apiKey: "AIzaSyDRSOzyxhr1RhxXhMj73Kh4BhYW2fC661g",
  //   authDomain: "fstportfolio.firebaseapp.com",
  //   projectId: "fstportfolio",
  //   storageBucket: "fstportfolio.appspot.com",
  //   messagingSenderId: "121558793079",
  //   appId: "1:121558793079:web:74a21e41a90fadb6197f72"
  // };

  // const app = initializeApp(firebaseConfig);

  useEffect(() => {
    devlangController.start("hidden");
    frameworksController.start("hidden");
    librariesController.start("hidden");
    languagesController.start("hidden");
    recreationalController.start("hidden");
    workrelatedController.start("hidden");

    if (currentPage === 3) {
      if (currentPagePart === 1) {
        devlangController.start("visible");
      } else if (currentPagePart === 2) {
        frameworksController.start("visible");
      } else if (currentPagePart === 3) {
        librariesController.start("visible");
      } else if (currentPagePart === 4) {
        languagesController.start("visible");
      }
    } else if (currentPage === 5) {
      if (currentPagePart === 10) {
        recreationalController.start("visible");
      } else if (currentPagePart === 11) {
        workrelatedController.start("visible");
      }
    }

  }, [currentPage, currentPagePart])

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
      image: "/assets/skillset.png"
    },
    {
      name: "Portfolio",
      image: "/assets/portfolio.png"
    },
    {
      name: "Freetime",
      image: "/assets/freetime.png"
    },
  ]

  const devlang = [
    {
      name: "HTML",
      confidence: 7
    },
    {
      name: "CSS",
      confidence: 7
    },
    {
      name: "Javacript",
      confidence: 6
    },
    {
      name: "Python",
      confidence: 3
    },
    {
      name: "Rust",
      confidence: 2
    },
    {
      name: "C#",
      confidence: 2
    },
  ]
  const frameworks = [
    {
      name: "React.js",
      confidence: 6
    },
    {
      name: "Vue.js",
      confidence: 2
    },
    {
      name: "Next.js",
      confidence: 6
    },
  ]
  const libraries = [
    {
      name: "Unity",
      confidence: 1
    },
    {
      name: "Unreal",
      confidence: 2
    },
    {
      name: "Tailwind",
      confidence: 8
    },
    {
      name: "React router",
      confidence: 4
    },
  ]
  const languages = [
    {
      name: "Norwegian",
      confidence: 8
    },
    {
      name: "English",
      confidence: 8
    },
    {
      name: "Japanese",
      confidence: 1
    },
  ]
  const recreational = [
    {
      name: "Gaming",
      like: 8
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
      like: 5
    },
    {
      name: "Piano",
      like: 4
    },
  ]
  const workrelated = [
    {
      name: "Front - End Development",
      like: 6
    },
    {
      name: "Back - End Development",
      like: 4
    },
    {
      name: "Email - Development",
      like: 3
    },
    {
      name: "Game - Development",
      like: 6
    },
    {
      name: "3D - Modelling",
      like: 5
    },
  ]

  const Portfolio = [
    {
      name: "TrefTravelVlog",
      desc: "This project was something I worked on to learn Next.js, and to have somewhere to blog my trip to Japan. There were a lot of small issues popping up, and some responsiveness problems. I did learn a lot though, and will probably take some inspiration from this project in the future.",
      tags: ["Vlog", "Blog", "Next.js", "React.js", "MongoDB", "Front-end"],
      link: "https://treftravelvlog.vercel.app",
      images: ["/assets/treftravelvlog.webp", "/assets/treftravelvlog2.webp"]
    },
    {
      name: "Passgen",
      desc: "This very small project where I was trying to understand how to use loops and variables to quickly create a set of strings depending on certain conditions.",
      tags: ["Utility", "Generator", "Front-end"],
      link: "https://passgen-a833e.web.app",
      images: ["/assets/passgen.webp", "/assets/passgen2.webp"]
    },
    {
      name: "Boredhub",
      desc: "This was a 4 hour project where I made a cardgame with a couple animations and interchangable images.",
      tags: ["Game", "React.js", "Front-end", "Algorithms"],
      link: "https://boredhub.web.app",
      images: ["/assets/boredhub.webp", "/assets/boredhub2.webp"]
    },
    {
      name: "Querymessenger",
      desc: "This is one of my first proper projects using React.js and firebase",
      tags: ["Chat", "React.js", "Front-end", "Firebase"],
      link: "https://querymessenger.web.app",
      images: ["/assets/querymessenger.webp"]
    },
    {
      name: "Blender | Donut",
      desc: "This is my first 3D model made with blender, following Blender Guru's tutorial. The Open button directs you to the tutorial. I also imported it into an Unreal Engine project, but the sprinkles didn't make it.",
      tags: ["Art", "3D-modelling", "Blender"],
      link: "https://www.youtube.com/playlist?list=PLjEaoINr3zgFX8ZsChQVQsuDSjEqdWMAD",
      images: ["/assets/donut.webp", "/assets/donutwires.webp"]
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

  const handlePageShift = (value:boolean, length:number) => {
    if (value) {

      if (currentImage < length) {
        setCurrentImage(currentImage + 1)
      }
      
    } else {
      
      if (currentImage > 0) {
        setCurrentImage(currentImage - 1)
      }

    }
  }

  return (
    <div className='home-page'>
      <nav className='scrollbar'>
          {
            pages.map((page:any, index:number) => (
              <>
                <button id={`${page.name}-${index}`} key={index} onClick={() => {
                  setCurrentPage(index)
                  if (index === 3) {
                    setCurrentPagePart(1)
                  } else if (index === 5) {
                    setCurrentPagePart(10)
                  } else {
                    setCurrentPagePart(0)
                  }
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
        <div className={`content-wrapper card-wrapper ${currentPage === 0 ? "active" : ""}`}>
          <section className='home-content'>
            <h1>Hi, my name is Fredrik Sjøli Trevland.</h1>
            <h2>And I'm a software developer from Norway.</h2>
            <p>And my goal is to create new and amazing things!</p>
            {/* <button onPointerDown={() => setVideoModalOpen(true)}>
              More about me
            </button> */}
          </section>
        </div>
        <div className={`content-wrapper card-wrapper ${currentPage === 1 ? "active" : ""}`}>
          <div>
            <div>
              <h1>Lande Barneskole</h1>
              <p>August 2010 -{">"} June 2017</p>
              <p>General Education</p>
            </div>
            {/* <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button> */}
          </div>
          <div>
            <div>
              <h1>Kruseløkka Ungdomskole</h1>
              <p>August 2017 -{">"} June 2020</p>
              <p>General Education</p>
            </div>
            {/* <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button> */}
          </div>
          <div>
            <div>
              <h1>Halden Videregående Skole</h1>
              <p>August 2020 -{">"} June 2021</p>
              <p>Information Technology and Media production</p>
            </div>
            {/* <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>  
            </button> */}
          </div>
          <div>
            <div>
              <h1>Glemmen Videregående Skole</h1>
              <p>August 2021 -{">"} June 2022</p>
              <p>Information Technology</p>
            </div>
            {/* <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button> */}
          </div>
        </div>
        <div className={`content-wrapper card-wrapper  ${currentPage === 2 ? "active" : ""}`}>
          <div>
            <div>
              <h1>KGH</h1>
              <p>June 2022 -{">"} August 2022</p>
              <p>Customs Process Administrator</p>
            </div>
            {/* <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button> */}
          </div>
          <div>
            <div>
              <h1>Bas Kommunikasjon</h1>
              <p>June 2022 -{">"} August 2023</p>
              <p>Email Template Developer</p>
            </div>
            {/* <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button> */}
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
            <button 
              onClick={() => setCurrentPagePart(5)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
          <div className='card-container'>
            <div className={`card-wrapper ${currentPagePart === 1 ? "cactive" : ""} scrollbar`}>
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
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                        className='skill-meter-fg'
                        ></motion.span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={`card-wrapper ${currentPagePart === 2 ? "cactive" : ""} scrollbar`}>
              {
                frameworks.map((skill:any, index:number) => {

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
                        animate={frameworksController}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                        className='skill-meter-fg'
                        ></motion.span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={`card-wrapper ${currentPagePart === 3 ? "cactive" : ""} scrollbar`}>
              {
                libraries.map((skill:any, index:number) => {

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
                        animate={librariesController}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                        className='skill-meter-fg'
                        ></motion.span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={`card-wrapper ${currentPagePart === 4 ? "cactive" : ""} scrollbar`}>
              {
                languages.map((skill:any, index:number) => {

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
                        animate={languagesController}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                        className='skill-meter-fg'
                        ></motion.span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={`card-wrapper ${currentPagePart === 5 ? "cactive" : ""}`}>
              <div>
                <div>
                  <h2>Skillset</h2>
                  <p>This section is meant to give you an idea of my confidence in my different skills.</p>
                </div>
              </div>
              <div>
                <div>
                  <h2>Dev - Languages</h2>
                  <p>
                    This part shows programming languages that I am familiar with. 
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h2>Frameworks</h2>
                  <p>
                    This part shows frameworks for programming languages that I am familiar with. 
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h2>Libraries</h2>
                  <p>
                    This part shows libraries for programming languages that I am familiar with. 
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h2>Languages</h2>
                  <p>
                    This part shows languages that I am familiar with, covers both vocal and reading ability. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`content-wrapper  ${currentPage === 4 ? "active" : ""}`}>
        
          <div className='auto-grid scrollbar'>
            <a 
              className='github-btn'
              href='https://github.com/fredriktre/ApprenticeDocumentation' 
              target='_blank'>
              <p>Github</p>
            </a>
            {
              Portfolio.map((portfolioPiece:any, index:number) => {

                return (
                  <div key={`${portfolioPiece.name}${index}`} onClick={() => {
                    setPortfolioModalContent({
                      name: portfolioPiece.name,
                      desc: portfolioPiece.desc,
                      tags: portfolioPiece.tags,
                      link: portfolioPiece.link,
                      images: portfolioPiece.images
                    });
                    setModalOpen(true);
                  }}>
                    <img src={portfolioPiece.images[0]} />
                  </div>
                )
              })
            }
          </div>
        
        </div>
        
        <div className={`content-wrapper  ${currentPage === 5 ? "active" : ""}`}>
          <div className='pagepartbtn-wrapper'>
            <button
              onClick={() => setCurrentPagePart(10)}>
              Recreational
            </button>
            <button
              onClick={() => setCurrentPagePart(11)}>
              Work Related
            </button>
            <button 
              onClick={() => setCurrentPagePart(12)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
          <div className='card-container'>
            <div className={`card-wrapper ${currentPagePart === 10 ? "cactive" : ""} scrollbar`}>
              {
                recreational.map((interest:any, index:number) => {

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
                        animate={recreationalController}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                        className='skill-meter-fg'
                        ></motion.span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={`card-wrapper ${currentPagePart === 11 ? "cactive" : ""} scrollbar`}>
              {
                workrelated.map((interest:any, index:number) => {

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
                        animate={workrelatedController}
                        transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                        className='skill-meter-fg'
                        ></motion.span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={`card-wrapper ${currentPagePart === 12 ? "cactive" : ""}`}>
              <div>
                <div>
                  <h2>Freetime</h2>
                  <p>This section covers my recreational, activities and similar stuff to that.</p>
                </div>
              </div>
              <div>
                <div>
                  <h2>recreational</h2>
                  <p>
                    This part shows recreational that I have. 
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h2>Work related</h2>
                  <p>
                    This part shows recreational that I have related to my work. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`info-modal ${modalOpen ? "active" : ""}`}>
        <div className={`image-wrapper`}>          
          <button className={`left ${currentImage > 0 ? "visible" : ""}`}
            onPointerDown={() => handlePageShift(false, portfolioModalContent.images.length - 1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          {
            portfolioModalContent.images.map((image:string, index:number) => (
              <img className={`${currentImage === index ? "visible" : ""}`}
                src={image} 
                key={index} 
                alt={`${index}`} />
            ))
          }
          <button className={`right ${currentImage < portfolioModalContent.images.length - 1 ? "visible" : ""}`}
            onPointerDown={() => handlePageShift(true, portfolioModalContent.images.length - 1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        <div className={`content`}>
          <h1>{portfolioModalContent.name}</h1>
          <p>{portfolioModalContent.desc}</p>
          <div className='tags-wrapper'>
            {
              portfolioModalContent.tags.map((tag:string, index:number) => (
                <div key={index}>
                  <p>{tag}</p>
                </div>
              ))
            }
          </div>
          {
            portfolioModalContent.link.length > 0 &&
            <a href={portfolioModalContent.link} target='_blank'>Open</a>
          }
        </div>
        <span 
          onPointerDown={() => {
            setPortfolioModalContent({
              name: "",
              desc: "",
              tags: [],
              link: "",
              images: []
            });
            setCurrentImage(0);
            setModalOpen(false);
          }}
        ></span>
      </div>
      <div className={`video-modal ${videoModalOpen ? "active" : ""}`}>
        <span 
          onPointerDown={() => {            
            setVideoModalOpen(false);
          }}
        ></span>
      </div>
      <span></span>
    </div>
  )
}

export default App