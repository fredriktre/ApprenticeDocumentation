import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Viewport from "./components/Viewport";
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, doc, getDocs, collection } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBmll_aD23ex8fRAV9aGt5lKqSQVUff4Go",
  authDomain: "discordclone-7132c.firebaseapp.com",
  databaseURL: "https://discordclone-7132c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "discordclone-7132c",
  storageBucket: "discordclone-7132c.appspot.com",
  messagingSenderId: "285531894251",
  appId: "1:285531894251:web:848fdf99bc7a07a6a329ae"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  const [loginState, setLoginState] = useState(false);
  const [themeColor, setThemeColor] = useState("green-theme");
  const [themeGlow, setThemeGlow] = useState(false);
  const [userName, setUserName] = useState();
  const [profileIcon, setProfileIcon] = useState();
  const [userOn, setUserOn] = useState(false);
  const [iconType, setIconType] = useState(false)
  const [channels, setChannels] = useState([])
  const [channelID, setChannelID] = useState([])
  const [channel, setChannel] = useState([])
  const [messagesContent, setMessagesContent] = useState();

  function channelHandler (channelData) {
    setChannel(channelData)
    setChannelID(channelData.id)
  }

  function getMessages() {
    console.log(channelID)
    const messageRef = collection(`/channels/${channelID}`)
    console.log(messageRef)
    const query = messageRef.orderBy('createdAt').limit(25)
  }

  function putMessage(message) {
    
    // createdAt:
    // message
    // uid
  }

  function changeTheme(theme) {
    setThemeColor(theme);
  }
      
  function handleLoginClick(){
    setLoginState(!loginState);
  }
 
  // doc._document.data.value.mapValue.fields.profileIcon.stringValue
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data != null)
      {
        getDoc(doc(db, 'userinfo', data.uid))
        .then((doc) => { 
          setIconType(true);
          setUserName(doc.data().username)
          setProfileIcon(doc.data().profileIcon)
          setUserOn(true)
        })
        .catch((error) => {
            console.log(error.message)
        })
      } else {
        console.log(data)
      }
    })
    
    const colRef = collection(db, 'channels');
    getDocs(colRef)
      .then((snapshot) => {
        setChannels(snapshot.docs);
        
        snapshot.docs.forEach(element => {
          if (element.data().name === "Main") {
            channelHandler(element)
          }
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
    
  }, [])

  return (
    <div className="relative flex w-full h-full">
      <SideBar 
        iconType={iconType}
        profileIcon={profileIcon}
        themeColor={themeColor} 
        themeGlow={themeGlow}
        userOn={userOn}
        channels={channels}
        clickHandler={handleLoginClick} 
        setThemeColor={changeTheme} 
        setThemeGlow={setThemeGlow}
        channelHandler={channelHandler} />
      <Viewport 
        themeColor={themeColor} 
        themeGlow={themeGlow} 
        loginState={loginState} 
        profileIcon={profileIcon}
        userOn={userOn}
        userName={userName}
        name={channel.name}
        setIconType={setIconType}
        setUserOn={setUserOn}
        setProfileIcon={setProfileIcon}>
      </Viewport>
    </div>
  );
}

export default App;