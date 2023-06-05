import { ReactNode } from "react"
import Navigation from "./Navigation"

interface Props {
    children: ReactNode
}

const Layout = ({children}:Props) => {
  return (
    <div className="h-screen bg-gray-100">
        <Navigation />

        <main className="w-full auto-h">
            {children}
        </main>
    </div>
  )
}

export default Layout