import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Open_Sans } from 'next/font/google'

const OpenSans = Open_Sans({
    weight: ["300", "400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
            font-family: ${OpenSans.style.fontFamily}
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
