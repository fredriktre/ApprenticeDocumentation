import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("websites")
  const [action, setAction] = useState("develop")
  const [loader, setLoader] = useState(false);
  const [currentText, setCurrentText] = useState(0)
  const [currentAction, setCurrentAction] = useState(0)
  const actionArray = ["develop", "design"]
  const textArray = ["web-apps", "websites"]

  const characters = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "]", "{", "}",
    "|", ":", ";", ",", ".", "<", ">", "?", "/", "~", "`", "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9"
  ];
    
  const textSwitcher = () => {
      setTimeout(() => {
        setCurrentText(oldstate => {
          if (oldstate < textArray.length - 1) {
            return (oldstate + 1)
          } else {
            if (currentAction < actionArray.length - 1) {
              setCurrentAction(currentAction + 1)
            } else {
              setCurrentAction(0)
            }
            return (0)
          }
        })
      }, 3000)
  }

  const glitcher = () => {
  }


  useEffect(() => {
    setLoader(true)

    return () => {
      setLoader(false)
    }
  }, [])

  useEffect(() => {
    if (loader) {
      textSwitcher()
    }
  }, [loader])

  useEffect(() => {
    if (!glitcherActive) {
      console.log(currentAction, currentText)
      textSwitcher()
    }
  }, [currentText])

  return (
    <div>
      <p>I <span>{action}</span> <span>{text}</span></p>
    </div>
  )
}

export default App
