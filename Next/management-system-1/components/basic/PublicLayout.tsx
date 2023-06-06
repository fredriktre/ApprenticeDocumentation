import { ReactNode, useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import logo from "@/public/badlogoinv.png"

interface Props {
  children?: ReactNode
  layoutClass?: string
}

const PublicLayout = ({children, layoutClass}:Props) => {
  const [navOpen, setNavOpen] = useState<boolean>(false)

  return (
    <div>
      
      <nav className="fixed z-50 w-full px-8 h-14 flex justify-between items-center">

        <div className="w-fit">
          <Link href={"/"} className="w-fit bg-teal-100 hover:bg-teal-200 px-4 border-r-2 flex gap-2 items-center
          py-2 rounded-lg border-b-2 border-teal-500 hover:border-teal-800 transition-all duration-150">
            <Image src={logo} width={30} height={30} alt="logo" /> <span className="lg:inline hidden">Collaroid</span>
          </Link>
        </div>

        <div className="relative h-full">
          <div onMouseEnter={() => setNavOpen(true)} onMouseLeave={() => setNavOpen(false)} 
          className={`md:relative absolute md:bg-transparent bg-teal-900 md:p-0 p-4 md:top-1/2 md:-translate-y-1/2 
          ${navOpen ? "top-0" : "-top-64"} transition-all duration-150 right-0 z-20 w-fit md:h-full flex md:flex-row 
          flex-col md:items-center items-end gap-5 justify-end rounded-lg`}>
            <Link className="w-fit bg-teal-100 hover:bg-teal-200 px-4 py-2 rounded-lg border-b-2 border-r-2
            border-teal-500 hover:border-teal-800 transition-all duration-150"
            href={"/products"}>Products</Link> 
            <Link className="w-fit bg-teal-100 hover:bg-teal-200 px-4 py-2 rounded-lg border-b-2 border-r-2
            border-teal-500 hover:border-teal-800 transition-all duration-150"
            href={"/documentation"}>Documentation</Link> 
            <Link className="w-fit bg-teal-100 hover:bg-teal-200 px-4 py-2 rounded-lg border-b-2 border-r-2
            border-teal-500 hover:border-teal-800 transition-all duration-150"
            href={"/pricing"}>Pricing</Link> 
            <Link className="w-fit bg-teal-100 hover:bg-teal-200 px-4 py-2 rounded-lg border-b-2 border-r-2
            border-teal-500 hover:border-teal-800 transition-all duration-150"
            href={"/login"}>Log In</Link>
            <div className="absolute md:hidden flex justify-center items-center -bottom-10 right-0 bg-teal-900 w-full h-10 text-white">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </div>
          </div>
        </div>

      </nav>

      <main className={`${layoutClass} w-full h-screen`}>
        {children}
      </main>
    </div>
  )
}

export default PublicLayout