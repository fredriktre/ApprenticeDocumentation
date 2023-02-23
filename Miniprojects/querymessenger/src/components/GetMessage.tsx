import { useState } from 'react';
import placeholder from '../assets/noimage.png'
import loadingImage from '../assets/loading.png'
import { getImageFromId, getMessageFromQuery } from '../firebase';

export default function GetMessage() {
  const [image, setImage] = useState(placeholder);
  const [message, setMessage] = useState("No message yet...");

  function handleImage(id:string) {
    getImageFromId(id)
      .then(result => {
        console.log(result)
        setImage(result);
      })
  }

  function getHandler () {
    const query:string = document.getElementById('query-input').value;
  
    if (query.length > 11) {
      getMessageFromQuery(query)
        .then(result => {
          console.log(result)
          setImage(loadingImage);
          setMessage(result.message);
          handleImage(result.imageid);
        })
        .catch(error => {
          console.log("couldn't get message:            " + error.message);
        })
  
    }
  }
  

  return (
    <div className="flex flex-col justify-start items-center">
        <h1>Get message</h1>
        <img className='w-96 mb-10 border-2 border-black rounded-lg' src={image} />
        <div className='w-96 mb-10 border-2 border-blue-800 rounded-lg indent-2 bg-gray-800 text-white'>
          <p id='message-text'>{message}</p>
        </div>
        <div className='w-full flex justify-between'>
            <input id='query-input' className='border-2 border-blue-800 bg-gray-800 text-white rounded-lg indent-2 outline-none' type="text" placeholder="messagequery" />
            <button onClick={getHandler} className="w-28 h-10 z-20 bg-blue-800 border-black border-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200" type="button">Get</button>
        </div>
    </div>
  )
}
