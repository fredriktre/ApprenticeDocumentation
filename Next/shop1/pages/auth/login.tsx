import Layout from "@/components/g/Layout"
import { FormEvent, useState } from "react"
import Image from "next/image"
import image from "@/public/images/clothes.jpg"
import Link from "next/link"

type LoginInputs = {
    email: string,
    password: string
}

const login = () => {

    const [showPass, setShowPass] = useState<boolean>(false);
    const [loginInput, setLoginInput] = useState<LoginInputs>({
        email: "",
        password: "",
    })
    const [passwordError, setPasswordError] = useState<string>("")
    
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.target)


    }

  return (
    <Layout>
    
            <div className="w-4/5 h-[95vh] mx-auto flex justify-center items-center">
                <div className="flex lg:flex-row flex-col-reverse w-full h-1/2 shadow-2xl">
                    <div className="w-full h-full">
                        <Image 
                            src={image} 
                            width={600} 
                            height={600} 
                            alt="image"
                            className="object-cover h-full w-full" />
                    </div>
                    <form onSubmit={handleSubmit} 
                    className="bg-emerald-600 h-full w-full p-4 flex flex-col gap-5 justify-center">
                        <h1 className="text-4xl text-white">Log in</h1>
                        <input 
                            type="email"
                            className="w-full p-2 bg-emerald-100 text-black placeholder:text-black text-lg
                            outline-none border-4 border-emerald-200 focus:border-emerald-800 transition-colors duration-150"
                            placeholder="Email"
                            value={loginInput.email}
                            onChange={(ev) => setLoginInput({
                                email: ev.target.value,
                                password: loginInput.password
                            })}
                            />
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-5">
                                <input 
                                type={showPass ? "text" : "password"} 
                                className="w-full p-2 bg-emerald-100 text-black placeholder:text-black text-lg
                                outline-none border-4 border-emerald-200 focus:border-emerald-800 transition-colors duration-150"
                                placeholder="Password"
                                value={loginInput.password}
                                onChange={(ev) => setLoginInput({
                                    email: loginInput.email,
                                    password: ev.target.value
                                })} />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="w-fit bg-emerald-100
                                p-2 border-4 border-emerald-200 hover:border-emerald-800 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                      {
                                        showPass 
                                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        : <>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </>
                                        }
                                    </svg>
                                </button>
                            </div>
                            {passwordError.length > 0 && <p className="text-red-600">{passwordError}</p>}
                        </div>
                        <div className="flex gap-5">
                            <button type="submit" className="w-fit bg-emerald-100 
                            p-2 border-4 border-emerald-200 hover:border-emerald-800 transition-colors duration-300">Register</button>
                            <Link className="w-fit bg-emerald-100 
                            p-2 border-4 border-emerald-200 hover:border-emerald-800 transition-colors duration-300"
                            href={"/auth/register"}><span className="md:inline hidden">Not registered?</span> Register here!</Link>
                        </div>
                    </form>                    
                </div>
            </div>

        </Layout>
  )
}

export default login