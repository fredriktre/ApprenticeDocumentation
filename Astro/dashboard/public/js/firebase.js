import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdFS9q93KtukBGJzzgPbnOMzycvSfCRyU",
  authDomain: "dashboard-cef1f.firebaseapp.com",
  projectId: "dashboard-cef1f",
  storageBucket: "dashboard-cef1f.appspot.com",
  messagingSenderId: "883119869769",
  appId: "1:883119869769:web:3884e93b3ebb668356d498",
  measurementId: "G-NWZZXV01SJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
