import Layout from "@/components/basic/Layout"
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { useEffect, useState } from "react";
import useStoreUserStore from "@/stores/userstore";
import Image from "next/image";
import { getAvatar } from ".";
import axios, { AxiosError } from 'axios'
import { useRouter } from "next/router";

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
    } | null,
  }

  type User = {
    id: string
    data: {
      email: string
      name: string
    }
    admin: boolean
    avatar: string
  }

const user = ({user}:Props) => {
    const userstore = useStoreUserStore();
    const [userData, setUserData] = useState<User>({
        id: "",
        data: {
            email: "",
            name: ""
        },
        admin: false,
        avatar: ""
    });
    const [currentPage, setCurrentPage] = useState<string>("stats")
    const [currentPageHover, setCurrentPageHover] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [passwords, setPasswords] = useState<string>("")
    const router = useRouter();

    useEffect(() => {
        if (!user) return
    
        if (!userstore.status) {
          getAvatar(user.avatar).then((res:string) => {
            userstore.setUser({
              id: user.id,
              data: {
                email: user.data.email,
                name: user.data.name,
              },
              admin: user.admin,
              avatar: res
            })
            setUserData({
              id: user.id,
              data: {
                email: user.data.email,
                name: user.data.name,
              },
              admin: user.admin,
              avatar: res
            })
          })
        } else {
            getAvatar(user.avatar).then((res:string) => {
                setUserData({
                    id: userstore.user.id,
                    data: {
                      email: userstore.user.data.email,
                      name: userstore.user.data.name,
                    },
                    admin: userstore.user.admin,
                    avatar: res
                })
            })            
        }
    }, [user])

    const handleSwitch = (switchTo:string) => {
        setCurrentPage(switchTo)
    }

    const logOut = async () => {
        try {
            userstore.logOut()
            const res = await axios.post("/api/auth/loginout", {type:"LOGOUT"})
            router.push("/")
        } catch(error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }

  return (
    <Layout>

        <div className="w-4/5 h-[95vh] mx-auto flex justify-center items-center">
            <div className="relative w-full h-fit flex justify-center items-stretch gap-5 p-4">
                <div className="w-fit flex flex-col gap-5 relative z-10">
                    <div className="w-full relative">
                        <img src={`${userData.avatar}`} className="w-full aspect-square rounded-lg" />
                        <button className={`${currentPage === "security" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                        `}></button>
                    </div>
                    <p className="text-xl w-full px-4 py-2 bg-white rounded-lg text-center">{userData.data.name}</p>
                    <ul className="flex gap-2 flex-col">
                        <li>
                            <button 
                                onMouseEnter={() => setCurrentPageHover(1)}
                                onMouseLeave={() => setCurrentPageHover(0)}
                                className={`w-full px-4 h-9 ${currentPage === "stats" ? "bg-indigo-100" : "bg-white"} 
                                rounded-lg relative transition-colors duration-300`}
                                onClick={() => handleSwitch("stats")}
                                >
                                    <svg className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    ${currentPageHover === 1 ? "opacity-100" : "opacity-0"} transition-opacity duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    ${currentPageHover === 1 ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>Stats</p>
                            </button>
                        </li>
                        <li>
                            <button 
                                onMouseEnter={() => setCurrentPageHover(2)}
                                onMouseLeave={() => setCurrentPageHover(0)}
                                className={`w-full px-4 h-9 ${currentPage === "security" ? "bg-indigo-100" : "bg-white"} 
                                rounded-lg relative transition-colors duration-300`} 
                                onClick={() => handleSwitch("security")}
                                >
                                    <svg className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    ${currentPageHover === 2 ? "opacity-100" : "opacity-0"} transition-opacity duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    ${currentPageHover === 2 ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>Security</p>
                            </button>
                        </li>
                        <li>
                            <button 
                                onMouseEnter={() => setCurrentPageHover(3)}
                                onMouseLeave={() => setCurrentPageHover(0)}
                                className={`w-full px-4 h-9 bg-violet-950 text-white
                                rounded-lg relative transition-colors duration-300`} 
                                onClick={logOut}
                                >
                                    <svg className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    ${currentPageHover === 3 ? "opacity-100" : "opacity-0"} transition-opacity duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                    ${currentPageHover === 3 ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>Log Out</p>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="w-full relative z-10">
                    <div className="absolute top-0 left-0 w-full h-full flex gap-5">
                        <span className="block w-1 h-full bg-violet-950 rounded-lg"></span>
                        <div className="relative w-full h-full">
                            <div className={`absolute top-0 left-0 w-full h-full ${currentPage === "stats" ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
                            </div>
                            <div className={`absolute top-0 left-0 w-full h-full ${currentPage === "security" ? "opacity-100" : "opacity-0"} transition-opacity duration-300
                            flex flex-col gap-5`}>
                            
                                <form onSubmit={() => console.log(email)} className="flex gap-5">                                    
                                    <input type="email" placeholder="Email" onChange={(ev) => setEmail(ev.target.value)} value={email} 
                                    className="w-full rounded-lg py-2 px-4"/>
                                    <button type="submit" className="w-fit px-4 py-2 bg-violet-950 text-white
                                        rounded-lg relative transition-colors duration-300 whitespace-nowrap">Change</button>
                                </form>

                                <form onSubmit={() => console.log(username)} className="flex gap-5">                                    
                                    <input type="text" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} value={username} 
                                    className="w-full rounded-lg py-2 px-4"/>
                                    <button type="submit" className="w-fit px-4 py-2 bg-violet-950 text-white
                                        rounded-lg relative transition-colors duration-300 whitespace-nowrap">Change</button>
                                </form>

                                <form onSubmit={() => console.log(username)} className="flex flex-col gap-5 mt-5">                                    
                                    <input type="text" placeholder="Password" onChange={(ev) => setUsername(ev.target.value)} value={username} 
                                    className="w-full rounded-lg py-2 px-4"/>
                                    <input type="text" placeholder="New Password" onChange={(ev) => setUsername(ev.target.value)} value={username} 
                                    className="w-full rounded-lg py-2 px-4"/>
                                    <input type="text" placeholder="Confirm New Password" onChange={(ev) => setUsername(ev.target.value)} value={username} 
                                    className="w-full rounded-lg py-2 px-4"/>
                                    <button type="submit" className="w-fit px-4 py-2 bg-violet-950 text-white
                                        rounded-lg relative transition-colors duration-300 whitespace-nowrap">Change</button>
                                </form>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <span className="absolute top-0 left-0 w-full h-full block bg-gradient-to-br from-white to-gray-400 opacity-50 z-0 rounded-lg"></span>
            </div>
        </div>

    </Layout>
  )
}

export default user