import Card from "@/components/Card"
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
        axios.post("/api/auth/register", userInfo).then((response:any) => {
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
        <Layout UseNav={true}>
            <Card 
                bg="bg-cyan-800"
                bordercolor="border-cyan-300"
                className="w-4/5 mx-auto flex justify-center items-center flex-col gap-4">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                    <input 
                    type="text" 
                    placeholder="Full name" 
                    value={userInfo.fullName} 
                    onChange={ev => setUserInfo({
                        fullName: ev.target.value, 
                        email: userInfo.email, 
                        password: userInfo.password})} 
                    className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                    text-white rounded-md outline-none border-2 border-cyan-700
                    transition-colors duration-300 focus:border-cyan-300" />
                    <input 
                    type="email" 
                    placeholder="Email" 
                    value={userInfo.email} 
                    onChange={ev => setUserInfo({
                        fullName: userInfo.fullName, 
                        email: ev.target.value, 
                        password: userInfo.password})} 
                    className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                    text-white rounded-md outline-none border-2 border-cyan-700 
                    transition-colors duration-300 focus:border-cyan-300" />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value={userInfo.password} 
                    onChange={ev => setUserInfo({
                        fullName: userInfo.fullName, 
                        email: userInfo.email, 
                        password: ev.target.value})} 
                    className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                    text-white rounded-md outline-none border-2 border-cyan-700 
                    transition-colors duration-300 focus:border-cyan-300" />
                    <div className="w-full flex justify-start items-center gap-2">
                        <button type="submit" className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">Sign Up</button>
                        <Link href="/signIn" className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">Already have a user? Sign in here!</Link>
                    </div>
                </form>
            </Card>
        </Layout>
    )
}

export default signUp