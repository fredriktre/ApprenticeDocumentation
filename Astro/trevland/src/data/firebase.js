import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5iNCv4M4hVqecGcEh5YmqkV-mR5n9Iuc",
  authDomain: "trevlandsite-22c93.firebaseapp.com",
  projectId: "trevlandsite-22c93",
  storageBucket: "trevlandsite-22c93.appspot.com",
  messagingSenderId: "86606825721",
  appId: "1:86606825721:web:a99ac8e8628fb4a44a7a28"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

function idMaker (length) {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let result = "";
    for (let i = 0; i < length; i++) {
        const currnum = Math.floor(Math.random() * 34);
        if (currnum < 9) {
            result = `${result}${currnum}`
        } else {
            result = `${result}${alphabet[currnum - 9]}`
        }
    }
    return result
}


export function handleRequest() {
    let id = idMaker(6)
    setDoc(doc(db, "requests", id), {

    })
}