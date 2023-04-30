import Layout from "@/components/Layout"
import dynamic from "next/dynamic"
import { useState } from "react"
import { OutputData } from '@editorjs/editorjs'
import EditorPreview from "@/components/editorPreview"
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
})

const newPost = () => {
  const [data, setData] = useState<OutputData>();
  const [previewMode, setPreviewMode] = useState(false)
  

  return (
    <Layout>
      <section className="w-full min-h-screen flex flex-col gap-10 justify-center items-center">
        <div className="flex gap-4">
          <button onClick={() => setPreviewMode(!previewMode)} className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white">{previewMode ? "Edit" : "Preview"}</button>
          <button className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white">Publish</button>
        </div> 
        <Editor data={data} onChange={setData} holder="editorjs-container"  />

        {
          data ?
          <EditorPreview data={data} /> : 
          <div className="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full min-h-[20rem] bg-gray-100 rounded-md p-4">
            <h1>No content yet</h1>
          </div>
        }

      </section>

    </Layout>
  )
}

export default newPost