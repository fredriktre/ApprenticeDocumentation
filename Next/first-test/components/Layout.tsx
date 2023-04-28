import Head from "next/head";
import { ReactNode } from "react"
import Navigation from "./Navigation";

interface Props {
    children?: ReactNode,
    description: string
}

const Layout = ({children, description}:Props) => {
  return (
    <div className="bg-gray-800 min-h-screen h-full">
        <Head>
            <meta name="Author" content="Fredrik Sjøli Trevland" />
            <meta name="Description" content={description} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </Head>

        <Navigation />

        {children}
    </div>
  )
}

export default Layout;