import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBsE98QSW3iBZSWw7P1VDfFjQmHBF7rpKE",
  authDomain: "chatapp-fc503.firebaseapp.com",
  projectId: "chatapp-fc503",
  storageBucket: "chatapp-fc503.appspot.com",
  messagingSenderId: "822934457443",
  appId: "1:822934457443:web:a532ed041d23ea3ee0fc56"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)