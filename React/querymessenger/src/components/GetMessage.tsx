import { useState } from 'react';
import placeholder from '../assets/noimage.png'
import loadingImage from '../assets/loading.png'
import { getImageFromId, getMessageFromQuery } from '../firebase';

export default function GetMessage() {
  const [image, setImage] = useState(placeholder);
  const [message, setMessage] = useState("No message yet...");
  const [query, setQuery] = useState("");

  function handleImage(id:string) {
    getImageFromId(id)
      .then((result:any) => {
        setImage(result);
      })
  }

  function getHandler () {   
  
    if (query.length > 11) {
      getMessageFromQuery(query)
        .then((result:any) => {
          setImage(loadingImage);
          setMessage(result.message);
          handleImage(result.imageid);
        })
        .catch(error => {
          console.log("couldn't get message:            " + error.message);
        })
  
    }
  }

  function inputHandler(e:any) {
    setQuery(e.target.value);
  }
  

  return (
    <div className="flex flex-col justify-start items-center w-1/2 max-w-lg">
        <h1>Get message</h1>
        <img className='w-full mb-10 border-2 border-black rounded-lg' src={image} />
        <div className='w-full mb-10 border-2 border-blue-800 rounded-lg bg-gray-800 text-white'>
          <p className='break-words ml-2 mr-2' id='message-text'>{message}</p>
        </div>
        <div className='w-full flex justify-between'>
            <input onKeyUp={e => inputHandler(e)} className='w-full border-2 border-blue-800 bg-gray-800 text-white rounded-lg indent-2 outline-none' type="text" placeholder="messagequery" />
            <button onClick={getHandler} className="pt-2 pb-2 pr-4 pl-4 h-10 z-20 bg-blue-800 border-black border-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200" type="button">Get</button>
        </div>
    </div>
  )
}
