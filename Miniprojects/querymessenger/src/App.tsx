import { useState } from 'react'
import './App.css'
import Auth from './components/Auth';
import GetMessage from './components/GetMessage'
import PostMessage from './components/PostMessage'

function App() {
  const [user, setUser] = useState();
  const [loggedIn, setloggedIn] = useState(false);

  console.log(user)
  let showScreen;

  if (loggedIn === true) {
    showScreen = (
      <div className={`flex justify-center items-top flex-col md:flex-row gap-10 h-5/6 w-4/5`}>
        <GetMessage />
        <PostMessage />
      </div>
    )
  } else if (loggedIn === false) {
    showScreen = <Auth login={setloggedIn} setUser={setUser} />
  }

  return (
    <div className='flex justify-center items-center w-full min-w-[450px] min-h-screen bg-gray-900'>
      {showScreen}
    </div>
  )
}

export default App
