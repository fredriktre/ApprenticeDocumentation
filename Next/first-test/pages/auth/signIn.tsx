import Card from "@/components/Card";
import CardWrapper from "@/components/CardWrapper"
import Layout from "@/components/Layout"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, FormEventHandler } from "react";
import { IoLogoGoogle } from "react-icons/io";

const Auth = () => {
    const { data: session } = useSession()
    const [userInfo, setUserInfo] = useState({email: "", password: ""})

    const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        // await signIn("")
    }

    console.log(!!session)
    return (
        <Layout>
            <div>
                <CardWrapper>
                    <Card>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input type="email" value={userInfo.email} />
                            <input type="password" value={userInfo.password} />
                            <button type="submit">Log In</button>
                        </form>
                    </Card>
                    <div>
                        <button className="p-2 text-4xl bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white" onClick={() => signIn('google')}><IoLogoGoogle /></button>
                    </div>
                </CardWrapper>
            </div>
        </Layout>
    )

}

export default Auth