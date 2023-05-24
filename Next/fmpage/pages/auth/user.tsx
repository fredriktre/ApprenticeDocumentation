import Layout from '@/components/Layout'
import useUserStore from '@/store/userstore'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { StoreUser } from '@/store/userstore'
import { getIronSession } from "iron-session";
import { GetServerSideProps } from "next";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { getAvatar } from '..'

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {
    const session = await getIronSession(req, res, sessionOptions);
    const { user } = session;

    return {
      props: {
        user: user || null,
      }
    }
}

interface Props {
    user: {
        id: string
        data: {
          email: string
          name: string
        }
        admin: boolean
        avatar: string
    }   | null,
}

const user = ({user}:Props) => {
    const router = useRouter();
    const store = useUserStore();
    const [userData, setUserData] = useState<StoreUser>();
    const [edit, setEdit] = useState<Boolean>(false);
    const [editEmail, setEditEmail] = useState<String>("");
    const [editName, setEditName] = useState<String>("");
    const [editPassword, setEditPassword] = useState({
        password: "",
        newPass: "",
        confirm: ""
    });
    const [editSeePass, setEditSeePass] = useState<Boolean>(false);
    const [editAvatar, setEditAvatar] = useState<File>();

    useEffect(() => {
        if (!user) return
        if (!store.status) {
            getAvatar(user.avatar).then((response:any) => {
              store.setUser({
                id: user.id,
                data: {
                    email: user.data.email,
                    name: user.data.name,
                },
                admin: user.admin,
                avatar: response.data.data,
              })              
              setUserData({
                id: user.id,
                data: {
                    email: user.data.email,
                    name: user.data.name,
                },
                admin: user.admin,
                avatar: response.data.data,
              })
            })
        } else {
            setUserData(store.user)
        }
    }, [])

    useEffect(() => {
        if (!userData) return;
        setEditEmail(userData.data.email)
        setEditName(userData.data.name)
    }, [userData])

    async function handleLogout() {
        try {
            const response = await axios.post("/api/auth/logout");
            if (response.status === 200) {
                store.logOut()
                router.push("/")
            }
        } catch(error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }

    function handleFileChange(ev: ChangeEvent<HTMLInputElement>) {
        if (ev.target.files) {
          setEditAvatar(ev.target.files[0]);
        }
      }

  return (
    <Layout>
        
        <div className='w-4/5 mx-auto flex flex-col gap-10 mt-20'>
            <div className='p-4 bg-green-800 rounded-lg flex items-center gap-5'>
                <div className="p-1 w-fit bg-white rounded-lg">
                    <img src={userData?.avatar} className="w-28 aspect-square" /> 
                </div>
                <h1 className='text-white'>{userData?.data.name}</h1>
                <button className='ml-auto button-style-1' onClick={() => setEdit(!edit)}>{edit ? "Save" : "Edit"}</button>
            </div>

            {
                edit &&
                <div className='p-4 bg-green-800 rounded-lg flex flex-col gap-5'>
                    <div className='w-full flex gap-5 items-stretch'>
                        <input className='w-full' type={"text"} placeholder={userData?.data.email} value={`${editEmail}`} onChange={ev => setEditEmail(ev.target.value)} />
                        <button className='button-style-1' onClick={() => console.log(`${editEmail}`)}>Save</button>
                    </div>
                    <div className='w-full flex gap-5 items-stretch'>
                        <input className='w-full' type={"text"} placeholder={userData?.data.name} value={`${editName}`} onChange={ev => setEditName(ev.target.value)} />
                        <button className='button-style-1' onClick={() => console.log(`${editName}`)}>Save</button>
                    </div>
                    <div className='w-full flex gap-5 items-stretch'>
                        <input className='w-full' type={editSeePass ? "text" : "password"} placeholder={"Password"} value={`${editPassword.password}`} onChange={ev => setEditPassword({
                            password: ev.target.value,
                            newPass: editPassword.newPass,
                            confirm: editPassword.confirm
                        })} />
                        <input className='w-full' type={editSeePass ? "text" : "password"} placeholder={"New Password"} value={`${editPassword.newPass}`} onChange={ev => setEditPassword({
                            password: editPassword.password,
                            newPass: ev.target.value,
                            confirm: editPassword.confirm
                        })} />
                        <input className='w-full' type={editSeePass ? "text" : "password"} placeholder={"Confirm New Password"} value={`${editPassword.confirm}`} onChange={ev => setEditPassword({
                            password: editPassword.password,
                            newPass: editPassword.newPass,
                            confirm: ev.target.value
                        })} />
                        <button className='button-style-1' onClick={() => setEditSeePass(!editSeePass)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            {
                              editSeePass 
                              ?
                              <>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                              </>
                              :
                              <>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </> 
                            }
                            </svg>
                        </button>
                        <button className='button-style-1' onClick={() => console.log(`${editPassword.password} + ${editPassword.newPass} + ${editPassword.confirm}`)}>Save</button>
                    </div>
                    <div className='w-full flex gap-5 items-stretch'>
                        <div className="relative w-fit cursor-pointer flex justify-center items-center button-style-1">
                            <input
                            onChange={handleFileChange} 
                            className="absolute w-full h-full top-0 left-0 opacity-0 p-0 border-0 cursor-pointer" 
                            type="file" 
                            name="file" 
                            accept=".png,.jpg,.jpeg" />
                            <p className='whitespace-nowrap'>Import Image</p>
                        </div>
                        <div className='bg-white px-4 py-2 rounded-lg w-full'>
                            <p>{editAvatar ? editAvatar.name : "Add an image to change avatar!"}</p>
                        </div>
                        <button className='button-style-1' onClick={() => console.log(editAvatar)}>Save</button>
                    </div>

                </div>
            }

            <div className='p-4 bg-green-800 rounded-lg flex justify-start items-center gap-5'>
              <button type="button" onClick={handleLogout} className="button-style-1">Log Out</button>
              { userData?.admin && <Link href={"/admin"} className="button-style-1">Admin Dashboard</Link> }
            </div>
        </div>        

    </Layout>
  )
}

export default user