import { useEffect, useState } from 'react'
import IMGBG1 from './assets/mountainbg.png'

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   console.log(currentPage)
  // }, [currentPage])

  return (
    <>

      <nav>

        <button onClick={() => setCurrentPage(0)}
        className={`${currentPage === 0 ? "active" : ""}`}>Home</button>
        <button onClick={() => setCurrentPage(1)}
        className={`${currentPage === 1 ? "active" : ""}`}>Education</button>
        <button onClick={() => setCurrentPage(2)}
        className={`${currentPage === 2 ? "active" : ""}`}>Work</button>
        <button onClick={() => setCurrentPage(3)}
        className={`${currentPage === 3 ? "active" : ""}`}>Skills</button>
        <button onClick={() => setCurrentPage(4)}
        className={`${currentPage === 4 ? "active" : ""}`}>Portfolio</button>
        <button onClick={() => setCurrentPage(5)}
        className={`${currentPage === 5 ? "active" : ""}`}>AI-Stuffs</button>
        <button onClick={() => setCurrentPage(6)}
        className={`${currentPage === 6 ? "active" : ""}`}>Freetime</button>

        <span></span>
      </nav>

      <div className='card content-card'>
        <div className='content-card-content'>

        </div>
        <span></span>
      </div>
    </>
  )
}

export default App
