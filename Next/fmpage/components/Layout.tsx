import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import useUserStore, { StoreUser } from "@/store/userstore"

interface Props {
    children:ReactNode
    title?:String
}

const Layout = ({children, title}:Props) => {
    const [secondMenuOpen, setSecondMenuOpen] = useState(false);
    const store = useUserStore();
    const [user, setUser] = useState<StoreUser>();

    useEffect(() => {
        if (!store.status) return;
        setUser(store.user);

    }, [store.status])

  return (
    <>
        <Head>
            <title>{title ? title : "Trevland Family"}</title>
        </Head>
        <div className="h-full min-h-screen flex flex-col">        
            <nav className="fixed top-0 z-50 w-full text-md bg-green-800 text-white">
                    <div className="relative bg-green-800 py-4 z-50 flex justify-center items-center gap-5">
                        <Link className="underline decoration-2 underline-offset-2 
                        decoration-transparent hover:decoration-white transition-colors 
                        duration-100" href={'/'}>Home</Link>
                        <button
                        id="burger-menu"
                        aria-label="burger-menu"
                        className="underline decoration-2 underline-offset-2 
                        decoration-transparent hover:decoration-white transition-colors 
                        duration-100" onClick={() => setSecondMenuOpen(!secondMenuOpen)}>
                            <svg className={`${secondMenuOpen ? "hidden" : "block"} w-6 h-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className={`${secondMenuOpen ? "block" : "hidden"} w-6 h-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Link className="underline decoration-2 underline-offset-2 
                        decoration-transparent hover:decoration-white transition-all 
                        duration-100" href={`/auth/${user ? "user" : "login"}`}>{
                            user ? 
                            <div className="p-1 bg-white rounded-lg hover:bg-gray-300 
                            active:bg-gray-600 transition-colors duration-150">
                                <img src={user.avatar} className="w-6 aspect-square" alt="avatar" /> 
                            </div>
                            : "Log in"
                        }</Link>
                    </div>
                    <div className={`absolute bg-green-900 p-4 z-40 ${secondMenuOpen ? "top-full" : "-top-full"} 
                left-1/2 -translate-x-1/2 flex justify-center gap-5 transition-all duration-500 rounded-b-lg border-4 border-green-800`}>
                    <Link className="underline decoration-2 underline-offset-2 
                    decoration-transparent hover:decoration-white transition-colors 
                    duration-100" href={'/family'}>Family</Link>
                    <Link className="underline decoration-2 underline-offset-2 
                    decoration-transparent hover:decoration-white transition-colors 
                    duration-100" href={'/library'}>Library</Link>
                    <Link className="underline decoration-2 underline-offset-2 
                    decoration-transparent hover:decoration-white transition-colors 
                    duration-100" href={'/forum'}>Forum</Link>
                    </div>            
            </nav>
            <main className="bg-gray-200 w-full flex-1 flex flex-col">
                {children}
            </main>
        </div>
    </>
  )
}

export default Layout