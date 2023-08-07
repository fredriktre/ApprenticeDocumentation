import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import {getDatabase, ref as dbref, set, get} from 'firebase/database'
import { useState, useEffect } from 'react'
import { ClimbingBoxLoader } from "react-spinners";

function App() {

  const idCharacters: string[] = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  ];

  const firebaseConfig = {
    apiKey: "AIzaSyAwgyDYI8VrTGetHU2sDqTCF-vhLBh5WZg",
    authDomain: "ferieboard.firebaseapp.com",
    databaseURL: "https://ferieboard-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ferieboard",
    storageBucket: "ferieboard.appspot.com",
    messagingSenderId: "1035133744068",
    appId: "1:1035133744068:web:58e33e3a6ee4f623216a91"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const db = getDatabase(app);

  const [files, setFiles] = useState<any[]>([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentlyClickedPost, setCurrentlyClickedPost] = useState(0);
  const [currentPresented, setCurrentPresented] = useState(0);
  const [currentPresentedAnimation, setCurrentPresentedAnimation] = useState(false);

  function makeID () {
    let id = "f";
    for (let i = 0; i < 11; i++) {
      id = `${id}${idCharacters[Math.floor(Math.random() * idCharacters.length)]}`
    }
    return id
  }

  let i = 0;
  useEffect(() => {
    if (i < 1) {
      listAll(ref(storage, `posts`)).then((res) => {
        res.items.forEach((itemRef:any) => {
          handlePosts(itemRef._location.path_);
        })
      })
      setTimeout(() => {
        setIsLoading(false)
      }, 4000);
    }
    i++

    return () => {
      setPosts([]);
    }
  }, [])
  
  const handlePosts = (path:any) => {
    getDownloadURL(ref(storage, path)).then((url) => {
      get(dbref(db, `posts/post_${path.split("/")[1]}`)).then(async (snapshot:any) => {
        const value = await snapshot.val();
        setPosts((prevPosts) => prevPosts.concat({
          url: url,
          name: value.name
        }))
      })
    })
  }

  const handleFiles = async (event:any) => {
    const filesArray:any[] = [];
    if (event.target.files) {
      const previewFileArray = Array.from(event.target.files).map((file:any) => URL.createObjectURL(file));
      Array.from(event.target.files).map((file:any, index: number) => filesArray.push({
        file: file,
        name: "",
        preview: previewFileArray[index],
      }));
      setFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(event.target.files).map((file:any) => URL.revokeObjectURL(file))
    }
  }

  const handleUpload = async () => {

    setIsLoading(true);
    for (let i = 0; i < files.length; i++) {
      const id = makeID();
      await uploadBytes(ref(storage, `posts/${id}`), files[i].file);
      await set(dbref(db, `posts/post_${id}`), {
        name: files[i].name
      })
    }    
    setFiles([])
    setIsLoading(false)
  }

  const handlePresentation = () => {
      setCurrentPresentedAnimation(true);      
      setTimeout(() => {
        setCurrentPresented((prevCount) => {
          if (prevCount >= posts.length) {
            return 1
          } else {
            return prevCount + 1
          }
        });
        setCurrentPresentedAnimation(false);
      }, 300);
      setTimeout(() => {
        handlePresentation();
      }, 5000)
  }

  return (
    <div className='relative w-full h-full min-h-screen flex flex-col gap-5 bg-blue-800'>

      <nav className='w-full h-16 bg-black flex justify-between items-center px-4'>
        <h1 className="text-white text-4xl">Ferieboard</h1>
        <button onClick={handlePresentation}
        className="w-fit h-fit relative bg-blue-500 hover:bg-blue-400 active:bg-blue-600 
        transition-colors duration-150 px-4 py-2 rounded-lg text-white text-2xl"
        >Presentasjon</button>
        <div className="w-fit h-fit relative bg-blue-500 hover:bg-blue-400 active:bg-blue-600 
        transition-colors duration-150 px-4 py-2 rounded-lg">
          <p className="text-white text-2xl">Legg til bilder</p>
          <input className="absolute w-full h-full top-0 left-0 z-10 opacity-0" type="file" multiple
          onChange={handleFiles} accept="image/*" />
        </div>
      </nav>
      <p className="w-full text-center text-white">PS! Hvis du bruker Presentasjon, refresh nettsiden når du skal ut av den.
      jobber på lukkefunksjon men enda litt feil :P</p>

      <div className='w-4/5 mx-auto h-full max-h-screen auto-grid gap-5 justify-items-center items-center'>
          {
            posts.map((post:any, index:number) => (
              <div key={index} onClick={() => setCurrentlyClickedPost(index + 1)}
              className="relative p-4 bg-blue-950 hover:bg-blue-900 border-4 border-blue-950 cursor-pointer 
              rounded-xl w-full h-full flex justify-center items-center transition-colors duration-150">
                <img src={post.url} className="rounded-xl object-cover w-full max-h-56" />
                <div className="absolute md:bottom-5 bottom-0 left-1/2 -translate-x-1/2 z-10 md:px-4 p-1 
                md:py-2 w-4/5 h-fit text-center opacity-0 hover:opacity-100 transition-opacity duration-150">
                  <p className="text-white z-20 relative md:text-lg text-sm">{post.name}</p>
                  <span className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-60 rounded-lg"></span>
                </div>
              </div>
            ))
          }
      </div>

      <div className={`absolute z-20 top-0 left-0 w-full h-full max-h-screen flex justify-center items-center
      ${files.length > 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} 
      transition-opacity duration-150 pointer-events-none opacity-0`}>

        <div className="relative z-30 w-4/5 mx-auto h-4/5 p-4 bg-blue-500 rounded-lg flex flex-col gap-5 overflow-y-auto">
          <div className="w-fit h-fit flex justify-center items-center gap-5 mx-auto">
            <button onClick={handleUpload}
            className="px-4 py-2 rounded-lg bg-blue-900 text-white placeholder:text-gray-300
            outline-none border-2 border-transparent hover:border-blue-200 transition-colors duration-150"
            >Last opp</button>
            <button onClick={() => setFiles([])}
            className="px-4 py-2 rounded-lg bg-red-900 text-white placeholder:text-gray-300
            outline-none border-2 border-transparent hover:border-blue-200 transition-colors duration-150"
            >Avbryt</button>
          </div>
          {
            files.length > 0 &&
            <input value={files[0].name} 
              className="px-4 py-2 rounded-lg bg-blue-900 text-white placeholder:text-gray-300 text-center
              outline-none border-2 border-transparent hover:border-blue-200 transition-colors duration-150
              w-4/5 mx-auto"
              placeholder="Navn"
              onChange={(ev) => {
                const newFiles = files;
                newFiles.forEach((file:any) => {
                  file.name = ev.target.value;
                })
                setFiles(newFiles);
                setUpdate(!update);
              }} />
          }
          {
            files.map((file:any, index:number) => (
              <div key={index} className="w-full h-fit flex gap-5 justify-center items-center">
                <img src={file.preview} className="w-1/2 h-fit rounded-lg" />                
              </div>
            ))
          }
        </div>

        <span className="absolute z-20 top-0 left-0 w-full h-full max-h-screen bg-black opacity-60"></span>
      </div>
      <div className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center
      ${isLoading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} 
      transition-opacity duration-150 pointer-events-none opacity-0`}>

        <div className="relative z-30 w-4/5 mx-auto h-4/5 flex justify-center items-center">
          <ClimbingBoxLoader
            color={"#ffffff"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>

        <span className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-60"></span>
      </div>

      <div className={`absolute z-20 top-0 left-0 w-full h-full max-h-screen flex justify-center items-center
      ${currentlyClickedPost != 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} 
      transition-opacity duration-150 pointer-events-none opacity-0`} onClick={() => setCurrentlyClickedPost(0)}>

        <div className="relative z-30 w-4/5 mx-auto h-4/5 flex justify-center items-center">
          {
            currentlyClickedPost != 0 &&
            <img src={posts[currentlyClickedPost - 1].url} className="h-full object-contain" />
          }
        </div>

        <span className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-60"></span>
      </div>

      <div className={`absolute z-20 top-0 left-0 w-full h-full max-h-screen flex justify-center items-center
      ${currentPresented != 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} 
      transition-opacity duration-150 pointer-events-none opacity-0`} onClick={() => setCurrentPresented(0)}>

        <div className={`relative z-30 w-4/5 mx-auto h-4/5 flex flex-col gap-5 justify-center items-center 
        transition-opacity duration-150 ${currentPresentedAnimation ? "opacity-0" 
        : "opacity-100"}`}>
          {
            currentPresented != 0 &&
            <>
              <img src={posts[currentPresented - 1].url} className={`h-full object-contain`} />
              <p className="text-white text-xl">{posts[currentPresented - 1].name}</p>
            </>
          }
        </div>

        <span className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-100"></span>
      </div>
    </div>
  )
}

export default App
