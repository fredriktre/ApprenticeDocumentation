console.log("%cmain.js active", "background: blue; padding: 0.5rem 1rem; margin: 0.5rem 0; border-radius: 0.5rem; color:white; font-size: 1rem; font-weight: bold");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage, ref as Sref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEruyTdG5v-rkNC8xT_bWf_xyS3CSLE50",
  authDomain: "imagearchive-88727.firebaseapp.com",
  projectId: "imagearchive-88727",
  storageBucket: "imagearchive-88727.appspot.com",
  messagingSenderId: "446207422723",
  appId: "1:446207422723:web:b98c19827ef4c957e1b936",
  measurementId: "G-WHE9SBKWS3"
};
      
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getDatabase(app);

const handleOnMouseMove = e => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    
    target.style.setProperty("--mouse-x", `${x}px`)
    target.style.setProperty("--mouse-y", `${y}px`)
}

const handleOnClick = e => {
    console.log(e.target.id)
}

if (window.location.href.indexOf("index") > - 1) {
    document.querySelector(".images").onmousemove = e => {
        for (const card of document.querySelectorAll(".card")) {  
            const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
    
            
            card.style.setProperty("--mouse-x", `${x}px`)
            card.style.setProperty("--mouse-y", `${y}px`)
        }
    }
}

const createCard = (id, src, container) => {
    const card = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardBorder = document.createElement("div");
    const cardImage = document.createElement("img");
    
    card.classList.add("card");
    card.id = id;
    cardContent.classList.add("card-content");
    cardBorder.classList.add("card-border");
    cardImage.src = `${src}`;
    cardContent.append(cardImage);
    card.append(cardContent);
    card.appendChild(cardBorder);
    container.append(card);
}

function makeID (length) {
    let id = "f";
    for (let i = 0; i < length; i++) {
      id = `${id}${idCharacters[Math.floor(Math.random() * idCharacters.length)]}`
    }
    return id
  }


function loadPage () {
    createCard(1, "./assets/1.jpg", document.querySelector(".images"));

    for (const card of document.querySelectorAll(".card")) {
        card.onmousemove = e => handleOnMouseMove(e);
    }
    
    for (const card of document.querySelectorAll(".card")) {
        card.onclick = e => handleOnClick(e);
    }
}

function createUpload () {

}

if (window.location.href.indexOf("Auth") > - 1) {document.getElementById("auth").addEventListener("submit", (event) => handleAuth(event));}

function handleAuth (event) {
    event.preventDefault();

    const password = ["te", "st", "er"]
    const passed0 = false;
    const passed1 = false;
    const passed2 = false;

    for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].tagName === "INPUT") {
            const input = event.target[i].value;
            if (input === password[i]) {
                console.log("match " + i)
                if (i === 0) {
                    passed0 = true;
                } else if (i === 1) {
                    passed1 = true;
                } else if (i === 2) {
                    passed2 = true;
                }
            } else {
                if (i === 0) {
                    passed0 = false;
                } else if (i === 1) {
                    passed1 = false;
                } else if (i === 2) {
                    passed2 = false;
                }
            }
        }
    }
}