import Layout from "@/components/basic/PublicLayout"
import Link from "next/link";
import { FormEvent, useState } from "react"
import Image from "next/image";

const login = () => {
    const [showPass, setShowPass] = useState<boolean>(false);
    
    
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();


    }

  return (
    <Layout>

        <div className="w-4/5 mx-auto h-full flex justify-center items-center gap-10">
            <div className="bg-teal-100 flex md:flex-row flex-col justify-center items-center gap-10 rounded-xl">
                <form onSubmit={handleSubmit}
                className={`w-full p-4 flex flex-col gap-5`}>

                    <input type="email" className="w-full px-4 py-2 bg-white transition-colors duration-300 outline-none border-b-2 border-r-2 border-black rounded-lg" 
                    placeholder="Email" />
                    <div className="flex gap-5">
                        <input type={`${showPass ? "text" : "password"}`} className="w-full px-4 py-2 bg-white border-b-2 border-r-2 border-black rounded-lg
                        transition-colors duration-300 outline-none" placeholder="Password" />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="p-2 bg-teal-950 hover:bg-teal-800
                        transition-colors duration-300 rounded-xl outline-none text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                {
                                    showPass 
                                    ?
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />

                                    :   <>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </>
                                }
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-5">
                        <button type="submit" className="px-4 py-2 bg-teal-950 border-2 text-white hover:bg-teal-800
                        transition-colors duration-300 rounded-xl outline-none">Log in</button>
                        <Link href={"/register"} className="px-4 py-2 bg-teal-950 text-white hover:bg-teal-800
                        transition-colors duration-300 rounded-xl outline-none"><span className="hidden xl:inline">Not registered?</span> Register here!</Link>
                    </div>
                </form>
                <div className={`bg-blue w-full max-w-md rounded-lg overflow-hidden`}>
                    <Image 
                    src={"/media/images/placeholder.jpg"} 
                    alt={"image"} 
                    width={500} 
                    height={800} />
                </div>                
            </div>
        </div>



    </Layout>
  )
}

export default login