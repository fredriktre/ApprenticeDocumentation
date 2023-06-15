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
import Image from "next/image";

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;
  const responseVlog = await axios.get(`${process.env.CURRENTURL}/api/posts/vlog`)
  const responseBlog = await axios.get(`${process.env.CURRENTURL}/api/posts/blog`)

  const jsonVlog = JSON.stringify(responseVlog.data.content)
  const jsonBlog = JSON.stringify(responseBlog.data.content)

    return {
      props: {
        user: user || null,
        vlog: jsonVlog,
        blog: jsonBlog,
      }
    }
}

interface Props {
  user: User | null,
  vlog: any,
  blog: any
}

const Posts = ({user, vlog, blog}:Props) => {
  const userStore = useUserStore();
  const [vlogs, setVlogs] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [currentHover, setCurrentHover] = useState<string>("")
  const [userData, setUserData] = useState<User>();
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
          setUserData({
            id: user.id,
            data: {
                email: user.data.email,
                name: user.data.name,
            },
            admin: user.admin,
            avatar: res,
          })
        })
      } else {
        setUserData({
          id: userStore.user.id,
          data: {
              email: userStore.user.data.email,
              name: userStore.user.data.name,
          },
          admin: userStore.user.admin,
          avatar: userStore.user.avatar,
        })
      }
    }, [user, userStore])

    useEffect(() => {
      if (!vlog) return

      setVlogs(JSON.parse(vlog))

    }, [vlog])

    useEffect(() => {
      if (!blog) return

      setBlogs(JSON.parse(blog))

    }, [blog])

    const handleVlogClick = (id:string) => {
      router.push(`/posts/post/vlog/${id}`)
    }

    const handleVlogEditClick = (id:string) => {
      router.push(`/posts/edit/vlog/${id}`)
    }

    const handleBlogClick = (id:string) => {
      router.push(`/posts/post/blog/${id}`)
    }

    const handleBlogEditClick = (id:string) => {
      router.push(`/posts/edit/blog/${id}`)
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
            return (
              <div key={vlog._id} className={`relative w-full aspect-video rounded-lg overflow-hidden`}
                onMouseEnter={() => setCurrentHover(`vlog-${index}`)} 
                onMouseLeave={() => setCurrentHover(``)}>
                <Image src={vlog.thumbnailURL} alt={"image"} className="w-full h-full" />
                <div onClick={() => handleVlogClick(vlog._id)}
                className={`absolute top-0 left-0 w-full h-full p-4
                ${currentHover === `vlog-${index}` ? "opacity-100" : "opacity-0"} transition-opacity duration-300 text-white
                flex justify-center items-center`}>
                  <p className="relative z-20 text-xl">{vlog.title}</p>
                  <span className="block absolute z-10 top-0 left-0 w-full h-full bg-black opacity-60"></span>
                </div>
                {/* {
                  userData?.admin &&
                  <button 
                  type="button"
                  onClick={() => handleVlogEditClick(vlog._id)}
                  className={`absolute z-30 top-1/2 right-4 -translate-y-1/2 w-fit py-2 px-4 text-lg bg-c-background text-c-text 
                  placeholder:text-c-text placeholder:opacity-75 outline-none ${currentHover === `vlog-${index}` ? "opacity-100" : "opacity-0"}
                  border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg`}> 
                    Edit
                  </button>
                } */}
              </div>
            )
          })}
        </div>
        <div className="flex flex-col w-3/5 gap-5">
          {blogs.map((blog:any, index:number) => {
            return (
              <div key={blog._id}               
              className={`relative bg-c-accent border-2 ${currentHover === `blog-${index}` ? "border-c-s-button" : "border-transparent"}
              rounded-lg w-full text-white transition-colors duration-300`}>
                <div onClick={() => handleBlogClick(blog._id)} className="w-full px-4 py-2" 
                onMouseEnter={() => setCurrentHover(`blog-${index}`)} 
                onMouseLeave={() => setCurrentHover(``)}>
                  <h2 className="text-2xl">{blog.title}</h2>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">{blog.content.content[0].content[0].text}</p>
                </div>
                {/* {
                  userData?.admin &&
                  <button 
                  type="button"
                  onClick={() => handleBlogEditClick(blog._id)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-fit py-2 px-4 text-lg bg-c-background text-c-text 
                  placeholder:text-c-text placeholder:opacity-75 outline-none
                  border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg"> 
                    Edit
                  </button>
                } */}
              </div>
            )
          })}
        </div>
      </div>
        
    </Layout>
  )
}

export default Posts