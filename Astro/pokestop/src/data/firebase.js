import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocs, collection } from 'firebase/firestore'

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

function handlePokeData() {
    return new Promise (resolve => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1280")
            .then(result => {
                resolve(result.json());
            })
    })
}

export function changeSearchCount(name) {
    getDoc(doc(db, "pokemon", name))
        .then((result) => {
            updateDoc(doc(db, "pokemon", name), {
                searches: result.data().searches + 1,
            })            
        })
}


export function getDataByName(name) {
    return new Promise (resolve => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(result => {
                resolve(result.json());
            })
    })
}

export function getData() {
    return new Promise(resolve => {
        const dataArray = [];
        getDocs(collection(db, "pokemon"))
            .then((results) => {
                handlePokeData()
                    .then((pokeResults) => {
                        const pokeData = pokeResults.results;
                        let i = 0;
                        results.forEach((result) => {
                            if (pokeData[i].name === result.data().name) {
                                console.log(pokeData[i])
                                dataArray.push()
                                console.log(dataArray)
                            }
                            i += 1;
                        })
                        resolve(dataArray)
                    })
            })
    })
}