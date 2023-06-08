import { ReactNode } from "react"
import Navigation from "./Navigation"
import Head from "next/head"

interface Props {
    children?: ReactNode
    title?: string
}

const Layout = ({children, title}:Props) => {
  return (
    <div className="w-full h-screen flex font-standard">
        <Head>
            <meta name="developer" content="https://github.com/fredriktre" />
            <meta name="author" content="Fredrik Sjøli Trevland" />
            <meta name="keywords" content="travel,blog,vlog,video,videos,vlogs,blogs,travelling" />
            <meta name="description" content="Follow me as I travel and live in Japan. Both video and written logs will be possible to find here!" />
            <title>{title ? `${title}` : "TrefTravelVlog"}</title>
        </Head>

        <Navigation />

        <main className="w-full h-full bg-c-background">
            {children}
        </main>

    </div>
  )
}

export default Layout