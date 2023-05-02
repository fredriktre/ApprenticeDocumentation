import Layout from "@/components/Layout"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const posts = () => {
  const [posts, setPosts] = useState([]);
  const [deleteCounter, setDeleteCounter] = useState(0);

  const router = useRouter();

  useEffect(() => {

    axios.get("/api/post").then((res) => {
      setPosts(res.data);
    })
    
  }, [])
  console.log(posts)
  
  function convertDate(date:string) {
    const datedata = new Date(date)
    const yyyy = datedata.getFullYear();
    let mm:string|number = datedata.getMonth() + 1; // Months start at 0!
    let dd:string|number = datedata.getDate();

    if (mm < 10) mm = `0${mm}`
    if (dd < 10) dd = `0${dd}`

    return dd + '.' + mm + '.' + yyyy;
  }

  function deleteHandler(id:string) {
    if (deleteCounter < 1) {
      setDeleteCounter(deleteCounter + 1)
    } else {

      axios.delete(`/api/post?id=${id}`).then((response:any) => {
        axios.get("/api/post").then((res) => {
          setPosts(res.data);
        })
        console.log(response)
      })

      setDeleteCounter(0)
    }
  }

  return (

    <Layout>
        
      {/* <Link href={'/posts/newPost'} 
      className="p-4 bg-gray-950 rounded-md hover:bg-gray-800
      active:bg-black transition-all duration-75 text-white"
      >New Post</Link> */}

      <div className="p-4 bg-gray-900 rounded-md gap-4 grid grid-cols-2">
        {
          posts.length > 0 ? 

          posts.map((post:any) => (
            <div 
            key={post.updated} 
            className="cursor-pointer flex justify-between gap-4 text-white p-4 bg-gray-950 hover:bg-gray-800 active:bg-black transition-all duration-100 rounded-md">
                <div className="w-full"
                onClick={() => {router.push(`/posts/${post._id}`)}}
                >
                  <h2>{post.title}</h2>
                  <p>{`${convertDate(post.updated)}`}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => {router.push(`/posts/edit/${post._id}`)}}
                    className="relative w-20 py-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 transition-all duration-75 font-bold rounded-md">Edit</button>
                  <button 
                    onClick={() => {deleteHandler(post._id)}}
                    className={`${deleteCounter === 1 ? "bg-red-500 hover:bg-red-400 active:bg-red-600" : "bg-blue-500 hover:bg-blue-400 active:bg-blue-600"} w-20 py-2 transition-all duration-75 font-bold rounded-md`}>Delete</button>
                </div>
            </div>
          ))

          : <div className="text-center col-span-2 text-white p-4 bg-gray-950 rounded-md">
            <h1>No Posts yet</h1>
          </div>
        }
      </div>

    </Layout>
  )
}

export default posts