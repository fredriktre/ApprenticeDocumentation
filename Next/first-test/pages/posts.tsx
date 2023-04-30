import Layout from "@/components/Layout"
import Link from "next/link"

const posts = () => {
  return (

    <Layout>
        
      <Link href={'/posts/newPost'} 
      className="p-4 bg-gray-950 rounded-md hover:bg-gray-800
      active:bg-black transition-all duration-75 text-white"
      >New Post</Link>

    </Layout>
  )
}

export default posts