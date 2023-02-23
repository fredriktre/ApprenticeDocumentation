import placeholder from '../assets/noimage.png'
import { useState } from 'react'
import { handleMessage } from '../firebase';

export default function PostMessage() {
    const [currentImage, setCurrentImage] = useState(placeholder)
    const [currentQuery, setCurrentQuery] = useState()
    const [letterCount, setLetterCount] = useState(1000)

    function postHandler (e:any) {
        const file = document.getElementById('fileInput').files[0];
        const message:string = document.getElementById('message').value;

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
                    .then(result => {
                        setCurrentQuery(result);
                        document.getElementById('btn-copyquery')?.classList.remove('hidden');
                    })
            }
        }
    }

    function inputHandler() {
        document.getElementById('fileinputwrapper')?.classList.add('hidden');
        const file = document.getElementById('fileInput').files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);

        reader.onloadend = (e) => {
            setCurrentImage(reader.result)
        }
    }

    return (
    <div className="flex flex-col justify-start items-center">
        <h1>Post message</h1>
        <div className='relative mb-10'>
            <img className='w-96 border-2 border-black rounded-lg' src={currentImage} />
            <div id='fileinputwrapper' className="button-hover absolute bottom-0 w-full h-10">
                <input onChange={inputHandler} id='fileInput' accept='image/png, image/jpeg' className="absolute left-1/2 -translate-x-1/2 w-28 h-full z-30 opacity-0 cursor-pointer" type="file" />
                <button id='filebtn' className="absolute left-1/2 -translate-x-1/2 w-28 h-10 z-20 border-black border-2 bg-blue-800 text-white rounded-lg transition-all duration-200" type="button">Add Image</button>
            </div>
        </div>   
        <div className='mb-5'>
            <textarea onKeyUp={e => {setLetterCount(1000 - e.target.value.length)}} id='message' className="indent-2 border-2 border-blue-800 rounded-lg resize-none outline-none bg-gray-800 text-white" rows="6" cols="50" placeholder="message" maxLength="1000"></textarea>
            <p className='text-white'>Remaining: {letterCount}</p>
        </div>
        <div className='w-full flex justify-between'>
            <button onClick={e => postHandler(e)} className="w-28 h-10 z-20 bg-blue-800 border-black border-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200" type="button">Post</button>
            <button onClick={e => {navigator.clipboard.writeText(currentQuery)}} id='btn-copyquery' className="hidden w-28 h-10 z-20 bg-blue-800 border-black border-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200" type="button">Copy Query</button>
        </div>
    </div>
    )
 }
 