import CardWrapper from "@/components/CardWrapper"
import Layout from "@/components/Layout"
import axios, { Axios, AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const signUp = () => {
    const [userInfo, setUserInfo] = useState({fullName: "", email: "", password: "",});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true)
        axios.post("/api/auth/login", {
            ...userInfo,
            action: "register"
        }).then((response:any) => {
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
                        <input type="text" placeholder="Full name" value={userInfo.fullName} onChange={ev => setUserInfo({fullName: ev.target.value, email: userInfo.email, password: userInfo.password})} className="w-full p-2 bg-gray-950 backdrop-blur-xl placeholder:text-white text-white rounded-md outline-none border-2 border-transparent focus:border-blue-500" />
                        <input type="email" placeholder="Email" value={userInfo.email} onChange={ev => setUserInfo({fullName: userInfo.fullName, email: ev.target.value, password: userInfo.password})} className="w-full p-2 bg-gray-950 backdrop-blur-xl placeholder:text-white text-white rounded-md outline-none border-2 border-transparent focus:border-blue-500" />
                        <input type="password" placeholder="Password" value={userInfo.password} onChange={ev => setUserInfo({fullName: userInfo.fullName, email: userInfo.email, password: ev.target.value})} className="w-full p-2 bg-gray-950 backdrop-blur-xl placeholder:text-white text-white rounded-md outline-none border-2 border-transparent focus:border-blue-500" />
                        <div className="w-full flex justify-start items-center gap-2">
                            <button type="submit" className="p-4 w-1/2 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white">Sign Up</button>
                            <Link href="/auth/signIn" className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white ml-auto">Log in</Link>
                        </div>
                    </form>
                </CardWrapper>
            </div>
        </Layout>
    )
}

export default signUp