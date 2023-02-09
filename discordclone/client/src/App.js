import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Viewport from "./components/Viewport";
import { initializeApp } from "firebase/app"
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { MdLogin } from 'react-icons/md'

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
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  const [loginState, setLoginState] = useState(false);
  const [user, setUser] = useState();
  const [themeColor, setThemeColor] = useState("green-theme");
  const [themeGlow, setThemeGlow] = useState(false);
  const [profileIcon, setProfileIcon] = useState(<MdLogin size="28" />)
  const [iconType, setIconType] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);
  const [uploaded, setUploaded] = useState(false);    

  function changeTheme(theme) {
    setThemeColor(theme);
  }

  function handleLoginClick(){
    setLoginState(!loginState);
    console.log(user)
  }

  const iconPicker = (image) => {
    setProfileIcon(image);
    console.log(profileIcon);
  }

  const uploadImage = (image) => {
    setImageUpload(image)
    
    if (imageUpload == null) return
    
    console.log(imageUpload);
    const imageRef = ref(storage, `profile-icons/123456`)
    uploadBytes(imageRef, imageUpload).then(() => {
        setUploaded(true)
        getDownloadURL(ref(storage, imageRef)).then((downloadURL) => iconPicker(downloadURL))
      })
    };
    
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getDownloadURL(ref(storage, `profile-icons/${currentUser.uid}`))
        .then((downloadURL) => {
          setIconType(true);
          setProfileIcon(downloadURL);
          console.log(downloadURL)
        })
        .catch((error) => {
          console.log(error.message);
        })
    })
  }, [])

  return (
    <div className="relative flex w-full h-full">
      <SideBar 
        iconType={iconType}
        user={user} 
        profileIcon={profileIcon}
        themeColor={themeColor} 
        themeGlow={themeGlow}
        uploaded={uploaded}
        clickHandler={handleLoginClick} 
        setThemeColor={changeTheme} 
        setThemeGlow={setThemeGlow}
        uploadImage={uploadImage} />
      <Viewport 
        themeColor={themeColor} 
        themeGlow={themeGlow} 
        loginState={loginState} 
        name="ServerName"
        uploadImage={uploadImage}
        setIconType={setIconType}>
      </Viewport>
    </div>
  );
}

export default App;