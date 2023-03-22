import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB5Ja1WjHzzxwBfz8j2Nrr3VT2xW2o7xyY",
  authDomain: "minisocials-23a7c.firebaseapp.com",
  projectId: "minisocials-23a7c",
  storageBucket: "minisocials-23a7c.appspot.com",
  messagingSenderId: "546414953981",
  appId: "1:546414953981:web:ce1136eaf9daffe2ef8594"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export function handleStandardLogin(email:string, password:string) {
    return new Promise(resolve => {
        signInWithEmailAndPassword(auth, email, password)
        .then((credentials:any) => {
            resolve(credentials.user)
        })
    })
    
}