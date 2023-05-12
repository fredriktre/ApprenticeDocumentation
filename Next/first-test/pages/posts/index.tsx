import Layout from "@/components/Layout"
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Card from "@/components/Card";
import useUserStore from "@/store/userstore";
import usePostStore, { Post } from "@/store/poststore";

const posts = () => {
  const userStore = useUserStore();
  const postStore = usePostStore();
  const [posts, setPosts] = useState<Post[]>();
  const [deleteCurr, setDeleteCurr] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    handlePosts()

  }, [postStore.posts])
  
  async function handlePosts() {
    if (!postStore.status) {
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
    } else {
      setPosts(postStore.posts)
    }
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

  function deleteHandler(id:string) {
    if (deleteCurr === "") {
      setDeleteCurr(id)
    } else {

      axios.delete(`/api/post?id=${id}`).then((response:any) => {
        axios.get("/api/post").then((res) => {
          setPosts(res.data);
        })
      })

      setDeleteCurr("")
    }
  }

  return (

    <Layout UseNav={true}>

      <div className="w-4/5 mx-auto rounded-md gap-4 grid grid-cols-1 md:grid-cols-2">
        {
          posts ? 

          posts.map((post:any) => (
            <Card 
              key={post._id}
              bg="bg-cyan-800" 
              bordercolor="border-cyan-300" 
              className="cursor-pointer">

                <div
                  className="w-full"
                  onClick={() => {router.push(`/posts/${post._id}`)}}>
                  <h2>{post.title}</h2>
                  <p>{`${convertDate(post.updated)}`}</p>
                </div>

                {
                  userStore.user.admin &&
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => {router.push(`/posts/admin/edit/${post._id}`)}}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg transition-all duration-75 text-white border-2 border-gray-300">Edit</button>
                    <button 
                      onClick={() => {deleteHandler(post._id)}}
                      className={`px-4 py-2 ${deleteCurr === post._id? "bg-red-500 hover:bg-red-400 active:bg-red-600" : "bg-gray-800 hover:bg-gray-700 active:bg-gray-900"} rounded-lg transition-all duration-75 text-white border-2 border-gray-300`}>Delete</button>
                  </div>
                }
            </Card>
          ))

          : <Card 
            bg="bg-cyan-800" 
            bordercolor="border-cyan-300"
            className="col-span-2">
            <h1>No Posts yet</h1>
          </Card>
        }
      </div>

    </Layout>
  )
}

export default posts