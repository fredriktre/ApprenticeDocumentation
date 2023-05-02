import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { OutputData } from '@editorjs/editorjs'
import EditorPreview from "@/components/editorPreview"
import axios from "axios"
import { useRouter } from "next/router"
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
})

interface Props {
    data?: {
        title?: string,
        content?: OutputData,
        updated?: string,
        _id?: string
    }
}

const EditorSystem = ({data:preData}:Props) => {
    const [data, setData] = useState<OutputData>();
    const [title, setTitle] = useState("");
    const [startEdit, setStartEdit] = useState(false)
    const [previewMode, setPreviewMode] = useState(false)
    
    const router = useRouter();

    useEffect(() => {
        if(preData?._id) {
            if (preData.content && preData.title) {
                setData(preData.content)
                setTitle(preData.title)
                setStartEdit(true)
            }
        } else {
            setStartEdit(true)
        }

    }, [])

    function publishPost () {
        if (data != null) {           
            if (preData?._id) {
                console.log("this")
                const publishData = {
                    title: title,
                    body: {
                      blocks: data.blocks,
                      time: data.time,
                      version: data.version
                    },
                    _id: preData._id
                }

                axios.put(`/api/post`, publishData).then((response) => {

                    console.log(response)
                    router.push('/posts')

                }).catch((error) => {
                    console.log(error.message)
                })

            } else {                
                const publishData = {
                    title: title,
                    body: {
                      blocks: data.blocks,
                      time: data.time,
                      version: data.version
                    }
                }

                axios.post("/api/post", publishData).then((response) => {

                  console.log(response)
                  router.push('/posts')

                }).catch((error) => {
                  console.log(error.message)
                })
            }        
        }

    }


    return (
      <section className="w-full min-h-screen flex flex-col gap-10 justify-center items-center">
            <div className="flex gap-4">
                <button onClick={() => setPreviewMode(!previewMode)} className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white">{previewMode ? "Edit" : "Preview"}</button>
                <button onClick={publishPost} className="p-4 bg-gray-950 rounded-md hover:bg-gray-800 active:bg-black transition-all duration-75 text-white">Publish</button>
            </div> 
            <input 
                className="w-full h-full text-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-4 bg-gray-100 rounded-md" 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={ev => setTitle(ev.target.value)} />
            <div className="relative w-full h-fit">

                {
                    startEdit 
                    ? <Editor data={data} onChange={setData} holder="editorjs-container" mode={previewMode} />
                    : <div><h1>Wait</h1></div>
                }
                
                <div className={`absolute top-0 left-1/2 -translate-x-1/2`}>
                    {
                      data ?
                      <EditorPreview data={data} mode={previewMode} /> : 
                      <div className={`${previewMode ? "opacity-100" : "opacity-0"} md:max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full h-16 bg-gray-100 rounded-md p-4`}></div>
                    }
                </div>

          </div>

        </section>
    )
}

export default EditorSystem