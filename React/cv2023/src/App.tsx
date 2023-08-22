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

  const firebaseConfig = {
    apiKey: "AIzaSyC-3km9K8spoM-tep5eyVCcqBCPHmIDze0",
    authDomain: "portfolio-a0738.firebaseapp.com",
    projectId: "portfolio-a0738",
    storageBucket: "portfolio-a0738.appspot.com",
    messagingSenderId: "557921732481",
    appId: "1:557921732481:web:97fc16a20c217a17034a80",
    measurementId: "G-BC0P9DSTJZ"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

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
          <div className={`content-wrapper ${currentPage != 0 ? "active" : ""}`}>

            <div className={`${currentPage === 5 ? "" : ""}`}>

            </div>

          </div>
      </div>

      <span></span>
    </div>
  )
}

export default App