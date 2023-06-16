import { User } from "@/pages";
import useUserStore from "@/stores/userstore";
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const Navigation = () => {
  const router = useRouter();
  const [currentBtnHover, setCurrentBtnHover] = useState<number>(0);
  const [userData, setUserData] = useState<User>({
    id: "",
    data: {
      email: "",
      name: "",
    },
    admin: false,
    avatar: ""
  })
  const userStore = useUserStore();

  useEffect(() => {
    if (!userStore.status) {
      setUserData({
        id: "",
        data: {
          email: "",
          name: "",
        },
        admin: false,
        avatar: ""
      })
    } else {
      setUserData({
        id: userStore.user.id,
        data: {
          email: userStore.user.data.email,
          name: userStore.user.data.name,
        },
        admin: userStore.user.admin,
        avatar: userStore.user.avatar
      })
    }

    
  }, [userStore])

  return (
    <nav className="fixed left-0 top-0 md:w-52 w-full md:h-screen text-c-text">
      <div className="bg-c-accent-with-opacity-gradient w-full h-full pr-12 flex flex-col md:justify-between md:gap-0 gap-2 p-4">
        <div>
          <h3 className="text-2xl">TrefTravelVlog</h3>
          <ul className="md:pt-5 pt-2 flex md:flex-col flex-row gap-5 overflow-x-auto">
            <li>
              <Link href={"/"} className={`text-xl line-under-link ${router.pathname === "/" && "active"}`}>Home</Link>
            </li>
            <li>
              <Link href={"/about"} className={`text-xl line-under-link ${router.pathname.includes('/about') && "active"}`}>About</Link>
            </li>
            <li>
              <Link href={"/posts"} className={`text-xl line-under-link ${router.pathname.includes('/posts') && "active"}`}>Posts</Link>
            </li>
            {/* {
              router.pathname === "/" &&
              <li>
                <Link href={"#contact"} className={`text-xl line-under-link`}>Contact</Link>
              </li>
            } */}
          </ul>
        </div>

        <div className="relative md:pt-5 flex md:flex-col gap-5">
          {
            userData.id.length > 0 &&
            userData.admin &&
            router.pathname.includes("/posts") &&
            <Link onMouseEnter={() => setCurrentBtnHover(2)} onMouseLeave={() => setCurrentBtnHover(0)}
            href={"/posts/new"} className={`relative bottom-0 text-xl bg-c-s-button border-2 ${router.pathname.includes('/posts/new') ? "border-black" : "border-transparent"} text-black 
              w-16 h-16 rounded-lg`}>
              <svg className={`w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${currentBtnHover === 2 ? "opacity-0" : "opacity-100"}
              transition-opacity duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>

              <svg className={`w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${currentBtnHover === 2 ? "opacity-100" : "opacity-0"}
              transition-opacity duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          }
          {
            userData.id.length > 0 ?

            <Link 
            onMouseEnter={() => setCurrentBtnHover(1)} onMouseLeave={() => setCurrentBtnHover(0)}
            href={"/user"} className={`text-xl bg-c-s-button text-black w-16 relative h-16 rounded-lg border-2 overflow-hidden
            ${router.pathname.includes('/user') ? `border-black` : `${currentBtnHover === 1 ? "border-black" : "border-transparent"}`} transition-colors duration-300 `}>
              <Image src={userData?.avatar} alt="avatar" width={300} height={300} className="w-full h-full" />
              <span className={`absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              ${currentBtnHover === 1 ? "opacity-100" : "opacity-0"} transition-opacity duration-300 flex justify-center items-center`}>
                <svg className={`w-10 h-10 relative z-20 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></span>
              </span>
            </Link>

            : <Link 
            onMouseEnter={() => setCurrentBtnHover(1)} onMouseLeave={() => setCurrentBtnHover(0)}
            href={"/auth"} className={`relative bottom-0 text-xl bg-c-s-button border-2 ${router.pathname.includes('/auth') ? "border-black" : "border-transparent"} text-black 
              md:w-full w-32 h-10 rounded-lg`}>
              <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${currentBtnHover === 1 ? "opacity-0" : "opacity-100"}
              transition-opacity duration-300`}>Log in</p>
              <svg className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${currentBtnHover === 1 ? "opacity-100" : "opacity-0"}
              transition-opacity duration-300`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          }
        </div>
      </div>
      <div className="absolute h-full w-12 top-0 -right-12">
          <span className="absolute top-0 left-0 w-full h-full wone">
            <Image loading="eager" src={"/cwave.png"} width={1000} height={1000} alt="image" className="h-[150%] w-full opacity-50" />
            <Image loading="eager" src={"/cwave.png"} width={1000} height={1000} alt="image" className="h-[150%] w-full opacity-50" />
          </span>
          <span className="absolute top-0 left-0 w-full h-full wtwo">
            <Image loading="eager" src={"/cwave.png"} width={1000} height={1000} alt="image" className="h-[150%] w-full opacity-40" />
            <Image loading="eager" src={"/cwave.png"} width={1000} height={1000} alt="image" className="h-[150%] w-full opacity-40" />
          </span>
          <span className="absolute top-0 left-0 w-full h-full wtree">
            <Image loading="eager" src={"/cwave.png"} width={1000} height={1000} alt="image" className="h-[150%] w-full opacity-60" />
            <Image loading="eager" src={"/cwave.png"} width={1000} height={1000} alt="image" className="h-[150%] w-full opacity-60" />
          </span>
      </div>
    </nav>
  )
}

export default Navigation