import placeholder from '../assets/noimage.png'
import { useState } from 'react'
import { handleMessage } from '../firebase'

export default function PostMessage() {
    const [currentImage, setCurrentImage] = useState(placeholder)
    const [currentQuery, setCurrentQuery] = useState()
    const [queryBtnActive, setQueryBtnActive] = useState(false);
    const [messageState, setMessageState] = useState("");
    const [letterCount, setLetterCount] = useState(1000)
    const [fileState, setFileState] = useState()

    function postHandler () {
        const file = fileState
        const message:string = messageState;

        if (file === undefined) {
            document.getElementById('filebtn')?.classList.remove('bg-black');    
            document.getElementById('filebtn')?.classList.add('bg-red-700');

            if(message.length < 1) {
                console.log("missing both file and message")
            } else {
                console.log("missing file");
            }

        } else if (file != undefined) {
            if(message.length < 1) {
                console.log("has file but missing message")
            } else {
                console.log("got everything")
                handleMessage(file, message)
                    .then((result:any) => {
                        setCurrentQuery(result);
                        setQueryBtnActive(true);
                    })
            }
        }
    }

    function handleMessageInput(e:any) {
        setMessageState(e.target.value)
        setLetterCount(1000 - e.target.value.length)
    }

    function inputHandler(e:any) {
        document.getElementById('fileinputwrapper')?.classList.add('hidden');
        const file = e.target.files[0];
        setFileState(file);
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            const image:string = String(reader.result)
            setCurrentImage(image)
        }
    }

    function clipboardHandler() {
        if (currentQuery != undefined) {
            const query:string = currentQuery
            navigator.clipboard.writeText(query)
        }
    }

    return (
    <div className="flex flex-col justify-start items-center w-1/2 max-w-lg">
        <h1>Post message</h1>
        <div className='relative mb-10 w-full'>
            <img className='w-full border-2 border-black rounded-lg' src={currentImage} />
            <div id='fileinputwrapper' className="absolute bottom-0 w-full h-10">
                <div className='relative w-1/2 h-full button-hover'>
                    <input onChange={e => inputHandler(e)} id='fileInput' accept='image/png, image/jpeg' className="absolute top-0 left-0 w-full h-full z-30 opacity-0 cursor-pointer" type="file" />
                    <button id='filebtn' className="absolute top-0 left-0 pt-2 pb-2 pr-4 pl-4 z-20 border-black border-2 bg-blue-800 text-white rounded-lg transition-all duration-200" type="button">Add Image</button>
                </div>
            </div>
        </div>   
        <div className='mb-5 w-full'>
            <textarea onKeyUp={e => {handleMessageInput(e)}} id='message' className="w-full pl-2 pr-2 border-2 border-blue-800 rounded-lg resize-none outline-none bg-gray-800 text-white" rows={6} cols={50} placeholder="message" maxLength={1000}></textarea>
            <p className='text-white'>Remaining: {letterCount}</p>
        </div>
        <div className='w-full flex justify-between'>
            <button onClick={postHandler} className="pt-2 pb-2 pr-4 pl-4 z-20 bg-blue-800 border-black border-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200" type="button">Post</button>
            <button onClick={clipboardHandler} id='btn-copyquery' className={`pt-2 pb-2 pr-4 pl-4 z-20 bg-blue-800 border-black border-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200 ${queryBtnActive ? "" : "hidden"}`} type="button">Copy Query</button>
        </div>
    </div>
    )
 }
 