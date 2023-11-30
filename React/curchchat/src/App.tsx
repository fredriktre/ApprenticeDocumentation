import { useState, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { get, getDatabase } from "firebase/database"

type MessageType = {
  username: string,
  date: string,
  message: string,
  source: string,
}

type PreFile = {
  source: {
    lastModified: number,
    lastModifiedDate: any,
    name: string,
    size: number,
    type: string,
    webkitRelativePath: string,
  } | {},
  blob: string,
}

function App() {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<PreFile>({
    source: {},
    blob: "",
  });
  const [messages, setMessages] = useState<MessageType[]>([]);

  const alphabetAndNumbers = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z"
  ];

  const firebaseConfig = {
    apiKey: "AIzaSyCbS3c2_-l3rAzywpCwMnn5XcwqFu-tv1g",
    authDomain: "churchchat-e18d4.firebaseapp.com",
    projectId: "churchchat-e18d4",
    storageBucket: "churchchat-e18d4.appspot.com",
    messagingSenderId: "180027688589",
    appId: "1:180027688589:web:2f331aa30fb7906e3784c4"
  };

  const app:any = initializeApp(firebaseConfig);
  const db:any = getDatabase(app);

  const handleFileInput = async (ev:any) => {
    console.log(ev.target.files[0])
    const blob:any = await readFile(ev.target.files[0]);
    setFile({
      source: ev.target.files[0],
      blob: blob
    })
  }

  function makeID () {
    let ID = "E"

    for (let i = 0; i < 15; i++) {
        ID = `${ID}${alphabetAndNumbers[Math.floor(Math.random() * alphabetAndNumbers.length)]}`
    }

    return ID
  }
  
  async function readFile (target:any) {
    return new Promise((resolve:any) => {
      const reader = new FileReader();
      reader.onload = (evt:any) => {
        resolve(evt.target.result);
      }
      reader.readAsDataURL(target);
    })
  }  

  function sendMessage () {
    const dateData = new Date;
    const time = dateData.getHours() + ":" + dateData.getMinutes() + ":" + dateData.getSeconds();
    const date = dateData.getFullYear()+'-'+(dateData.getMonth()+1)+'-'+dateData.getDate();
    console.log(date, time)
    // const newMessage = {
    //   username: username,
    //   date: `${time}|${date}`,
    //   message: message,
    //   source: ,
    // }
  }

  return (
    <>

      <nav>
        <a href='/'>
          <img src='/logo.jpg' />
        </a>
        <input 
          type='text' 
          placeholder='Username' 
          value={username}
          onChange={(ev) => setUsername(ev.target.value)} />
      </nav> 

      <main>

        <div className='chat-wrapper'>
          {
            messages.map((message:MessageType, index:number) => {
              if (message.source.length > 0) {
                return (
                  <div className='chat-bubble'>
                    <p>{message.username}</p>
                    <div className='chat-bubble-content'>
                      <p>{message.message}</p>
                      <img src={message.source} alt={`${message.username}-${message.date}`} />
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className='chat-bubble'>
                    <p>{message.username}</p>
                    <div className='chat-bubble-content'>
                      <p>{message.message}</p>
                    </div>
                  </div>
                )
              } 
            })
          }
        </div>

        <div className='chat-box-wrapper'>

          <input 
            type='text' 
            placeholder='write something damnit!'
            value={message}
            onChange={(ev) => setMessage(ev.target.value)} />

          <div className={`file-wrapper ${file.blob != "" ? "active" : ""}`}>
            <div className={`file-btn ${file.blob === "" ? "show" : ""}`}>
              <input type='file' onChange={(ev) => handleFileInput(ev)} />
              <p>Send Image</p>
            </div>
            <div className={`file-preview ${file.blob != "" ? "show" : ""}`}>
              <img 
                src={file?.blob} 
                alt='preview image' />
              <button onClick={() => setFile({
                source: {},
                blob: ""
              })}>
                X
              </button>
            </div>
          </div>

          <button 
            className='send-btn'
            onClick={sendMessage}>
            send
          </button>
          
        </div>

      </main>

    </>
  )
}

export default App
