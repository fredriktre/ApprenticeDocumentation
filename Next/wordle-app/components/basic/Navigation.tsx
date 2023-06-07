import Link from "next/link"
import { useState } from "react"

const Navigation = () => {
    const [avatar, setAvatar] = useState<string>("");

    return (
        <nav className="w-full h-16 fixed text-white flex justify-center items-center">
            <ul className="w-fit flex justify-center items-center gap-5 z-[999]">
                <li><Link href={`/`} className="lua">Home</Link></li>
                <li>
                    {
                        avatar.length > 0 
                        ? <Link href={`/user`} className="lua"><img src={avatar} /></Link>
                        : <Link href={`/auth/login`} className="lua">Log in</Link>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Navigation