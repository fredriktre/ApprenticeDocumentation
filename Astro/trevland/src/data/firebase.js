import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5iNCv4M4hVqecGcEh5YmqkV-mR5n9Iuc",
  authDomain: "trevlandsite-22c93.firebaseapp.com",
  projectId: "trevlandsite-22c93",
  storageBucket: "trevlandsite-22c93.appspot.com",
  messagingSenderId: "86606825721",
  appId: "1:86606825721:web:a99ac8e8628fb4a44a7a28"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

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


export function handleRequest(request) {
    return new Promise (resolve => {
        let imageid = idMaker(6)
        let id = idMaker(6)
    
        let metadata = {
            name: request.image.name,
            size: request.image.size,
            contentType: request.image.type,
        }
    
        uploadBytes(ref(storage, `${imageid}`), request.image, metadata)
            .then(() => {
                setDoc(doc(db, "requests", id), {
                    firstname: request.firstname,
                    lastname: request.lastname,
                    gender: request.gender,
                    birthdate: request.birthdate,
                    mother: request.mother,
                    father: request.father,
                    children: request.children,
                    about: request.about,
                    bornin: request.bornin,
                    diedin: request.diedin,
                    email: request.email,
                    additional: request.additional,
                    imageID: imageid,
                })
                resolve();
            })
    })
}

export function handleContact(contactData) {
    let id = idMaker(6)
    setDoc(doc(db, "contact", id), {
        email: contactData.email,
        subject: contactData.subject,
        content: contactData.content
    })
    return id;
}