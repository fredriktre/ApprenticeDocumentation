import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyChawCIlpH0GN4w4gLBwgJycE1_DLzDNMI",
  authDomain: "pokestop-5d7fb.firebaseapp.com",
  projectId: "pokestop-5d7fb",
  storageBucket: "pokestop-5d7fb.appspot.com",
  messagingSenderId: "164851623248",
  appId: "1:164851623248:web:21056fbe8e3e4eed227855"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// export function addData(data) {
//     return new Promise (resolve => {
//         console.log(data)

//         data.results.forEach(result => {
//             setDoc(doc(db, 'pokemon', `${result.name}`), {
//                 name: result.name,
//                 searches: 0
//             })
//         });

//         resolve("done")
//     })


// }

export function changeSearchCount(name) {

}

export function getDataByName(name) {

}

export function getData() {
    
}