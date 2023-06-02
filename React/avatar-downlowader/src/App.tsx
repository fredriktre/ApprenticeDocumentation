import { useState, useEffect } from 'react'
import './index.css'
import { createAvatar } from '@dicebear/core'
import { identicon, lorelei, initials, funEmoji, loreleiNeutral,
        thumbs, adventurer, avataaars, bigEars, bigSmile, bottts,
        botttsNeutral, croodles, croodlesNeutral, icons, micah,
        miniavs, notionists, notionistsNeutral, openPeeps, personas,
        pixelArt, pixelArtNeutral, shapes } from '@dicebear/collection'
import Navigation from './components/Navigation'
import Content from './components/Content'
import Result from './components/Result'
import SettingsEditor from './components/SettingsEditor'
import Footer from './components/Footer'
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOzplhMA5MFIzCIgsImZvo0h3kx4xLUzQ",
  authDomain: "avatarmaker-f6c83.firebaseapp.com",
  projectId: "avatarmaker-f6c83",
  storageBucket: "avatarmaker-f6c83.appspot.com",
  messagingSenderId: "753489126948",
  appId: "1:753489126948:web:fff5061cb0724300275ab1",
  measurementId: "G-PZPR34QBJ1"
};

export interface Settings {
  style: string
  text: string
  rotate: number
  scale: number
  bgActive: string
  bg: string
  flip: string
}

function App() {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',]
  const [settings, setSettings] = useState<Settings>({
    style: "initials",
    text: "",
    rotate: 0,
    scale: 100,
    bgActive: "false",
    bg: "ffffff",
    flip: "false"
  })
  const [showImage, setShowImage] = useState<string>("")
  const [avatar, setAvatar] = useState<any>()
  const [colors, setColors] = useState({
    background: "#222222",
    fontcolor: "#ffffff",
    btncolor: "#ffffff",
    btnfontcolor: "#000000",
    extrasbackground: "#000000",
    extrasfontcolor: "#ffffff"
  })
  const [currTheme, setCurrTheme] = useState<number>(0)

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  useEffect(() => {
    logEvent(analytics, "page_view", {
      language: navigator.language,
      page_title: "avatarmaker",
      page_location: "https://avatarmaker.web.app/"
    })
    console.log("log")
    changeTheme();
  }, [])

  const themes = [
    {
      background: "#0c1401",
      fontcolor: "#f7feeb",
      btncolor: "#23a5f6",
      btnfontcolor: "#0c1401",
      extrasbackground: "#23a5f6",
      extrasfontcolor: "#0c1401"
    }, 
    {
      background: "#0c1401",
      fontcolor: "#f7feeb",
      btncolor: "#f623a5",
      btnfontcolor: "#0c1401",
      extrasbackground: "#f623a5",
      extrasfontcolor: "#0c1401"
    }, 
    {
      background: "#0c1401",
      fontcolor: "#f7feeb",
      btncolor: "#bec2bc",
      btnfontcolor: "#0c1401",
      extrasbackground: "#bec2bc",
      extrasfontcolor: "#0c1401"
    }, 
    {
      background: "#0c1401",
      fontcolor: "#efede7",
      btncolor: "#586184",
      btnfontcolor: "#efede7",
      extrasbackground: "#586184",
      extrasfontcolor: "#efede7"
    }, 
    {
      background: "#05000a",
      fontcolor: "#ffffff",
      btncolor: "#519207",
      btnfontcolor: "#ffffff",
      extrasbackground: "#519207",
      extrasfontcolor: "#ffffff"
    }, 
    {
      background: "#05000a",
      fontcolor: "#ffffff",
      btncolor: "#1b3102",
      btnfontcolor: "#ffffff",
      extrasbackground: "#1b3102",
      extrasfontcolor: "#ffffff"
    }, 
    {
      background: "#09001e",
      fontcolor: "#ffffff",
      btncolor: "#c4fd35",
      btnfontcolor: "#000000",
      extrasbackground: "#c4fd35",
      extrasfontcolor: "#000000"
    }, 
    {
      background: "#080602",
      fontcolor: "#fefdfb",
      btncolor: "#3bc492",
      btnfontcolor: "#000000",
      extrasbackground: "#3bc492",
      extrasfontcolor: "#000000"
    }, 
  ]
  
  function changeTheme () {
    let pickTheme;

    pickTheme = Math.floor(Math.random() * themes.length);

    if (pickTheme === currTheme) {
      changeTheme()
    } else {
      setColors(themes[pickTheme])
      setCurrTheme(pickTheme)
    }
  }

  const handleGenerate = async () => {
    let avatar;   

    let text;
    let flip

    if (settings.flip === "false") {
      flip = false
    } else {
      flip = true
    }

    if (settings.text.length > 0) {
      text = settings.text
    } else {
      for (let i = 0; i < 10; i++) {
        text = `${i > 0 ? text : ""}${alphabet[Math.floor(Math.random() * 61)]}`
      }      
    }

    if (settings.style === "initials") {
      
      avatar = createAvatar(initials, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
      
    } else if (settings.style === "identicon") {

      avatar = createAvatar(identicon, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
      
    } else if (settings.style === "lorelei") {

      avatar = createAvatar(lorelei, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "loreleiNeutral") {

      avatar = createAvatar(loreleiNeutral, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "funEmoji") {

      avatar = createAvatar(funEmoji, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "thumbs") {

      avatar = createAvatar(thumbs, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "adventurer") {

      avatar = createAvatar(adventurer, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "avataaars") {

      avatar = createAvatar(avataaars, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "bigEars") {

      avatar = createAvatar(bigEars, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "bigSmile") {

      avatar = createAvatar(bigSmile, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "bottts") {

      avatar = createAvatar(bottts, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "botttsNeutral") {

      avatar = createAvatar(botttsNeutral, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "croodles") {

      avatar = createAvatar(croodles, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "croodlesNeutral") {

      avatar = createAvatar(croodlesNeutral, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "icons") {

      avatar = createAvatar(icons, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "micah") {

      avatar = createAvatar(micah, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "miniavs") {

      avatar = createAvatar(miniavs, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "notionists") {

      avatar = createAvatar(notionists, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "notionistsNeutral") {

      avatar = createAvatar(notionistsNeutral, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "openPeeps") {

      avatar = createAvatar(openPeeps, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "personas") {

      avatar = createAvatar(personas, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "pixelArt") {

      avatar = createAvatar(pixelArt, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "pixelArtNeutral") {

      avatar = createAvatar(pixelArtNeutral, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    } else if (settings.style === "shapes") {

      avatar = createAvatar(shapes, {
        seed: text,
        rotate: settings.rotate,
        scale: settings.scale,
        backgroundColor: [`${settings.bgActive === "true" ? `${settings.bg.split("#")[1]}` : "transparent"}`],
        flip: flip
      })
  
    }

    if (avatar) {

      const dataURI = await avatar.toDataUri()
      setShowImage(dataURI)
      setAvatar(avatar)
    }

  }

  const handleDownload = async (filetype:string) => {
    let id = ""
    for (let i = 0; i < 10; i++) {
      id = `${i > 0 ? id : ""}${alphabet[Math.floor(Math.random() * 61)]}`
    } 
    
    if (filetype === "png") {
      const png = await avatar.png()
      png.toFile(id)
      logEvent(analytics, "file_download", {
        content_type: "png",
        page_title: "avatarmaker",
        page_location: "https://avatarmaker.web.app/"
      })
    }
    if (filetype === "jpeg") {
      const jpeg = await avatar.jpeg()
      jpeg.toFile(id)
      logEvent(analytics, "file_download", {
        content_type: "jpeg",
        page_title: "avatarmaker",
        page_location: "https://avatarmaker.web.app/"
      })
    }

  }


  return (
    <>
      <Navigation 
        background={colors.extrasbackground} 
        fontcolor={colors.extrasfontcolor}
        btncolor={colors.background}
        btnfontcolor={colors.fontcolor}
        changeTheme={changeTheme} />

      <Content 
        background={colors.background} 
        fontcolor={colors.fontcolor} >
        
        <div className='content-div'>
          <SettingsEditor 
            btncolor={colors.btncolor} 
            btnfontcolor={colors.btnfontcolor}
            settings={settings} 
            setSettings={setSettings} 
            handleGenerate={handleGenerate} />
          {
            showImage.length > 0 &&
            <Result
              btncolor={colors.btncolor}
              btnfontcolor={colors.btnfontcolor}
              showImage={showImage}
              handleDownload={handleDownload} />
          }
        </div>

      </Content>

      <Footer 
        background={colors.extrasbackground} 
        fontcolor={colors.extrasfontcolor}  />
    </>
  )
}

export default App
