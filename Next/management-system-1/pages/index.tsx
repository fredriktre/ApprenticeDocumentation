import Layout from '@/components/basic/PublicLayout'
import { useEffect, useRef, useState } from 'react'
import { wrapGrid } from 'animate-css-grid'
import Landing from '@/components/index/Landing'

export default function Home() {

  return (
    <Layout layoutClass='font-ws'>

      <Landing />

    </Layout>
  )
}
