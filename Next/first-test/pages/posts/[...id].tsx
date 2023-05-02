import Card from "@/components/Card"
import CardWrapper from "@/components/CardWrapper"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from 'axios'
import { OutputData } from '@editorjs/editorjs'
const editorJsHTML = require("editorjs-html");
const EditorJsToHTML:any = editorJsHTML();
type ParsedContent = string | JSX.Element;


const postPage = () => {
  const router = useRouter();
  const {id} = router.query
  const [data, setData] = useState<OutputData>()
  const [title, setTitle] = useState("")
  const [updated, setUpdated] = useState("")
  
  useEffect(() => {
    if(!id) return;
    axios.get(`/api/post?id=${id}`).then((res:any) => {
      console.log(res.data)
      setData(res.data.content[0][0]);
      setTitle(res.data.title)
      setUpdated(convertDate(res.data.updated))
    })
    
  }, [id])
  
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
    <Layout>
      <CardWrapper>
        <Card>
          <div className="text-white">
            <h1>{title}</h1>
            <p>{updated}</p>
          </div>
        </Card>
        <Card>
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
      </CardWrapper>
    </Layout>
  )
}

export default postPage


