import './App.css'
import GetMessage from './components/GetMessage'
import PostMessage from './components/PostMessage'

function App() {

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className="flex justify-center items-end gap-10 h-5/6 w-full">
        <GetMessage />
        <PostMessage />
      </div>
    </div>
  )
}

export default App
