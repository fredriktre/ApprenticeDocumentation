import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react";

const Navigation = () => {
  const router = useRouter();
  const [currentBtnHover, setCurrentBtnHover] = useState<number>(0);
  const [userData, setUserData] = useState()

  return (
    <nav className="w-fit h-full bg-c-accent flex flex-col gap-5 p-4 text-c-text">
        <h3 className="text-2xl">TrefTravelVlog</h3>
        <ul className="pt-5 flex flex-col gap-5">
          <li>
            <Link href={"/"} className={`text-xl line-under-link ${router.pathname === "/" && "active"}`}>Home</Link>
          </li>
          <li>
            <Link href={"/about"} className={`text-xl line-under-link ${router.pathname.includes('/about') && "active"}`}>About</Link>
          </li>
          <li>
            <Link href={"/posts"} className={`text-xl line-under-link ${router.pathname.includes('/posts') && "active"}`}>Posts</Link>
          </li>
          <li>
            <Link href={"/contact"} className={`text-xl line-under-link ${router.pathname.includes('/contact') && "active"}`}>Contact</Link>
          </li>
        </ul>

        <div className="pt-5 flex flex-col gap-5">
          {

            <Link 
            onMouseEnter={() => setCurrentBtnHover(1)} onMouseLeave={() => setCurrentBtnHover(0)}
            href={"/auth"} className={`text-xl bg-c-s-button text-black w-full relative h-10 rounded-lg`}>
              <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${currentBtnHover === 1 ? "opacity-0" : "opacity-100"}
              transition-opacity duration-300`}>Log in</p>
              <svg className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${currentBtnHover === 1 ? "opacity-100" : "opacity-0"}
              transition-opacity duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          }
        </div>
    </nav>
  )
}

export default Navigation