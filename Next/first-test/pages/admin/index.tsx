import Layout from "@/components/Layout"
import Link from "next/link"
import Card from "@/components/Card"
import { useState } from "react"

const admin = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [extraMenuOpen, setExtraMenuOpen] = useState(0);

  return (
    <Layout>
        <nav className={`relative w-4/5 mx-auto`}>
            <Card
            bg="cyan-800" 
            bordercolor="cyan-300"
            className="flex-col relative z-40">
                <div className="w-full flex lg:flex-row flex-col items-center gap-5">
                    <Link href={"/user"}>
                        <Card 
                        bg="cyan-700" 
                        bordercolor="cyan-300" 
                        className="hover:bg-cyan-600 active:bg-cyan-900 transition-colors duration-300">
                            <p className="text-white font-bruno">Return <span className="lg:inline hidden">to User page</span></p>
                        </Card>
                    </Link>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <Card 
                        bg="cyan-700" 
                        bordercolor="cyan-300" 
                        className="hover:bg-cyan-600 active:bg-cyan-900 transition-colors duration-300">
                            <p className="text-white font-bruno">{menuOpen ? "Close" : "Open"} <span className="lg:inline hidden">Menu</span></p>
                        </Card>
                    </button> 
                </div>            

            </Card>
            <Card
            bg="gray-800" 
            bordercolor="gray-300" 
            className={`absolute w-full ${extraMenuOpen === 0 && "h-[29rem]"} 
            left-0 ${extraMenuOpen === 1 && "h-[29rem]"} ${extraMenuOpen === 2 && "h-[22rem]"}
            ${menuOpen ? "top-40 opacity-100" : "top-0 opacity-0 pointer-events-none"} 
            overflow-hidden z-30 flex-col gap-5 transition-all duration-300`}>
                <div className={`absolute top-5 w-full-cardx flex flex-col gap-5 ${extraMenuOpen === 0 ? "left-5 opacity-100" : "-left-full opacity-0"} transition-all duration-300`}>
                    <Link href={"/admin/general"} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300`}>
                        <p className="text-white sm:text-lg text-md font-bruno">General</p>
                        </Card>
                    </Link>
                    <Link href={"/admin/contact"} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300`}>
                        <p className="text-white sm:text-lg text-md font-bruno">Contact</p>
                        </Card>
                    </Link>
                    <button onClick={() => setExtraMenuOpen(1)} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300 hoverarrow`}>
                            <p className="flex items-center text-white sm:text-lg text-md font-bruno">
                                About 
                                <span className="arrow opacity-0 ml-0 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </p>
                        </Card>
                    </button>
                    <button onClick={() => setExtraMenuOpen(2)} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300 hoverarrow`}>
                            <p className="flex items-center text-white sm:text-lg text-md font-bruno">
                                Portfolio 
                                <span className="arrow opacity-0 ml-0 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </p>
                        </Card>
                    </button>
                </div>

                <div className={`absolute top-5 w-full-cardx flex flex-col gap-5 ${extraMenuOpen === 1 ? "left-5 opacity-100" : "-left-full opacity-0"} transition-all duration-300`}>
                    <button onClick={() => setExtraMenuOpen(0)} className="w-full bg-cyan-700">
                        <Card 
                        bg="cyan-700" 
                        bordercolor="cyan-300" 
                        className={`w-full hover:bg-cyan-600 active:bg-cyan-900 transition-colors duration-300`}>
                            <p className="text-white sm:text-lg text-md font-bruno">Back</p>
                        </Card>
                    </button>
                    <Link href={"/admin/about/education"} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300`}>
                        <p className="text-white sm:text-lg text-md font-bruno">Education</p>
                        </Card>
                    </Link>
                    <Link href={"/admin/about/skills"} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300`}>
                        <p className="text-white sm:text-lg text-md font-bruno">Skills</p>
                        </Card>
                    </Link>
                    <Link href={"/admin/about/plans"} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300`}>
                        <p className="text-white sm:text-lg text-md font-bruno"><span className="lg:inline hidden">Future</span> Plans</p>
                        </Card>
                    </Link>
                </div>

                <div className={`absolute top-5 w-full-cardx flex flex-col gap-5 ${extraMenuOpen === 2 ? "left-5 opacity-100" : "-left-full opacity-0"} transition-all duration-300`}>
                    <button onClick={() => setExtraMenuOpen(0)} className="w-full bg-cyan-700">
                        <Card 
                        bg="cyan-700" 
                        bordercolor="cyan-300" 
                        className={`w-full hover:bg-cyan-600 active:bg-cyan-900 transition-colors duration-300`}>
                            <p className="text-white sm:text-lg text-md font-bruno">Back</p>
                        </Card>
                    </button>
                    <Link href={"/admin/general"} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300`}>
                        <p className="text-white sm:text-lg text-md font-bruno">Add project</p>
                        </Card>
                    </Link>
                    <Link href={"/admin/contact"} className="w-full">
                        <Card 
                        bg="gray-700" 
                        bordercolor="gray-300" 
                        className={`w-full hover:bg-gray-600 active:bg-gray-900 transition-colors duration-300`}>
                        <p className="text-white sm:text-lg text-md font-bruno">Edit project</p>
                        </Card>
                    </Link>
                </div>
                
            </Card>
        </nav>
    </Layout>
  )
}

export default admin