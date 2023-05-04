import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function App({Component, pageProps: {...pageProps} }:AppProps) {

  return (
    <Component {...pageProps} />
  )
}
