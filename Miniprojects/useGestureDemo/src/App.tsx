import { useState } from 'react'
import './App.css'
import ScrollDown from './components/ScrollDown'
import ScrollLeft from './components/ScrollLeft'
import ScrollManual from './components/ScrollManual';

function App() {
  const [showDemo, setShowDemo] = useState(false);
  
  return (
    <div className="app-container">
      {/* {
        showDemo ? <ScrollDown show={setShowDemo} /> : <ScrollLeft show={setShowDemo} />
      } */}
      <ScrollManual />
    </div>
  )
}

export default App
