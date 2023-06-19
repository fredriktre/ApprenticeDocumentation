import Layout from "@/components/basic/Layout"
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { User } from ".."; 
import axios, { AxiosError } from "axios";
import { getAvatar } from "..";
import useUserStore from "@/stores/userstore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

    return {
      props: {
        user: user || null,
      }
    }
}

interface Props {
  user: User | null
}

const Posts = ({user}:Props) => {
  const userStore = useUserStore();
  const [vlogs, setVlogs] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [currentHover, setCurrentHover] = useState<string>("")
  const router = useRouter();

    useEffect(() => {
      if (!user) return
      if (!userStore.status) {
        getAvatar(`${user.avatar}`).then((res:any) => {
          userStore.setUser({
            id: user.id,
            data: {
                email: user.data.email,
                name: user.data.name,
            },
            admin: user.admin,
            avatar: res,
          })
        })
      }
    }, [user, userStore])

    useEffect(() => {
      getVlogs().then(() => {
        getBlogs();
      });
    }, [])

    const getVlogs = async () => {
      try {

        const response = await axios.get('/api/posts/vlog');
        setVlogs(response.data.content)

      } catch(error) {
        if (error instanceof AxiosError) {
          console.error(error)
        }
      }
    }
    
    const getBlogs = async () => {
      try {

        const response = await axios.get('/api/posts/blog');
        setBlogs(response.data.content)
  
      } catch(error) {
        if (error instanceof AxiosError) {
          console.error(error)
        }
      }

    }

    const handleVlogClick = (id:string) => {
      router.push(`/posts/post/vlog/${id}`)
    }


    const handleBlogClick = (id:string) => {
      router.push(`/posts/post/blog/${id}`)
    }


  return (
    <Layout>

      <div className="w-full h-screen-wnav p-4 flex flex-col gap-10 items-center">
        {
          vlogs.length < 1 &&
          blogs.length < 1 &&
          <div className="w-full my-auto flex justify-center items-center text-white">
            <h1 className="text-4xl">No posts yet</h1>
          </div>
        }

        <div className="grid grid-cols-2 items-center w-3/5 gap-5">
          {vlogs.map((vlog:any, index:number) => {
            console.log(vlog)
            return (
              <div key={vlog._id} className={`relative w-full aspect-video rounded-lg overflow-hidden`}
                onMouseEnter={() => setCurrentHover(`vlog-${index}`)} 
                onMouseLeave={() => setCurrentHover(``)}>
                  {
                    vlog.thumbnailURL &&
                    <img src={vlog.thumbnailURL} alt={"image"} width={1000} height={800} className="w-full h-full" />
                  }
                <div onClick={() => handleVlogClick(vlog._id)}
                className={`absolute top-0 left-0 w-full h-full p-4
                ${currentHover === `vlog-${index}` ? "opacity-100" : "opacity-0"} transition-opacity duration-300 text-white
                flex justify-center items-center`}>
                  <p className="relative z-20 text-xl">{vlog.title}</p>
                  <span className="block absolute z-10 top-0 left-0 w-full h-full bg-black opacity-60"></span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col w-3/5 gap-5">
          {blogs.map((blog:any, index:number) => {
            return (
              <div key={blog._id}               
              className={`relative shadow-accent bg-c-accent border-2 ${currentHover === `blog-${index}` ? "border-c-s-button" : "border-transparent"}
              rounded-lg w-full text-white transition-colors duration-300`}>
                <div onClick={() => handleBlogClick(blog._id)} className="w-full px-4 py-2" 
                onMouseEnter={() => setCurrentHover(`blog-${index}`)} 
                onMouseLeave={() => setCurrentHover(``)}>
                  <h2 className="text-2xl">{blog.title}</h2>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">{blog.content.content[0].content[0].text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
        
    </Layout>
  )
}

export default Posts