import { ReactNode, useEffect, useState } from "react"
import Image from 'next/image'
import Link from "next/link"

interface Props {
  children?: ReactNode
  layoutClass?: string
}

const PublicLayout = ({children, layoutClass}:Props) => {
  const [navMenuOpen, setNavMenuOpen] = useState("");

  return (
    <div>
      
      <nav className="w-full px-8 h-14 flex items-center bg-teal-100">

        <div className="w-1/2">
          <Link href={"/"}>
            <Image src={"next.svg"} width={100} height={100} alt="logo" />
          </Link>
        </div>

        <div className="relative w-1/2 h-full">
          <div className="relative z-20 w-full h-full flex items-center gap-5 justify-end bg-teal-100">
            <Link className="border-b-2 border-transparent hover:border-black transition-colors duration-150" 
            onMouseEnter={() => setNavMenuOpen("products")} onMouseLeave={() => setNavMenuOpen("")} 
            href={"/products"}>Products</Link>
            <Link className="border-b-2 border-transparent hover:border-black transition-colors duration-150" 
            onMouseEnter={() => setNavMenuOpen("doc")} onMouseLeave={() => setNavMenuOpen("")} 
            href={"/documentation"}>Documentation</Link>
            <Link className="border-b-2 border-transparent hover:border-black transition-colors duration-150" 
            onMouseEnter={() => setNavMenuOpen("pricing")} onMouseLeave={() => setNavMenuOpen("")} 
            href={"/pricing"}>Pricing</Link>
            <Link className="border-b-2 border-transparent hover:border-black transition-colors duration-150" 
            href={"/login"}>Log In</Link>
          </div>

          <div
          onMouseEnter={() => setNavMenuOpen("products")} onMouseLeave={() => setNavMenuOpen("")} 
          className={`absolute z-10 ${navMenuOpen === "products" ? "top-14 opacity-100" : "-top-full opacity-0"} 
          left-0 w-full h-20 transition-all duration-300 delay-150 bg-gray-100 p-4 rounded-b-lg`}>
            <h2 className="text-lg">Products</h2>
          </div>
          <div 
          onMouseEnter={() => setNavMenuOpen("doc")} onMouseLeave={() => setNavMenuOpen("")}
          className={`absolute z-10 ${navMenuOpen === "doc" ? "top-14 opacity-100" : "-top-full opacity-0"} 
          left-0 w-full h-20 transition-all duration-300 delay-150 bg-gray-100 p-4 rounded-b-lg`}>
            <h2 className="text-lg">Documentation</h2>
          </div>
          <div 
          onMouseEnter={() => setNavMenuOpen("pricing")} onMouseLeave={() => setNavMenuOpen("")}
          className={`absolute z-10 ${navMenuOpen === "pricing" ? "top-14 opacity-100" : "-top-full opacity-0"} 
          left-0 w-full h-20 transition-all duration-300 delay-150 bg-gray-100 p-4 rounded-b-lg`}>
            <h2 className="text-lg">Pricing</h2>
          </div>
        </div>

      </nav>

      <main className={`${layoutClass} w-full h-[95vh]`}>
        {children}
      </main>
    </div>
  )
}

export default PublicLayout