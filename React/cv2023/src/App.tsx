import { useEffect, useState } from 'react'
// import "./s1.css"
import "./s2.css"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  const [currentHoveredButton, setCurrentHoveredButton] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
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
      name: "skillset",
      image: "/assets/skillset.png"
    },
    {
      name: "Portfolio",
      image: "/assets/portfolio.png"
    },
    {
      name: "AI stuff",
      image: "/assets/aistuff.png"
    },
    {
      name: "Freetime",
      image: "/assets/freetime.png"
    },
  ]

  const skillset = [
    {
      name: "HTML",
      confidence: 4
    },
    {
      name: "CSS",
      confidence: 4
    },
    {
      name: "Javacript",
      confidence: 3
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
                <button id={`${page.name}-${index}`} key={index} onClick={() => setCurrentPage(index)}
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
          
          <div className='card-wrapper'>
            {
              skillset.map((skill:any, index:number) => {

                return (
                  <div key={`${skill.name}-${index}`}>
                    <h1>{skill.name}</h1>
                    <div className='skill-meter'>
                      <p
                      className='skill-meter-txt'
                      >{skill.confidence}</p>
                      <span 
                      className='skill-meter-fg'
                      style={{
                        width: `${skill.confidence * 20}%`,
                      }}
                      ></span>
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