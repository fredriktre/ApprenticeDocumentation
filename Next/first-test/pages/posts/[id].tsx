import Card from "@/components/Card"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { OutputData } from '@editorjs/editorjs'
import usePostStore from "@/store/poststore"
import type { Post } from "@/store/poststore"
import axios from "axios"
const editorJsHTML = require("editorjs-html");
const EditorJsToHTML:any = editorJsHTML();
type ParsedContent = string | JSX.Element;


const postPage = () => {
  const router = useRouter();
  const postStore = usePostStore();
  const {id} = router.query
  const [data, setData] = useState<OutputData>()
  const [title, setTitle] = useState("")
  const [updated, setUpdated] = useState("")
  
  useEffect(() => {
    if(!id) return;
    if (postStore.status) {
      const post = postStore.posts.find(post => post._id === id)
      if (post) { 
        setData(post.content);
        setTitle(post.title);
        setUpdated(convertDate(post.updated))
      }
    } else {
      handlePosts();
    }
    
  }, [id, postStore.status])

  async function handlePosts() {
    const response = await axios.get("/api/post")
    const data:Post[] = [];
    response.data.forEach((post:any) => {
      data.push({
        title: post.title,
        updated: post.updated,
        content: post.content[0][0],
        _id: post._id
      })
    })
    postStore.setPosts(data)
  }
  function convertDate(date:string) {
    const datedata = new Date(date)
    const yyyy = datedata.getFullYear();
    let mm:string|number = datedata.getMonth() + 1; // Months start at 0!
    let dd:string|number = datedata.getDate();

    if (mm < 10) mm = `0${mm}`
    if (dd < 10) dd = `0${dd}`

    return dd + '.' + mm + '.' + yyyy;
  }

  let html

  if (data) {
    html = EditorJsToHTML.parse(data) as ParsedContent[];
  }

  return (
    <Layout UseNav={true}>
      <div className="w-4/5 mx-auto pt-10 flex flex-col gap-10">
        <Card
          bg="bg-cyan-800"
          bordercolor="border-cyan-300">
          <div className="text-white">
            <h1 className="font-bruno">{title}</h1>
            <p>{updated}</p>
          </div>
        </Card>
        <Card
          bg="bg-cyan-800"
          bordercolor="border-cyan-300">
          <div className="text-white centerimg flex flex-col gap-2">
            {
              html &&
              html.map((item, index):any => {
                  if (typeof item === "string") {
                      return ( 
                          <div dangerouslySetInnerHTML={{__html: item}} key={index}></div>
                      )
                  }
                  return item
              })
            }
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default postPage


