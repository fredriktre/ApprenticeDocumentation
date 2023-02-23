// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL, } from 'firebase/storage';
import { getDatabase, onValue, ref as databaseRef, set } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZrWNuDNsy8lZtSVMK7oQMjIv5P1EGz8w",
  authDomain: "querymessenger.firebaseapp.com",
  databaseURL: "https://querymessenger-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "querymessenger",
  storageBucket: "querymessenger.appspot.com",
  messagingSenderId: "870108965933",
  appId: "1:870108965933:web:44872a3457f75e67985ca4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app)

function createCustomQuery() {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let returnValue = "";
  for (let i = 0; i < 12; i++){
    const decide = Math.floor(Math.random() * 10);
    let result;
    if (decide < 5){
      result = Math.floor(Math.random() * 10);
    } else if (decide >= 5){
      const pickLetter:number = Math.floor(Math.random() * 26)
      result = alphabet[pickLetter];
    } 
    returnValue = `${returnValue}${result}`
  }
  return returnValue
}

export async function handleMessage(image:any, message:string) {  
  let imageID = createCustomQuery();
  return new Promise(resolve => {
    uploadBytes(storageRef(storage, imageID), image)
    .then((snapshot) => {
      let query = createCustomQuery();
      console.log("image uploaded")
      console.log(snapshot)
      writeMessage(imageID, message, query);
      resolve(query)
    })
    .catch(error => {
      console.error(`image upload failed:         ${error.message}`)
    })
  })  
}

function writeMessage(imageid:string, message:string, query:string){

  set(databaseRef(db, 'Messages/' + query), {
    imageid: imageid,
    message: message
  })

  console.log("message is written")
}

export function getMessageFromQuery(query:string) {
  return new Promise (resolve => {
    onValue(databaseRef(db, 'Messages/' + query), 
    (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      resolve(data)
    })
  })
}

export function getImageFromId(id:string) {
  return new Promise (resolve => {
    getDownloadURL(storageRef(storage, id))
      .then((url) => {
        resolve(url);
      })
  })
}