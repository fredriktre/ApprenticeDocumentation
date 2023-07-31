import { useState, useRef, useEffect } from 'react'
import './App.css'
import EmailEditor from 'react-email-editor';
import { CircleLoader } from 'react-spinners';
import { initializeApp } from "firebase/app";

function App() {
  const emailEditorRef = useRef<any>(null);
  const screen = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tooSmallScreenSize, setTooSmallScreenSize] = useState<boolean>(false);
  const [exportCode, setExportCode] = useState<any>("");

  const firebaseConfig = {
    apiKey: "AIzaSyDMYJCod-KEBGtQsgEoBve2TWavsp0X15I",
    authDomain: "kompem-f3c10.firebaseapp.com",
    projectId: "kompem-f3c10",
    storageBucket: "kompem-f3c10.appspot.com",
    messagingSenderId: "357906183130",
    appId: "1:357906183130:web:38793e0bfe92fd3a1246e3"
  };

  const app = initializeApp(firebaseConfig);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data:any) => {
      const { html } = data;
      // console.log('exportHtml', html);
      setExportCode(html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');

    setIsLoading(false);
  };
  useEffect(() => {
    if (!screen.current) return
    
    if (screen.current.offsetWidth < 1026) {
      setTooSmallScreenSize(true); 
    } else {
      setTooSmallScreenSize(false); 
    }
  }, [])

  return (
    <div className='relative w-full h-screen flex flex-col gap-10 bg-black'>
      <div className={`w-full h-screen flex justify-center items-center flex-col px-5 gap-5 absolute top-0 left-0 z-50 ${exportCode.length > 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

        <div className='relative z-[60] bg-black w-full rounded-md px-4 py-2'>
          <button 
            className={`text-white bg-cyan-700 px-4 py-2 rounded-md ${isLoading ? 
              "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
            onClick={() => {
              navigator.clipboard.writeText(exportCode);
            }}
            >Copy</button>
        </div>

        <div className='relative z-[60] text-white p-4 rounded-md bg-black h-1/2 w-full overflow-y-auto'> 
          <p>{exportCode}</p>
        </div>

        <span className='w-full h-full absolute top-0 left-0 z-[50] bg-black opacity-50'
        onClick={() => setExportCode("")}></span>
      </div>

      <nav className=''>

      </nav>

      <div className={`relative bg-gray-900 w-full ${tooSmallScreenSize ? "h-screen" : "h-fit"}`} ref={screen}>
        {
          tooSmallScreenSize ?
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
              <h1 className='text-white'>Screen is too small!</h1>
          </div>
          :
          <>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
              <CircleLoader
                color={"#0891b2"}
                loading={isLoading}
                size={400}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>

            <div className='w-full px-4 py-2'>
              <button 
                className={`text-white bg-cyan-700 px-4 py-2 rounded-md ${isLoading ? 
                  "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
                onClick={exportHtml}
                >Export HTML</button>
            </div>

            <EmailEditor
              style={{
                opacity: `${isLoading ? "0" : "1"}`
              }}
              ref={emailEditorRef}
              tools={{
                image: {
                  position: 1
                },
                customTools: {

                }
              }}
              minHeight={"80vh"}
              onLoad={() => {
                if (!tooSmallScreenSize) {
                  onLoad();
                }
              }}
              onReady={() => {
                if (!tooSmallScreenSize) {
                  onReady();
                }
              }}
            />
          </>
        }
      </div>
    </div>
  )
}

export default App
