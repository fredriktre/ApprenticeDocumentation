import Card from "@/components/Card";
import CardWrapper from "@/components/CardWrapper"
import Layout from "@/components/Layout"
import { useState, FormEventHandler } from "react";
import { IoLogoGoogle } from "react-icons/io";
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { useRouter } from "next/router";

const Auth = () => {
    const [userInfo, setUserInfo] = useState({email: "", password: ""})
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("start")
        setLoading(true)

        axios.post("/api/auth/login", userInfo).then((response:any) => {
            console.log(response);
            setLoading(false)
            router.push("/")
        }).catch((error) => {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
            }
            setLoading(false)
        });
        
    }

    return (
        <Layout>
            <div className="w-full min-h-[80rem] flex justify-center items-center flex-col gap-4">
                <CardWrapper className="w-1/2">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input type="email" placeholder="Email" value={userInfo.email} onChange={ev => setUserInfo({email: ev.target.value, password: userInfo.password})} className="w-full p-2 bg-gray-950 backdrop-blur-xl placeholder:text-white text-white rounded-md outline-none border-2 border-transparent focus:border-blue-500" />
                        <input type="password" placeholder="Password" value={userInfo.password} onChange={ev => setUserInfo({email: userInfo.email, password: ev.target.value})} className="w-full p-2 bg-gray-950 backdrop-blur-xl placeholder:text-white text-white rounded-md outline-none border-2 border-transparent focus:border-blue-500" />
                        <div className="w-full flex justify-start items-center gap-2">
                        {/* <button type="button" onClick={() => setRemember(!remember)} className={`${remember ? "bg-blue-600 rounded-md hover:bg-blue-500 active:bg-blue-700" : "bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black"} text-white p-4 w-fit`}>Remember me?</button> */}
                            <button type="submit" className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white">Log In</button>
                            <Link href="/auth/signUp" className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white ml-auto">Sign Up</Link>
                        </div>
                    </form>
                </CardWrapper>
                {/* <CardWrapper className="w-1/2">
                    <button className="p-2 mr-auto text-4xl bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white" onClick={() => console.log("hi")}><IoLogoGoogle /></button>
                </CardWrapper> */}
                
            </div>
        </Layout>
    )

}

export default Auth