import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
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
    projectId: "ferieboard",
    storageBucket: "ferieboard.appspot.com",
    messagingSenderId: "1035133744068",
    appId: "1:1035133744068:web:58e33e3a6ee4f623216a91"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentlyClickedPost, setCurrentlyClickedPost] = useState(0);

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
          console.log(itemRef._location.path_)
          getDownloadURL(ref(storage, itemRef._location.path_)).then((url) => {
            setPosts((prevPosts) => prevPosts.concat(url))
          })
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
  

  const handleFiles = async (event:any) => {
    const filesArray:any[] = [];
    if (event.target.files) {
      const previewFileArray = Array.from(event.target.files).map((file:any) => URL.createObjectURL(file));
      Array.from(event.target.files).map((file:any, index: number) => filesArray.push({
        file: file,
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
    }    
    setFiles([])
    setIsLoading(false)
  }

  return (
    <div className='relative w-full h-full min-h-screen flex flex-col gap-5 bg-blue-800'>

      <nav className='w-full h-16 bg-black flex justify-between items-center px-4'>
        <h1 className="text-white text-4xl">Ferieboard</h1>
        <div className="w-fit h-fit relative bg-blue-500 hover:bg-blue-400 active:bg-blue-600 
        transition-colors duration-150 px-4 py-2 rounded-lg">
          <p className="text-white text-2xl">Add Images</p>
          <input className="absolute w-full h-full top-0 left-0 z-10 opacity-0" type="file" multiple
          onChange={handleFiles} accept="image/*" />
        </div>
      </nav>

      <div className='w-4/5 mx-auto h-full max-h-screen auto-grid gap-5 justify-items-center items-center'>
          {
            posts.map((post:any, index:number) => (
              <div key={index} onClick={() => setCurrentlyClickedPost(index + 1)}
              className="p-4 bg-blue-950 hover:bg-blue-900 rounded-xl w-full h-full flex justify-center items-center">
                <img src={post} className="rounded-xl object-cover w-full max-h-56" />
              </div>
            ))
          }
      </div>

      <div className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center
      ${files.length > 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} 
      transition-opacity duration-150 pointer-events-none opacity-0`}>

        <div className="relative z-30 w-4/5 mx-auto h-4/5 p-4 bg-blue-500 rounded-lg flex flex-col gap-5 overflow-y-auto">
          <div className="w-fit h-fit flex justify-center items-center gap-5 mx-auto">
            <button onClick={handleUpload}
            className="px-4 py-2 rounded-lg bg-blue-900 text-white placeholder:text-gray-300
            outline-none border-2 border-transparent hover:border-blue-200 transition-colors duration-150"
            >Upload</button>
            <button onClick={() => setFiles([])}
            className="px-4 py-2 rounded-lg bg-red-900 text-white placeholder:text-gray-300
            outline-none border-2 border-transparent hover:border-blue-200 transition-colors duration-150"
            >Cancel</button>
          </div>
          {
            files.map((file:any, index:number) => (
              <div key={index} className="w-full h-fit flex gap-5 justify-center items-center">
                <img src={file.preview} className="w-1/2 h-fit rounded-lg" />                
              </div>
            ))
          }
        </div>

        <span className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-60"></span>
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

      <div className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center
      ${currentlyClickedPost != 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} 
      transition-opacity duration-150 pointer-events-none opacity-0`} onClick={() => setCurrentlyClickedPost(0)}>

        <div className="relative z-30 w-4/5 mx-auto h-4/5 flex justify-center items-center">
          <img src={posts[currentlyClickedPost - 1]} className="rounded-xl h-full object-contain" />
        </div>

        <span className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-60"></span>
      </div>
    </div>
  )
}

export default App
