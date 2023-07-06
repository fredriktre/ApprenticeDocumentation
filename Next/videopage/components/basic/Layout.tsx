import { ReactNode } from "react"
import Navigation from "./Navigation"
import Head from "next/head"

interface Props {
    children?: ReactNode
    title?: string
}

const Layout = ({children, title}:Props) => {
  return (
    <div className="w-full h-full min-h-screen font-standard min-w-[286px] bg-c-background">
        <Head>
            <meta name="developer" content="https://github.com/fredriktre" />
            <meta name="author" content="Fredrik Sjøli Trevland" />
            <meta name="keywords" content="travel,blog,vlog,video,videos,vlogs,blogs,travelling" />
            <meta name="description" content="Follow me as I travel and live in Japan. Both video and written logs will be possible to find here!" />
            <title>{title ? `${title}` : "TrefTravelVlog"}</title>
        </Head>

        <Navigation />

        <main className="w-full h-full h-screen-wnav md:pl-64 pl-0 md:pt-0 pt-[15rem]">
          {children}
        </main>

    </div>
  )
}

export default Layout