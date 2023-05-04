import Head from "next/head";
import { ReactNode } from "react"
import Navigation from "./Navigation";

interface Props {
  children?: ReactNode
  description?: string
  Keywords?: string
}

const Layout = ({children, description, Keywords}:Props) => {

  return (
    <>
        <Head>
            <meta name="Author" content="Fredrik Sjøli Trevland" />
            <meta name="Description" content={description} />
            <meta name="Keywords" content={Keywords} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        </Head>

        <Navigation />
        <main className="min-h-screen h-fit w-full bg-gray-800">
          {children}
        </main>
    </>
  )
}

export default Layout;