import Layout from '@/components/basic/Layout'
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Bold from '@tiptap/extension-bold'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'
import Image from '@tiptap/extension-image'
import YT from '@tiptap/extension-youtube'
import Heading from '@tiptap/extension-heading'
import CommentComp from '@/components/text/CommentComp';
import useUserStore from '@/stores/userstore';
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { User, getAvatar } from '@/pages'; 
import useUsersStore from '@/stores/usersstore';

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
      user: User | null,
  }

const Blog = ({user}:Props) => {
    const router = useRouter();
    const usersStore = useUsersStore();
    const userStore = useUserStore();
    const [userData, setUserData] = useState<User>();
    const [comments, setComments] = useState<any[]>([]);
    const [blogData, setBlogData] = useState<any>();
    const [blog, setBlog] = useState<any>();

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
        }
        else {
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
        if (!router) return
        if (router.query.id) {
            getBlog(router.query.id[0].toString());
        }

    }, [router])

    async function getBlog (id:string) {
        try {

            const response:any = await axios.post("/api/posts/blog", {
                type: "GETSPESIFIC",
                id: id
            });

            setBlogData(response.data.content)
        } catch(error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold.configure({
                HTMLAttributes: {
                    class: 'editor-bold'
                }
            }),
            Link.configure({
                openOnClick: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'editor-link'
                }
            }),
            CharacterCount.configure({
                limit: 5000,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: "editor-image"
                }
            }),
            YT.configure({
                inline: false,
                width: 480,
                height: 320,
                controls: true,
                nocookie: false,
                allowFullscreen: true,
                autoplay: false,
                ccLanguage: "en",
                progressBarColor: "white"
            }),
            Heading.configure({
                HTMLAttributes: {
                    class: "editor-header"
                }
            })
        ],
        content: ''
    });

    useEffect(() => {
        if (!blogData) return


        const data = {
            type: blogData.content.type,
            content: blogData.content.content
        }

        editor?.commands.setContent(data)

        const html = editor?.getHTML();

        setBlog(html)

    }, [blogData, editor])

    async function handleSendingComments(input:string) {
        if (input.length > 0) {
            if (userData?.id) {
                try {
                    const response = await axios.post("/api/posts/comment", {
                        type: "POST",
                        comment: input,
                        userID: userData?.id,
                        postID: blogData?._id
                    })
                    const newComments = [           
                        {
                            avatar: userData.avatar,
                            username: userData.data.name,
                            date: new Date(
                            parseInt(`${response.data.content.date.split("-")[2]}`),
                            parseInt(`${response.data.content.date.split("-")[1]}`),
                            parseInt(`${response.data.content.date.split("-")[0]}`),),
                            comment: response.data.content.content
                        }, ...comments
                    ]
                    setComments(newComments);
                } catch(error) {
                    if (error instanceof AxiosError) {
                        console.error(error)
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (!blogData) return 
        if (blogData._id.length > 0) {
            getUsersAndComments(blogData._id)
        }
    }, [blogData])

    async function getUsersAndComments (id:string) {
        try {
            const responseComments = await axios.post("/api/posts/comment", {
                type: "GET",
                id:id
            })

            if (responseComments) {
                if (responseComments.data.content.length > 0) {
                    const userList:any[] = [];
                    responseComments.data.content.forEach((comment:any) => {
                        userList.push(comment.userID)
                    })

                    const responseUsers = await axios.post("/api/posts/getUsers", {
                        type: "GETLISTOFUSERS",
                        ids: userList
                    })
                    usersStore.setUsers(responseUsers.data.content);
                    const commentData:any[] = []
                    let readyCount = 0;
                    for (let i = 0; i < responseComments.data.content.length + 1; i++) {
                        getAvatar(responseUsers.data.content[i].avatar).then((response:any) => {
                            commentData.push({
                                avatar: response,
                                username: responseUsers.data.content[i].data.name,
                                date: new Date(
                                parseInt(`${responseComments.data.content[i].date.split("-")[2]}`),
                                parseInt(`${responseComments.data.content[i].date.split("-")[1]}`),
                                parseInt(`${responseComments.data.content[i].date.split("-")[0]}`),),
                                comment: responseComments.data.content[i].content
                            })
                            readyCount++;
                            if (readyCount === responseComments.data.content.length) {
                                const ascSort:any[] = commentData.sort((obj1:any, obj2:any) => 
                                    obj1.date - obj2.date,
                                );
                                const reverse:any[] = []
                                const ascLength = ascSort.length;
                                for (let j = 0; j < ascLength; j++) {
                                    reverse.push(ascSort.splice(-1)[0]);
                                }
                                setComments([...reverse])
                            }
                        })
                    }
                    
                    
                    
                }
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }
  return (
    <Layout>
        <div className='w-full h-screen-wnav flex flex-col justify-center items-center gap-5 pt-5'>
            <div className='w-4/5 h-fit p-4 bg-c-accent shadow-accent text-white rounded-lg'>
                <h1 className='text-4xl'>{blogData?.title}</h1>
                <p>{blogData?.date}</p>
            </div>
            <div className='w-4/5 h-fit p-4 bg-c-accent shadow-accent text-white rounded-lg dsihRead'
            dangerouslySetInnerHTML={{__html: blog}} ></div>
            <div className='w-4/5 h-fit'>
                {
                    blogData?._id &&
                    <CommentComp comments={comments} userData={userData} handleAsync={handleSendingComments} />
                }
            </div>
        </div>
    </Layout>
  )
}

export default Blog