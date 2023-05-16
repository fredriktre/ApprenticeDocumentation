import Layout from "@/components/Layout"
import useUserStore from "@/store/userstore";
import axios, { AxiosError } from "axios"
import { useRouter } from 'next/router'
import Card from '@/components/Card'
import { useState, useEffect } from "react";
import { GetServerSideProps } from 'next'
import { sessionOptions } from "@/lib/auth/session";
import { getIronSession } from "iron-session";
import Link from "next/link";

interface Props {
    user: {
      id: string
      data: {
        email: string
        fullName: string
      }
      admin: boolean
    } | null,
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

const userPage = ({user}:Props) => {
    const router = useRouter();
    const store = useUserStore();
    const [editUser, setEditUser] = useState(false);
    const [editInfo, setEditInfo] = useState({
        fullName: "", 
        email: "", 
        password: "" 
    })
    const [fromStore, setFromStore] = useState({
        data: {
            email: "",
            fullName: "",
        },
        admin: false
    })

    useEffect(() => {
        if (user != null && store.user.id.length <= 0) {
            store.setUser(user)
            setEditInfo({
                fullName: user.data.fullName,
                email: user.data.email,
                password: editInfo.password
            })            
        }
    }, [])

    useEffect(() => {

        setFromStore({
            data: {
                email: store.user.data.email,
                fullName: store.user.data.fullName,
            },
            admin: store.user.admin
        })
    }, [store.user])

    async function logout() {
        const res = await axios.post('/api/auth/logout');
        store.logOut()
        router.push("/")
    }

    async function handleChange() {
        if (editUser) {
            const oldEmail = store.user.data.email;
            console.log({
                ...editInfo,
                oldEmail
            })
            try {
                const res = await axios.post('/api/auth/changeUserInfo', {
                    ...editInfo,
                    oldEmail
                });
                console.log(res)
                if (res.statusText === "OK") {
                    console.log("ok")
                    store.setUser(res.data.body)
                }
                console.log(res.status)
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error)
                }
            }
        
        }
        
        setEditUser(!editUser)

    }

    async function deleteUser() {

    }

    return (
        <Layout UseNav={true}>
            <section aria-label="User Information Page">
            <Card
            bg="cyan-800"
            bordercolor="cyan-300"
            className="w-4/5 mx-auto flex flex-col gap-5">

                <div className="w-1/2 mr-auto flex flex-col gap-5">
                    {
                        editUser ?
                        <>

                            <input 
                            type="text" 
                            placeholder="Name" 
                            value={editInfo.fullName} 
                            onChange={ev => setEditInfo({
                                fullName: ev.target.value, 
                                email: editInfo.email, 
                                password: editInfo.password})} 
                            className="w-full p-4 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                            text-white rounded-lg outline-none border-2 border-cyan-700 
                            transition-colors duration-300 focus:border-cyan-300" />
                            <input 
                            type="email" 
                            placeholder="Email" 
                            value={editInfo.email} 
                            onChange={ev => setEditInfo({
                                fullName: editInfo.fullName, 
                                email: ev.target.value, 
                                password: editInfo.password})} 
                            className="w-full p-4 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                            text-white rounded-lg outline-none border-2 border-cyan-700 
                            transition-colors duration-300 focus:border-cyan-300" />                            
                            <input 
                            type="password" 
                            placeholder="New Password" 
                            value={editInfo.password} 
                            onChange={ev => setEditInfo({
                                fullName: editInfo.fullName, 
                                email: editInfo.email, 
                                password: ev.target.value})} 
                            className="w-full p-4 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                            text-white rounded-lg outline-none border-2 border-cyan-700 
                            transition-colors duration-300 focus:border-cyan-300" />

                        </>
                        :
                        <>
                            <p className="w-full p-4 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                            text-white rounded-lg outline-none border-2 overflow-hidden
                            transition-colors duration-300 border-cyan-300">Current Name: <span className="whitespace-nowrap">{fromStore.data.fullName}</span></p>
                            <p className="w-full p-4 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                            text-white rounded-lg outline-none border-2 overflow-hidden
                            transition-colors duration-300 border-cyan-300">Current Email: <span className="whitespace-nowrap">{fromStore.data.email}</span></p>                            
                        </>
                    }
                </div>

                <div className="flex gap-5 mr-auto">
                    <button onClick={handleChange} className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">{editUser ? "Save" : "Edit"}</button>
                    {
                        editUser
                        ? <button onClick={deleteUser} className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">Delete User</button>
                        : <button onClick={logout} className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">Log out</button>
                    }
                    { fromStore.admin && <Link href={"/admin"}
                    className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all 
                    duration-75 text-white border-2 border-gray-300">Enter Admin Dashboard</Link>}
                </div>
            </Card>
            </section>
        </Layout>
    )
}

export default userPage