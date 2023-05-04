import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navigation = () => {
  const router = useRouter();  

  useEffect(() => {
    

    return () => {
    }
  }, [])
  

  return (
    <nav className="w-full h-20 bg-black top-0 flex justify-center items-center">
        <ul className={`flex gap-2 relative transition-all duration-1000`}>
            <Link href={"/"} className={`text-white text-xl ${router.pathname === '/' 
            ? 'underline underline-offset-4 decoration-white decoration-2' 
            : 'underline underline-offset-4 decoration-transparent hover:decoration-gray-200 decoration-2 transition-all duration-150'}`}>
                Home</Link>
            <Link href={"/posts"} className={`text-white text-xl ${router.pathname.includes('/posts') 
            ? 'underline underline-offset-4 decoration-white decoration-2' 
            : 'underline underline-offset-4 decoration-transparent hover:decoration-white decoration-2 transition-all duration-150'}`}>
                Posts</Link>
            {/* {
              username 
              ? <Link href={"/auth/user"} className={`text-white text-xl ${router.pathname.includes('/auth') 
              ? 'underline underline-offset-4 decoration-white decoration-2' 
              : 'underline underline-offset-4 decoration-transparent hover:decoration-white decoration-2 transition-all duration-150'}`}>
                {username}</Link>
              
              : <Link href={"/auth/signIn"} className={`text-white text-xl ${router.pathname.includes('/auth') 
              ? 'underline underline-offset-4 decoration-white decoration-2' 
              : 'underline underline-offset-4 decoration-transparent hover:decoration-white decoration-2 transition-all duration-150'}`}>
                Log in</Link>
            } */}
        </ul>
    </nav>
  )
}

export default Navigation