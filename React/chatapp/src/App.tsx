import './App.css'
import { FormEvent, useEffect, useState } from 'react'
import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import { auth, db } from './lib/fbdb_config'
import { createAvatar } from "@dicebear/core"
import { botttsNeutral } from "@dicebear/collection"
import { characters, items } from './lib/samples'

type User = {
  uid: string,
  name: string,
  avatar: string,
}

type Message = {
  username: string,
  useravatar: string,
  message: string,
  time: string
}

type Input = {
  message: string,
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData]= useState<User>();
  const [userLoginModalOpen, setUserLoginModalOpen] = useState<boolean>(true);
  const [loginInput, setLoginInput] = useState<any>({
    email: "",
    password: "",
  })
  const [editInput, setEditInput] = useState<any>({
    email: "",
    username: "",    
    password: "",
    confirm: "",
  })
  const [messageInput, setMessageInput] = useState<Input>({
    message: "",
  })
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    // onAuthStateChanged(auth, (user:any) => {
    //   if (user) {
    //     console.log(user)
    //     // setUserLoginModalOpen(false)
    //   } else {
    //     // setUserLoginModalOpen(true)
    //   }
    // })
    
  }, [])

  const handleSendMessage = async () => {
    
  }

  const handleLogin = async (ev:FormEvent<HTMLFormElement>) => {
    setLoading(true)
    ev.preventDefault();

      signInWithEmailAndPassword(
        auth,
        loginInput.email,
        loginInput.password
      ).then((userCredential:any) => {
        // setUserData
        console.log(userCredential)

      }).catch((error) => {
        console.log(error.message)
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          handleRegister();
        } else {
          setLoading(false)
          console.error("failed")
        }
      })

  }

  const handleRegister = async () => {
    console.log("registering instead")

    createUserWithEmailAndPassword(
      auth,
      loginInput.email,
      loginInput.password
    ).then((userCredential:any) => {
      console.log(userCredential)

      let seed = `${items[Math.floor(Math.random() * items.length)]}`;
      const r = Math.floor(Math.random() * 256) 
      const g = Math.floor(Math.random() * 256) 
      const b = Math.floor(Math.random() * 256) 
      const hex = `${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

      for (let i = 0; i < 12; i++) {
        seed = `${seed}${characters[Math.floor(Math.random() * characters.length)]}`
      }

      const avatar = createAvatar(botttsNeutral, {
        seed: seed,
        backgroundColor: [hex]
      })

      const avatarURI = avatar.toDataUriSync();

      const data = {
        avatar: avatarURI,
        name: seed
      }

      setDoc(doc(db, "users", userCredential.uid), data).then((response) => {
        setUserData({
          uid: userCredential.uid,
          name: data.name,
          avatar: data.avatar,
        })
        setLoading(false)
        setUserLoginModalOpen(false)
      }).catch((error) => {
        console.error( error )
      })
      
    }).catch((error) => {
      console.log(error.message)
      setLoading(false)
    })
  }

  const handleEdit = async () => {

  }

  return (
    <div className='relative w-full h-full bg-gray-800 flex justify-center items-center'>

      <div className='w-4/5 h-4/5 bg-black rounded-xl
      flex flex-col gap-5 p-4'>

        <div className='w-full h-full'>
          {
            messages.map((message:Message, index:number) => {
             
              return (
                <div className='w-full h-full rounded-xl bg-gray-900 text-white'>
                  
                </div>
              )

            })
          }
        </div>
        <div className='w-full h-fit flex gap-5'>
          <input type='text' value={messageInput.message}
          onChange={(ev) => setMessageInput({
            message: ev.target.value,
          })}
          className='w-full px-4 py-2 bg-gray-900 rounded-xl
          placeholder:text-gray-500 text-white outline-none
          border-2 border-transparent focus:border-white
          transition-all duration-150'
          placeholder='Message goes here!' />
          <button onClick={() => handleSendMessage()}
          className='w-fit bg-gray-900 rounded-xl
          py-2 px-4 text-white border-2 border-transparent
          hover:border-white transition-all duration-150'>Send</button>
        </div>

      </div>

      <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center
      ${userLoginModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <form onSubmit={handleLogin}
          className='flex flex-col gap-5 md:w-3/5 w-4/5 h-fit'>

            <input type='email' required value={loginInput.email}
            onChange={(ev) => setLoginInput({
              email: ev.target.value,
              password: loginInput.password,
            })}
            className='relative z-50 w-full px-4 py-2 bg-gray-900 rounded-xl
            placeholder:text-gray-500 text-white outline-none
            border-2 border-transparent focus:border-white
            transition-all duration-150'
            placeholder='Email' />

            <input type='password' required value={loginInput.password}
            onChange={(ev) => setLoginInput({
              email: loginInput.email,
              password: ev.target.value,
            })}
            className='relative z-50 w-full px-4 py-2 bg-gray-900 rounded-xl
            placeholder:text-gray-500 text-white outline-none
            border-2 border-transparent focus:border-white
            transition-all duration-150'
            placeholder='Password' />

            <button type='submit'
            className='relative z-50 w-fit bg-gray-900 rounded-xl
            py-2 px-4 text-white border-2 border-transparent
            hover:border-white transition-all duration-150'>Send</button>
          </form>

          <span className='block z-40 absolute top-0 left-0 w-full h-full bg-black opacity-70'></span>
      </div>
    </div>
  )
}

export default App
