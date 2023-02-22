// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZrWNuDNsy8lZtSVMK7oQMjIv5P1EGz8w",
  authDomain: "querymessenger.firebaseapp.com",
  projectId: "querymessenger",
  storageBucket: "querymessenger.appspot.com",
  messagingSenderId: "870108965933",
  appId: "1:870108965933:web:44872a3457f75e67985ca4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

