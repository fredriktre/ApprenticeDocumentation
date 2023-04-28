import Link from "next/link"

const Navigation = () => {
  return (
    <nav className="w-full h-14 bg-black flex justify-center items-center">

        <ul>
            <Link href={"/"} className={`text-white`}>Home</Link>
        </ul>

    </nav>
  )
}

export default Navigation