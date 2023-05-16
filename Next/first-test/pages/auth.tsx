import Card from "@/components/Card"
import Layout from "@/components/Layout"
import axios, { Axios, AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const auth = () => {
    const [userUpInfo, setUserUpInfo] = useState({fullName: "", email: "", password: "",});
    const [userInInfo, setUserInInfo] = useState({email: "", password: ""})
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true)
        axios.post("/api/auth/register", userUpInfo).then((response:any) => {
            setLoading(false)
            router.push("/")
        }).catch((error) => {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
            }
            setLoading(false)
        });
        
    }

    const handleInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)

        axios.post("/api/auth/login", userInInfo).then((response:any) => {
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
            <section aria-label="Authorization" className="w-4/5 mx-auto flex lg:flex-row flex-col lg:gap-5 gap-10">
                <Card 
                    bg="cyan-800"
                    bordercolor="cyan-300"
                    className="w-4/5 mx-auto flex flex-col gap-5">
                    <h2 className="mr-auto">Register</h2>
                    <form onSubmit={handleUpSubmit} className="w-full flex flex-col gap-2">
                        <input 
                        type="text" 
                        placeholder="Name" 
                        value={userUpInfo.fullName} 
                        onChange={ev => setUserUpInfo({
                            fullName: ev.target.value, 
                            email: userUpInfo.email, 
                            password: userUpInfo.password})} 
                        className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                        text-white rounded-md outline-none border-2 border-cyan-700
                        transition-colors duration-300 focus:border-cyan-300" />
                        <input 
                        type="email" 
                        placeholder="Email" 
                        value={userUpInfo.email} 
                        onChange={ev => setUserUpInfo({
                            fullName: userUpInfo.fullName, 
                            email: ev.target.value, 
                            password: userUpInfo.password})} 
                        className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                        text-white rounded-md outline-none border-2 border-cyan-700 
                        transition-colors duration-300 focus:border-cyan-300" />
                        <input 
                        type="password" 
                        placeholder="Password" 
                        value={userUpInfo.password} 
                        onChange={ev => setUserUpInfo({
                            fullName: userUpInfo.fullName, 
                            email: userUpInfo.email, 
                            password: ev.target.value})} 
                        className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                        text-white rounded-md outline-none border-2 border-cyan-700 
                        transition-colors duration-300 focus:border-cyan-300" />

                        <button type="submit" className="mt-3 px-4 py-2 w-fit bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">Register</button>
                    </form>
                </Card>

                <Card 
                    bg="cyan-800"
                    bordercolor="cyan-300"
                    className="w-4/5 mx-auto flex flex-col gap-5">
                    <h2 className="mr-auto">Log in</h2>
                    <form onSubmit={handleInSubmit} className="w-full flex flex-col gap-2">
                        <input 
                        type="email" 
                        placeholder="Email" 
                        value={userInInfo.email} 
                        onChange={ev => 
                            setUserInInfo({
                                email: ev.target.value, 
                                password: userInInfo.password
                            })} 
                        className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                        text-white rounded-md outline-none border-2 border-cyan-700 transition-colors 
                        duration-300 focus:border-cyan-300" />

                        <input 
                        type="password" 
                        placeholder="Password" 
                        value={userInInfo.password} 
                        onChange={ev => 
                            setUserInInfo({
                                email: userInInfo.email, 
                                password: ev.target.value
                            })} 
                        className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white
                        text-white rounded-md outline-none border-2 border-cyan-700 transition-colors
                        duration-300 focus:border-cyan-300" />

                        <button type="submit" className="mt-3 px-4 py-2 w-fit bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">Log In</button>
                    </form>                
                </Card>
            </section>
        </Layout>
    )
}

export default auth