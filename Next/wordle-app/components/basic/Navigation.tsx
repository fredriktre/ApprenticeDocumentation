import useStoreUserStore from "@/stores/userstore";
import Link from "next/link"
import { useEffect, useState } from "react"

const Navigation = () => {
    const [avatar, setAvatar] = useState<string>("");
    const userStore = useStoreUserStore()
    
    useEffect(() => {
        if (!userStore.status) return
        setAvatar(userStore.user.avatar)
    }, [userStore.status])

    return (
        <nav className="w-full h-16 fixed text-white flex justify-center items-center">
            <ul className="w-fit flex justify-center items-center gap-5 z-[999]">
                <li><Link href={`/`} className="lua">Home</Link></li>
                <li>
                    {
                        avatar.length > 0 
                        ? <Link href={`/user`} className="lua"><img src={`${avatar}`} className="w-12 h-12 " /></Link>
                        : <Link href={`/auth/login`} className="lua">Log in</Link>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Navigation