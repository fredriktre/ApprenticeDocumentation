import { useEffect, useState } from 'react'
import { useMount } from 'react-use'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  // let app;
  // let startTouch;

  function handleMenu (to) {
    setMenuOpen(to)
  }

  const handleDragEnd = (event, info) => {
    if (info.offset.x < 300) {
      handleMenu(true)
    } 
  }

  return (
    <div id='app' className="bg-green-100 w-full h-screen min-h-full overflow-hidden">

      <div id='menu' className='fixed z-0 w-full h-full flex justify-end pr-20 bg-white'>
        <button onClick={() => handleMenu(false)}>x</button>
        <ul className='p-0 flex flex-col gap-4 mt-20'>
          <li><a href="#">home</a></li>
          <li><a href="#">about</a></li>
          <li><a href="#">information</a></li>
          <li><a href="#">programs</a></li>
          <li><a href="#">contact</a></li>
        </ul>
      </div>

    <motion.div
      className='w-full h-full'
      transition={{type: "tween"}}
      initial={{translateX: menuOpen ? "0%" : "-85%"}}
      animate={{translateX: menuOpen ? "-85%" : "0%"}}
    >
      <motion.div 
        key='content'
        className={`w-full h-full bg-blue-500`}
        drag="x"
        dragMomentum={false}
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
      >
        <h1>Content</h1>
        <h1>Here</h1>
      </motion.div>
    </motion.div>
      

    </div>
  )
}

export default App
