import Layout from '@/components/basic/Layout'
import React, { FormEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { User } from '..';

type LoginInput = {
    email: string,
    password: string
}

type RegisterInput = {
    email: string,
    username: string,
    password: string,
    confirm: string,
}

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
    user: User | null,
}
  
const Auth = ({user}:Props) => {

    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [user])

    const [loaded, setLoaded] = useState<boolean>(false)
    const [showPassLogin, setShowPassLogin] = useState<boolean>(false)
    const [showPassRegister, setShowPassRegister] = useState<boolean>(false)
    const [loginInput, setLoginInput] = useState<LoginInput>({
        email: "",
        password: ""
    })
    const [registerInput, setRegisterInput] = useState<RegisterInput>({
        email: "",
        username: "",
        password: "",
        confirm: "",
    })
    const [passMatch, setPassMatch] = useState({
        matches: true,
        start: false
    })
    const [regFailed, setRegFailed] = useState<string>("")
    const router = useRouter();

    useEffect(() => {
        setLoaded(true)

        return () => {
            setLoaded(false)
        }
    }, [])


    const handleLogin = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoaded(false)
        try {
            
            const response = await axios.post("/api/auth/loginout", {
                type: "LOGIN",
                email: loginInput.email,
                password: loginInput.password
            })

            router.push("/")
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error)
                setLoaded(true)
                setShowPassLogin(false)
                setShowPassRegister(false)
            }
        }
    }

    const handleRegister = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoaded(false)
        if (passMatch) {
            try {
                const response = await axios.post("/api/auth/register", {
                    email: registerInput.email,
                    username: registerInput.username,
                    password: registerInput.password
                })

                router.push("/")    
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.data.error === "User already exists") {
                        setRegFailed(error.response?.data.error)
                    }
                    console.error(error)
                }
            }
        }
    }

    const checkPass = (ev:any) => {
        setRegisterInput({
            email: registerInput.email,
            username: registerInput.username,
            password: registerInput.password,
            confirm: ev.target.value
        })
        if (ev.target.value != registerInput.password) {
            setPassMatch({
                matches: false,
                start: true
            })
        } else if (ev.target.value.length === 0) {
            setPassMatch({
                matches: true,
                start: false
            })
        } else {
            setPassMatch({
                matches: true,
                start: true
            })
        }
    }

  return (
    <Layout>

        <div className='w-full h-full h-screen-wnav flex flex-col justify-center items-center gap-10 lg:p-10 p-5 pb-20'>

            <form 
            onSubmit={handleLogin}
            className={`xl:w-[50rem] lg:w-3/5 w-11/12 h-fit p-4 bg-c-accent rounded-lg flex flex-col gap-5 shadow-accent`}>
                <h2 className='mr-auto text-white text-2xl'>Log in</h2>
                <input 
                    type="email"
                    placeholder='Email'
                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                    placeholder:text-c-text placeholder:opacity-75 outline-none
                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`}
                    value={loginInput.email}
                    onChange={(ev) => setLoginInput({
                        email: ev.target.value,
                        password: loginInput.password
                    })} />
                <div className={`w-full flex gap-5 ${showPassLogin ? "font-standard" : "font-covered"}`}>
                    <input 
                        type="text"
                        placeholder='Password'
                        className={`w-full py-2 px-4 text-lg bg-c-background text-c-text ${loaded ? "opacity-100" : "opacity-0"}
                        placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none
                        border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`}
                        value={loginInput.password}
                        onChange={(ev) => setLoginInput({
                            email: loginInput.email,
                            password: ev.target.value
                        })} />
                    <button type='button' onClick={() => setShowPassLogin(!showPassLogin)} 
                        className='w-fit p-2 text-lg bg-c-background text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none
                        border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            {
                                showPassLogin 
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                : <>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </>
                            }
                        </svg>
                    </button>
                </div>
                <button type='submit'
                    className='w-fit mr-auto py-2 px-4 text-lg bg-c-background text-c-text 
                    placeholder:text-c-text placeholder:opacity-75 outline-none
                    border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                    Log in
                </button>
            </form>

            <form 
            onSubmit={handleRegister}
            className={`xl:w-[50rem] lg:w-3/5 w-11/12 h-fit p-4 bg-c-accent rounded-lg flex flex-col gap-5 shadow-accent`}>
                <h2 className='mr-auto text-white text-2xl'>Register</h2>
                <input 
                    type="email"
                    placeholder='Email'
                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                    placeholder:text-c-text placeholder:opacity-75 outline-none
                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`}
                    value={registerInput.email}
                        onChange={(ev) => setRegisterInput({
                            email: ev.target.value,
                            username: registerInput.username,
                            password: registerInput.password,
                            confirm: registerInput.confirm
                        })} />
                <input 
                    type="text"
                    placeholder='Username'
                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                    placeholder:text-c-text placeholder:opacity-75 outline-none
                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                    value={registerInput.username}
                    onChange={(ev) => setRegisterInput({
                        email: registerInput.email,
                        username: ev.target.value,
                        password: registerInput.password,
                        confirm: registerInput.confirm
                    })} />
                <div className={`w-full flex gap-5 ${showPassRegister ? "font-standard" : "font-covered"}`}>                    
                    <input 
                        type="text"
                        placeholder="Password"
                        className={`w-full py-2 px-4 text-lg bg-c-background text-c-text ${loaded ? "opacity-100" : "opacity-0"}
                        placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none 
                        border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                        value={registerInput.password}
                        onChange={(ev) => setRegisterInput({
                            email: registerInput.email,
                            username: registerInput.username,
                            password: ev.target.value,
                            confirm: registerInput.confirm
                        })} />
                    <button type='button' onClick={() => setShowPassRegister(!showPassRegister)} 
                        className='w-fit p-2 text-lg bg-c-background text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none
                        border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            {
                                showPassRegister 
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                : <>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </>
                            }
                        </svg>
                    </button>
                </div>
                <div className={`w-full ${showPassRegister ? "font-standard" : "font-covered"}`}>
                    <input 
                        type="text"
                        placeholder='Confirm Password'
                        className={`w-full py-2 px-4 text-lg bg-c-background text-c-text ${loaded ? "opacity-100" : "opacity-0"}
                        placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none
                        border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                        value={registerInput.confirm}
                        onChange={(ev) => checkPass(ev)} />
                </div>
                {
                    regFailed.length > 0 && <p className='text-white border-b-2 border-red-600 w-fit'>{regFailed}</p>
                }
                {
                    !passMatch.matches && <p className='text-white border-b-2 border-red-600 w-fit'>Password doesn't match</p>
                }
                <button type='submit'
                    className='w-fit mr-auto py-2 px-4 text-lg bg-c-background text-c-text 
                    placeholder:text-c-text placeholder:opacity-75 outline-none
                    border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                    Register
                </button>
            </form>

        </div>

    </Layout>
  )
}

export default Auth