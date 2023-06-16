import Layout from "@/components/basic/Layout"
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { FormEvent, useEffect, useState } from "react";
import useUserStore from "@/stores/userstore";
import { User, getAvatar } from ".";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Triangle } from "react-loader-spinner";
import Image from "next/image";

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

type EditInput = {
    email: string,
    username: string,
    password: string,
    newpassword: string,
    confirm: string,
}
type HelpInput = {
    email: string,
    newpassword: string,
    confirm: string,
}
  
const User = ({user}:Props) => {
    const userStore = useUserStore();
    const router = useRouter();
    const [userData, setUserData] = useState<User>()
    const [avatarID, setAvatarID] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<string>("notedit");
    const [hoverImage, setHoverImage] = useState<boolean>(false);
    const [imageChangeModalOpen, setImageChangeModalOpen] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [editInput, setEditInput] = useState<EditInput>({
        email: "",
        username: "",
        password: "",
        newpassword: "",
        confirm: "",
    })
    const [helpInput, setHelpInput] = useState<HelpInput>({
        email: "",
        newpassword: "",
        confirm: "",
    })
    const [passMatch, setPassMatch] = useState({
        matches: true,
        start: false
    })
    const [errorEdit, setErrorEdit] = useState<string>("");

    useEffect(() => {
        if (!user) return
        if (!userStore.status) {
          getAvatar(`${user.avatar}`).then((res:any) => {
            userStore.setUser({
                id: user.id,
                data: {
                    email: user.data.email,
                    name: user.data.name,
                },
                admin: user.admin,
                avatar: res,
            })
            setUserData({
                id: user.id,
                data: {
                    email: user.data.email,
                    name: user.data.name,
                },
                admin: user.admin,
                avatar: res,
            })
            setAvatarID(user.avatar)
        })
        } else {
            setUserData({
                id: userStore.user.id,
                data: {
                    email: userStore.user.data.email,
                    name: userStore.user.data.name,
                },
                admin: userStore.user.admin,
                avatar: userStore.user.avatar,
            })
            setAvatarID(user.avatar)
        }
      }, [user, userStore])

      useEffect(() => {        
        if (!userData) return
        setEditInput({
            email: userData.data.email,
            username: userData.data.name,
            password: "",
            newpassword: "",
            confirm: "",
        })
      }, [userData])
    

    const handleLogout = async () => {
        const res = axios.post("/api/auth/loginout", {
            type: "LOGOUT"
        })
        userStore.logOut();
        userStore.setForRefresh(true);

        setTimeout(() => {
            router.push("/")
        }, 1000)
    }

    const handleImageChange = async (event:any) => {
        setLoading(true)

        try {
            const uploadData = new FormData();
            uploadData.append("file", event.target.files[0])   

            const responseimage = await axios.post("/api/auth/uploadAvatar", uploadData)            

            const response = await axios.post("/api/auth/changeAvatar", {
                type: "WITHFILE",
                avatarID: avatarID,
                file: responseimage.data.data.content[0],
            })
            
            setLoading(false)
            setImageChangeModalOpen(false);
        } catch(error) {
            setLoading(false)
        }
    }

    const handleGenerateNewAvatar = async () => {
        setLoading(true)
        try {
            
            const response = await axios.post("/api/auth/changeAvatar", {
                type: "GENERATE",
                avatarID: avatarID,
            })
            

            setLoading(false)
            setImageChangeModalOpen(false);
        } catch(error) {
            setLoading(false)
        }
    }

    const handleEdit = async (ev:FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setLoading(true)
        
        if (editInput.email.length > 0) {
            if (editInput.username.length > 0) {
                try {
        
                    const response = await axios.post("/api/auth/editUserData", {
                        type: "CHANGE",
                        email: editInput.email,
                        username: editInput.username,
                        password: editInput.password,
                        newpassword: editInput.newpassword,
                        id: userData?.id
                    })
        
                    setEditInput({
                        email: "",
                        username: "",
                        password: "",
                        newpassword: "",
                        confirm: "",
                    })
                    setLoading(false)
                    setErrorEdit("")
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.log(error)
                        if (error.response?.data.error === "Wrong password") {
                            setErrorEdit(error.response?.data.error)
                        }
                        setLoading(false)
                    }
                }
            } else {

            }
        } else {
            
        }
    }
    
    const handleHelp = async (ev:FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setLoading(true)
        try {   
            const response = await axios.post("/api/auth/editUserData", {
                type: "HELPCHANGE",
                email: helpInput.email,
                password: helpInput.newpassword,
            })

            setHelpInput({
                email: "",
                newpassword: "",
                confirm: "",
            })
            setLoading(false)
        } catch (error) {
            if (error instanceof AxiosError) {
                setLoading(false)
                console.log(error)
            }
        }

    }

    const checkPass = (ev:any) => {
        setEditInput({
            email: editInput.email,
            username: editInput.username,
            password: editInput.password,
            newpassword: editInput.newpassword,
            confirm: ev.target.value
        })
        if (ev.target.value != editInput.password) {
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
    const checkHelpPass = (ev:any) => {
        setHelpInput({
            email: helpInput.email,
            newpassword: helpInput.newpassword,
            confirm: ev.target.value
        })
        if (ev.target.value != helpInput.newpassword) {
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

    useEffect(() => {
        if (!currentPage) return
        if (currentPage === "help") return
        setHelpInput({
            email: "",
            newpassword: "",
            confirm: ""
        })

    }, [currentPage])
  return (
    <Layout>

        <div className="w-full h-screen-wnav flex lg:flex-row flex-col justify-center items-center gap-5">

            <div className="bg-c-accent w-fit h-fit p-4 flex flex-col gap-5 items-center rounded-lg">
                <div 
                onMouseEnter={() => setHoverImage(true)} onMouseLeave={() => setHoverImage(false)} onClick={() => setImageChangeModalOpen(true)}
                className={`text-xl bg-c-s-button text-black w-24 relative h-24 rounded-lg border-2 overflow-hidden cursor-pointer
                ${hoverImage ? "border-black" : "border-transparent"} transition-colors duration-300`}>
                    {
                        userData?.avatar &&
                        <Image src={userData.avatar} width={600} height={600} alt="image" className="w-full h-full" />
                    }
                    <span className={`absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    ${hoverImage ? "opacity-100" : "opacity-0"} transition-opacity duration-300 flex justify-center items-center`}>
                    <svg className={`w-6 h-6 relative z-20 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></span>
                  </span>
                </div>
                <h2 className="text-white text-2xl">{userData?.data.name}</h2>
                <div className="flex lg:flex-col flex-row gap-2 w-full">
                    <button type="button" onClick={() => setCurrentPage("notedit")} 
                        className={`w-full mr-auto py-2 px-4 text-lg bg-c-background text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none
                        border-2 ${currentPage === "user" ? "border-c-s-button" : "border-transparent hover:border-c-s-button"} 
                        transition-colors duration-300 rounded-lg`}>
                        User
                    </button>
                    <button type="button" onClick={() => setCurrentPage("edit")} 
                        className={`w-full mr-auto py-2 px-4 text-lg bg-c-background text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none
                        border-2 ${currentPage === "settings" ? "border-c-s-button" : "border-transparent hover:border-c-s-button"} 
                        transition-colors duration-300 rounded-lg`}>
                        Change
                    </button>
                    {
                        userData?.admin &&
                        <button type="button" onClick={() => setCurrentPage("help")} 
                            className={`w-full mr-auto py-2 px-4 text-lg bg-c-background text-c-text 
                            placeholder:text-c-text placeholder:opacity-75 outline-none
                            border-2 ${currentPage === "settings" ? "border-c-s-button" : "border-transparent hover:border-c-s-button"} 
                            transition-colors duration-300 rounded-lg`}>
                            Help
                        </button>
                    }
                    <button type="button" onClick={handleLogout} 
                        className="w-full mr-auto py-2 px-4 text-lg bg-c-background text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none whitespace-nowrap
                        border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg">
                        Log out
                    </button>
                </div>
            </div>

            <div className="bg-c-accent w-fit h-fit p-4 flex flex-col gap-5 items-center rounded-lg">

                {
                    currentPage === "notedit" &&
                    <div className="w-fit relative flex justify-center items-center">
                        <div 
                        className={`md:w-[30rem] sm:w-96 w-72 h-fit p-4 rounded-lg flex flex-col gap-5 shadow-accent
                        ${loading ? "opacity-0 pointer-events-none": "opacity-100 pointer-events-auto"}`}>
                            <h2 className="mr-auto text-white text-2xl">User Info</h2>
                            <p 
                                className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`}
                            >
                                {editInput.email}
                            </p>
                            <p 
                                className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`}
                            >
                                {editInput.username}
                            </p>
                        </div>
                    </div>
                }
                {
                    currentPage === "edit" &&
                    <div className="w-fit relative flex justify-center items-center">
                        <form 
                        onSubmit={handleEdit}
                        className={`md:w-[30rem] sm:w-96 w-72 h-fit p-4 rounded-lg flex flex-col gap-5 shadow-accent
                        ${loading ? "opacity-0 pointer-events-none": "opacity-100 pointer-events-auto"}`}>
                            <h2 className="mr-auto text-white text-2xl">Change user info</h2>
                            <input 
                                type="email"
                                placeholder="Email"
                                className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`}
                                value={editInput.email}
                                    onChange={(ev) => setEditInput({
                                        email: ev.target.value,
                                        username: editInput.username,
                                        password: editInput.password,
                                        newpassword: editInput.newpassword,
                                        confirm: editInput.confirm
                                    })} />
                            <input 
                                type="text"
                                placeholder="Username"
                                className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                                value={editInput.username}
                                onChange={(ev) => setEditInput({
                                    email: editInput.email,
                                    username: ev.target.value,
                                    password: editInput.password,
                                    newpassword: editInput.newpassword,
                                    confirm: editInput.confirm
                                })} />
                            <div className={`w-full ${showPass ? "font-standard" : "font-covered"}`}>
                                <input 
                                    type="text"
                                    placeholder="Password"
                                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text
                                    placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none
                                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                                    value={editInput.password}
                                    onChange={(ev) => setEditInput({
                                        email: editInput.email,
                                        username: editInput.username,
                                        password: ev.target.value,
                                        newpassword: editInput.newpassword,
                                        confirm: editInput.confirm
                                    })} />
                            </div>
                            <div className={`w-full flex gap-5 ${showPass ? "font-standard" : "font-covered"}`}>                    
                                <input 
                                    type="text"
                                    placeholder="New password"
                                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text
                                    placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none 
                                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                                    value={editInput.newpassword}
                                    onChange={(ev) => setEditInput({
                                        email: editInput.email,
                                        username: editInput.username,
                                        password: editInput.password,
                                        newpassword: ev.target.value,
                                        confirm: editInput.confirm
                                    })} />
                                <button type="button" onClick={() => setShowPass(!showPass)} 
                                    className="w-fit p-2 text-lg bg-c-background text-c-text 
                                    placeholder:text-c-text placeholder:opacity-75 outline-none
                                    border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
                            <div className={`w-full ${showPass ? "font-standard" : "font-covered"}`}>
                                <input 
                                    type="text"
                                    placeholder="Confirm new password"
                                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text
                                    placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none
                                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                                    value={editInput.confirm}
                                    onChange={(ev) => checkPass(ev)} />
                            </div>
                            {
                                !passMatch.matches && <p className="text-white border-b-2 border-red-600 w-fit">Password doesn{"'"}t match</p>
                            }
                            <div className="w-full flex gap-5">
                                <button type="submit"
                                    className="w-fit py-2 px-4 text-lg bg-c-background text-c-text outline-none
                                    border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg">
                                    Save
                                </button>
                                {
                                    errorEdit.length > 0 &&
                                    <p className="w-fit py-2 px-4 text-lg bg-c-background text-c-text 
                                     outline-none text-red-600
                                    border-2 border-transparent rounded-lg">{errorEdit}</p>
                                }
                            </div>
                        </form>
                        <div className={`w-fit absolute ${loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                            <Triangle 
                                height={"150"}
                                width={"150"}
                                color="#050505"
                                ariaLabel="triangle-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    </div>
                
                }
                {
                    currentPage === "help" &&
                    <div className="w-fit relative flex justify-center items-center">
                        <form 
                        onSubmit={handleHelp}
                        className={`md:w-[30rem] sm:w-96 w-72 h-fit p-4 rounded-lg flex flex-col gap-5 shadow-accent
                        ${loading ? "opacity-0 pointer-events-none": "opacity-100 pointer-events-auto"}`}>
                            <h2 className="mr-auto text-white text-2xl">Help user change password</h2>
                            <input 
                                type="email"
                                placeholder="Email"
                                className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`}
                                value={helpInput.email}
                                    onChange={(ev) => setHelpInput({
                                        email: ev.target.value,
                                        newpassword: helpInput.newpassword,
                                        confirm: helpInput.confirm
                                    })} />
                            <div className={`w-full flex gap-5 ${showPass ? "font-standard" : "font-covered"}`}>                    
                                <input 
                                    type="text"
                                    placeholder="New password"
                                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text
                                    placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none 
                                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                                    value={helpInput.newpassword}
                                    onChange={(ev) => setHelpInput({
                                        email: helpInput.email,
                                        newpassword: ev.target.value,
                                        confirm: helpInput.confirm
                                    })} />
                                <button type="button" onClick={() => setShowPass(!showPass)} 
                                    className="w-fit p-2 text-lg bg-c-background text-c-text 
                                    placeholder:text-c-text placeholder:opacity-75 outline-none
                                    border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
                            <div className={`w-full ${showPass ? "font-standard" : "font-covered"}`}>
                                <input 
                                    type="text"
                                    placeholder="Confirm new password"
                                    className={`w-full py-2 px-4 text-lg bg-c-background text-c-text
                                    placeholder:text-c-text placeholder:font-standard placeholder:opacity-75 outline-none
                                    border-2 border-transparent focus:border-c-s-button transition-colors duration-300 rounded-lg`} 
                                    value={helpInput.confirm}
                                    onChange={(ev) => checkHelpPass(ev)} />
                            </div>
                            {
                                !passMatch.matches && <p className="text-white border-b-2 border-red-600 w-fit">Password doesn{"'"}t match</p>
                            }
                            <button type="submit"
                                className="w-fit mr-auto py-2 px-4 text-lg bg-c-background text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg">
                                Save
                            </button>
                        </form>
                        <div className={`w-fit absolute ${loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                            <Triangle 
                                height={"150"}
                                width={"150"}
                                color="#050505"
                                ariaLabel="triangle-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    </div>
                
                }

            </div>

            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center transition-opacity duration-300
            ${imageChangeModalOpen ? "opacity-100 pointer-events-auto z-50" : "opacity-0 pointer-events-none -z-50"}`}>
                    <div className={`w-fit h-fit bg-c-accent absolute z-10 rounded-lg p-4 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"} 
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                        <Triangle 
                            height={"150"}
                            width={"150"}
                            color="#ffffff"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                <div className={`w-fit h-fit bg-c-accent p-4 rounded-lg z-10 ${loading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"} `}>
                    <div className={`flex md:flex-row flex-col gap-5 items-center justify-center`}>
                        
                        <h2 className="text-white text-2xl">Are you sure you want to change avatar?</h2>
                        <button onClick={() => handleGenerateNewAvatar()} 
                        className={`md:w-fit w-full py-2 px-4 text-lg bg-c-background hover:bg-c-s-button text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none
                        border-2 border-transparent hover:border-black hover:text-black
                        transition-colors duration-300 rounded-lg`}>Generate new</button>
                        <button
                        className={`md:w-fit w-full py-2 px-4 text-lg bg-c-background hover:bg-green-600 text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none cursor-pointer
                        border-2 border-transparent hover:border-black relative
                        transition-colors duration-300 rounded-lg`}>
                            <input type="file" className={`absolute z-30 top-0 left-0 w-full h-full opacity-0 cursor-pointer`}
                            onChange={(ev) => handleImageChange(ev)} />
                            Yes
                        </button>
                        <button onClick={() => setImageChangeModalOpen(false)} 
                        className={`md:w-fit w-full py-2 px-4 text-lg bg-c-background hover:bg-red-600 text-c-text 
                        placeholder:text-c-text placeholder:opacity-75 outline-none
                        border-2 border-transparent hover:border-black 
                        transition-colors duration-300 rounded-lg`}>No</button>       
                                                    
                    </div>
                    <p className={`text-white md:mt-2 mt-5 md:text-left text-center`}>Avatar will update on next refresh</p>
                </div>
                <span className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></span>
            </div>

        </div>        


    </Layout>
  )
}

export default User