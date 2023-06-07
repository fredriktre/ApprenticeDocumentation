import { ReactNode } from "react"
import Navigation from "./Navigation"

interface Props {
    children?: ReactNode
}

const Layout = ({children}:Props) => {
  return (
    <>

        <Navigation />

        <main className="min-h-screen h-full bg-gradient-to-b from-black to-indigo-950 pt-16">
            {children}
        </main>

    </>
  )
}

export default Layout