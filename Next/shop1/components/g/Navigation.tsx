import Link from "next/link"
import { useState } from "react"

const Navigation = () => {
    const [categoriesOpen, setCategoriesOpen] = useState(false)

    return (
        <nav className="relative w-full h-16 flex justify-between items-center">

                <div className="relative z-20 bg-emerald-600 flex items-center justify-start w-full h-full pl-4 text-white">
                    <Link href={"/"} className="border-b-2 underline-offset-2 hover:border-white 
                    border-transparent transition-colors duration-150">Atmon Webshop</Link>
                </div>

                <div className="relative z-20 bg-emerald-600 flex gap-5 items-center justify-end w-full h-full pr-4 text-white">
                    <button onClick={() => setCategoriesOpen(!categoriesOpen)} className="border-b-2 underline-offset-2 hover:border-white 
                    border-transparent transition-colors duration-150 flex items-center gap-2"
                    >
                        Categories 
                        <svg className={`w-6 h-6 ${categoriesOpen ? "rotate-180" : "rotate-0"} transition-transform duration-150`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>

                    </button>
                    <Link href={"/auth/register"} className="border-b-2 underline-offset-2 hover:border-white 
                    border-transparent transition-colors duration-150"
                    >Login</Link>
                    <button className="flex justify-center items-center bg-emerald-100 border-4 border-emerald-200 
                            hover:border-emerald-800 p-2 transition-colors duration-150 text-black">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div>

                <div className={`absolute z-10 bg-emerald-700 w-full h-80 ${categoriesOpen ? "top-full" : "-top-80"} 
                left-0 transition-all duration-150`}>

                    <div className="w-full grid grid-cols-2">

                    </div>

                </div>

        </nav>
    )
}

export default Navigation