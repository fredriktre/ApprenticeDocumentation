import { useState } from 'react'
import './index.css'

type Task = {
  title: string,
  desc: string,
  priority: number
}

function App() {
  const [addIssueModalOpen, setAddIssueModalOpen] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [changes, setChanges] = useState<boolean>(false)

  const randomSamples = {
    tasktype: [
      {
        type: "development",
        titlepiece: "Make functionality for"
      },
      {
        type: "marketing",
        titlepiece: "Write post about"
      },
      {
        type: "support",
        titlepiece: "Fix"
      }
    ],
    endpiece: [
      "server",
      "computer",
      "antivirus",
      "slugcat"
    ]
  }

  const priorities = [
    "very high",
    "high",
    "medium",
    "low",
    "very low"
  ]

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ]

  const addIssue = () => {

  }

  const addRandom = () => {
    const tasktypeNum = Math.floor(Math.random() * randomSamples.tasktype.length);
    const endpieceNum = Math.floor(Math.random() * randomSamples.endpiece.length);
    const priorityNum = Math.floor(Math.random() * 5);
    const tasktitle = `${randomSamples.tasktype[tasktypeNum].titlepiece} ${randomSamples.endpiece[endpieceNum]}`
    const d = new Date();
    const currDate = `${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`
    const currTime = `${days[d.getUTCDay() - 1]} - ${d.getUTCHours()}:${d.getMinutes()}`

    const task:Task = {
      title: tasktitle,
      desc: `Date: ${currDate} | Time: ${currTime} | Title: ${tasktitle}, | Priority: ${priorities[priorityNum]}`,
      priority: priorityNum
    }

    setTasks([...tasks, task])
    setChanges(!changes)
  }

  const filterTasks = (filter:string) => {
    setCurrentFilter(filter);
  }

  return (
    <div className='page-wrapper'>
      <nav className='top-nav'>
        <ul>
          <li>
            <button 
              onClick={() => setAddIssueModalOpen(true)}
              className='secondary-btn'
            >Add issue</button>
          </li>
          <li>
            <button 
              onClick={addRandom}
              className='secondary-btn'
            >Add random</button>
          </li>
        </ul>
      </nav>

      <div className='content-container'>
        <nav className='side-nav'>
          <h2>Filters</h2>
          <ul>
            <li>
              <button 
                onClick={() => filterTasks("development")}
                className='secondary-btn'
              >Development</button>
            </li>
            <li>
              <button 
                onClick={() => filterTasks("marketing")}
                className='secondary-btn'
              >Marketing</button>
            </li>
            <li>
              <button 
                onClick={() => filterTasks("support")}
                className='secondary-btn'
              >Support</button>
            </li>
          </ul>
        </nav>
        <div className='content-wrapper'>
          <div className='content-row'>
            <div className='content-row-cell'><h2>Title</h2></div>
            <div className='content-row-cell'><h2>Priority</h2></div>
          </div>
            {
              tasks.map((task:any, index:number) => {

                return (
                  <div key={index} className='content-row'>
                    <button className='content-row-cell'><p>{task.title}</p></button>
                    <div className='content-row-cell'><p>{priorities[task.priority]}</p></div>
                  </div>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default App
