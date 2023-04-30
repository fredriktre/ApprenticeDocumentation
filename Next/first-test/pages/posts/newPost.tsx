import Layout from "@/components/Layout"
import dynamic from "next/dynamic"
import { useState } from "react"
import { OutputData } from '@editorjs/editorjs'
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
})

const newPost = () => {

  
  const [data, setData] = useState<OutputData>();

  return (
    <Layout>
      <section className="w-full min-h-screen flex flex-col gap-10 justify-center items-center">
        <div>
          <button className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white">Publish</button>
        </div>
          <Editor data={data} onChange={setData} holder="editorjs-container"  />
      </section>

    </Layout>
  )
}

export default newPost