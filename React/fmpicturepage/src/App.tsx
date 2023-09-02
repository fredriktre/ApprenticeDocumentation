import { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getDatabase, set, ref as dbref, get, child } from "firebase/database"
import YtPlayer from './components/YtPlayer';
import VideoPlayer from './components/VideoPlayer';
import Image from './components/Image';

function App() {
  const [addFiles, setAddFiles] = useState<any[]>([]);
  const [previewURLS, setPreviewURLS] = useState<any[]>([]);
  const [currentPrevInteraction, setCurrentPrevInteraction] = useState<number>(0);
  const [rerender, setRerender] = useState(false);
  const [ytLinkOpened, setYtLinkOpened] = useState<boolean>(false)
  const [ytLink, setYtLink] = useState<string>()
  const [content, setContent] = useState<any[]>([])

  const firebaseConfig = {
    apiKey: "AIzaSyCQzJi3wbw9YLLv6ERH_RWgSzWyxMjr_mc",
    authDomain: "fmpictures-eed99.firebaseapp.com",
    databaseURL: "https://fmpictures-eed99-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fmpictures-eed99",
    storageBucket: "fmpictures-eed99.appspot.com",
    messagingSenderId: "869947114032",
    appId: "1:869947114032:web:59e97a34142bbd434f63f5"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const database = getDatabase(app);

  let runs = 0;

  useEffect(() => {

    if (content.length > 0) return
    
    if (runs < 1) {
      get(dbref(database, "content")).then((snapshot) => {
        if (snapshot.exists()) {
          const rawContent = Object.entries(snapshot.val())
  
          const content:any[] = []
          for (let i = 0; i < rawContent.length; i++) {
            content.push(rawContent[i][1])
          }
  
          handleGetURLS(content)
        }
      })
    }

    runs++

  }, [])

  async function handleGetURLS (content:any) {

    const completeContent:any[] = [];
    for (let i = 0; i < content.length; i++) {
      if (content[i].type != "yt") {
        const url = await getDownloadURL(sref(storage, `content/${content[i].contentID}`))
        completeContent.push({
          contentID: content[i].contentID,
          content_name: content[i].content_name,
          members: content[i].members,
          desc: content[i].desc,
          type: content[i].type,
          url: url
        })
      } else {
        completeContent.push({
          contentID: content[i].contentID,
          content_name: content[i].content_name,
          members: content[i].members,
          desc: content[i].desc,
          type: content[i].type,
          url: content[i].contentID
        })
      }
    }

    setContent(completeContent);
  }

  const addImagesHandler = async (event:any) => {
    const previewFiles:any[] = []

    
    const newAddFiles:any[] = []
    for (let i = 0; i < event.target.files.length; i++){
      newAddFiles.push({
        file: event.target.files[i],
        content_name: "",
        members: [],
        desc: "",
        type: `${event.target.files[i].name.split(".")[1]}`
      })
    }

    setAddFiles((oldFiles) => [...oldFiles, ...newAddFiles])
    for (let i = 0; i < event.target.files.length; i++) {
      const URL = await readFile(event.target.files[i])
      previewFiles.push({
        type: `${event.target.files[i].name.split(".")[1]}`,
        url: URL
      })
    }
    setPreviewURLS((oldURLS) => [...oldURLS, ...previewFiles]);
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

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  function makeID () {
    let id = "IMG";

    for (let i = 0; i < 12; i++) {
      id = `${id}${chars[Math.floor(Math.random() * chars.length)]}`
    }

    return id
  }

  const uploadImagesHandler = async () => {

    for (let i = 0; i < addFiles.length; i++) {
      console.log(addFiles[i])

      const id = makeID()

      const contentRef = sref(storage, `content/${id}`)

      const sresponse = await uploadBytes(contentRef, addFiles[i].file);

      console.log("Storage done")
      console.log(sresponse)

      await set(dbref(database, `content/${id}`), {
        content_name: addFiles[i].content_name,
        members: addFiles[i].members,
        desc: addFiles[i].desc,
        contentID: `${id}`,
        type: addFiles[i].type
      })

      console.log("Database done")

    }

  }

  const addYTHandler = (event:any) => {



  }

  return (
    <div className='w-full h-full flex flex-col justify-stretch items-center'>

      <nav className='w-full h-20 bg-black flex justify-between items-center px-5 gap-5'>
        <div>
          <h1 className='text-2xl text-white'>Trevland Images</h1>
        </div>
        <div className='flex gap-5'>
          <div className='relative bg-gray-400 p-4 rounded-lg hover:bg-gray-300 active:bg-gray-500
          border-2 border-gray-600 hover:border-gray-700 active:border-gray-500 transition-colors 
          duration-150 overflow-hidden'>
            <input
              onChange={addImagesHandler}
              multiple
              accept='.webp,.png,.jpg,.jpeg,.mp4'
              type='file' 
              className='absolute top-0 left-0 z-10 w-full h-full opacity-0' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <button 
            onClick={() => setYtLinkOpened(!ytLinkOpened)}
            className='bg-gray-400 p-4 rounded-lg hover:bg-gray-300 active:bg-gray-500
            border-2 border-gray-600 hover:border-gray-700 active:border-gray-500 transition-colors 
            duration-150 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>              
          </button>
        </div>
      </nav>

      <div className='w-4/5 h-full mx-auto flex items-center justify-center'>
        <div className='w-full auto-grid gap-5 place-items-center'>
          {
            content.map((contentPiece:any, index:number) => {
              let component;
              if (contentPiece.type === "yt") {
                component = <YtPlayer 
                key={`${contentPiece.type}-${index}`} 
                source={contentPiece.url} />
              } else if (contentPiece.type === "mp4") {
                component = <VideoPlayer 
                key={`${contentPiece.type}-${index}`}
                source={contentPiece.url} 
                title={contentPiece.content_name} />
              } else {
                component = <Image 
                key={`${contentPiece.type}-${index}`} 
                source={contentPiece.url} 
                alt={contentPiece.content_name} />
              }

              return component
            })
          }
        </div>
      </div>

      <div className={`absolute top-0 left-0 w-full h-screen flex justify-center 
      items-center ${previewURLS.length > 0 ? "opacity-100 pointer-events-auto" 
      : "opacity-0 pointer-events-none"} transition-opacity duration-150 z-20`}>

        <div className='w-4/5 h-fit max-h-[60%] auto-grid gap-5 place-items-center'>
          {
            previewURLS.map((preview:any, index:number) => (

              <div onClick={() => setCurrentPrevInteraction(index + 1)}
              key={index} className='relative z-30 w-full max-w-lg'>
                {
                  preview.type === "mp4" ? 
                  <VideoPlayer source={preview.url} title='preview' />
                  :
                  <Image source={preview.url} alt='preview' />
                }
                <div className={`${currentPrevInteraction === index + 1 ? 
                "pointer-events-auto opacity-100" :
                "pointer-events-none opacity-0"} transition-opacity duration-150
                absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col gap-4`}>
                  <input 
                    onChange={(event) => {
                      const newArray = addFiles;
                      newArray[index].content_name = event.target.value
                      setRerender(!rerender)
                      setAddFiles(newArray)
                    }}
                    type='text' 
                    className='z-40 py-2 px-4' 
                    placeholder='Image name'/>

                  <div className='z-40'>
                    <button 
                      className='bg-green-400 z-40 p-2 rounded-lg 
                      hover:bg-green-300 active:bg-green-500
                      border-2 border-green-600 hover:border-green-700 
                      active:border-green-500 transition-colors 
                      duration-150 overflow-hidden'
                      onClick={() => {
                        const newArray = addFiles;
                        newArray[index].members.push("")
                        setAddFiles(newArray)
                        setRerender(!rerender)
                      }}>
                      Add member
                    </button>
                    <button 
                      className='bg-red-400 z-40 p-2 rounded-lg 
                      hover:bg-red-300 active:bg-red-500
                      border-2 border-red-600 hover:border-red-700 
                      active:border-red-500 transition-colors 
                      duration-150 overflow-hidden'
                      onClick={() => {
                        const newArray = addFiles;
                        newArray[index].members.pop()
                        setAddFiles(newArray)
                        setRerender(!rerender)
                      }}>
                      Remove member
                    </button>
                  </div>

                  <div className='z-40 grid auto-grid gap-2 overflow-y-auto'>
                    {
                      addFiles[index].members.map((member:string, index2:number) => (
                        <input key={`${index2}`}
                          onChange={(event) => {    
                            const newArray = addFiles;
                            newArray[index].members[index2] = `${event.target.value}`
                            setAddFiles(newArray)          
                            setRerender(!rerender)
                          }}
                          value={member}
                          type='text' 
                          className='z-40 py-2 px-4' 
                          placeholder={`member-${index2 + 1}`}/>
                      ))
                    }
                  </div>

                  <textarea 
                    onChange={(event) => {
                      const newArray = addFiles;
                      newArray[index].desc = `${event.target.value}`
                      setAddFiles(newArray)          
                      setRerender(!rerender)
                    }}
                    className='z-40 resize-none py-2 px-4' 
                    maxLength={1000}
                    placeholder='Description'></textarea>
                  <span className='absolute top-0 left-0 w-full h-full bg-black opacity-80'></span>
                </div>
              </div>

            ))
          }
        </div>

        <div className='absolute top-5 right-5 z-30 flex gap-5'>          
          <div className='relative bg-gray-400 p-4 rounded-lg hover:bg-gray-300 active:bg-gray-500
            border-2 border-gray-600 hover:border-gray-700 active:border-gray-500 transition-colors 
            duration-150 overflow-hidden'>
            <input
              onChange={addImagesHandler}
              multiple
              accept='.webp,.png,.jpg,.jpeg,.mp4'
              type='file' 
              className='absolute top-0 left-0 z-10 w-full h-full opacity-0' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <button className='bg-green-400 p-4 rounded-lg hover:bg-green-300 active:bg-green-500
            border-2 border-green-600 hover:border-green-700 
            active:border-green-500 transition-colors 
            duration-150 overflow-hidden'
            onClick={uploadImagesHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </button>
          <button className='bg-red-400 p-4 rounded-lg hover:bg-red-300 active:bg-red-500
            border-2 border-red-600 hover:border-red-700 
            active:border-red-500 transition-colors 
            duration-150 overflow-hidden'
            onClick={() => {
              setAddFiles([]);
              setPreviewURLS([]);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <span onClick={() => setCurrentPrevInteraction(0)}
        className='absolute top-0 left-0 w-full h-full bg-black opacity-80'></span>
      </div>

      <div className={`absolute top-0 left-0 w-full h-screen flex justify-center 
      items-center ${ytLinkOpened ? "opacity-100 pointer-events-auto" 
      : "opacity-0 pointer-events-none"} transition-opacity duration-150 z-20`}>

        <div className='w-fit h-fit p-4 rounded-lg flex flex-col justify-center items-center 
        gap-5 bg-black'>
          <input 
            type='text'
            placeholder='Youtube Link'
            onChange={(event) => {

              setRerender(!rerender)
            }}  
            className='z-40 py-2 px-4' 
            />
          <input 
            type='text'
            placeholder='Video Name'
            onChange={(event) => {

              setRerender(!rerender)
            }}  
            className='z-40 py-2 px-4' 
          />
          <textarea 
            onChange={(event) => {
              // const newArray = addFiles;
              // newArray[index].desc = `${event.target.value}`
              // setAddFiles(newArray)          
              setRerender(!rerender)
            }}
            className='z-40 resize-none py-2 px-4' 
            maxLength={1000}
            placeholder='Description'></textarea>
        </div>
        <div className='absolute top-5 right-5 z-30 flex gap-5'>  
          <button className='bg-green-400 p-4 rounded-lg hover:bg-green-300 active:bg-green-500
            border-2 border-green-600 hover:border-green-700 
            active:border-green-500 transition-colors 
            duration-150 overflow-hidden'
            onClick={addYTHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </button>
          <button className='bg-red-400 p-4 rounded-lg hover:bg-red-300 active:bg-red-500
            border-2 border-red-600 hover:border-red-700 
            active:border-red-500 transition-colors 
            duration-150 overflow-hidden'
            onClick={() => {
              setYtLinkOpened(false)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <span onClick={() => setCurrentPrevInteraction(0)}
        className='absolute top-0 left-0 w-full h-full bg-black opacity-80'></span>
      </div>
    </div>
  )
}

export default App
