import Layout from '@/components/basic/Layout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import VideoComp from '@/components/media/VideoComp';
import CommentComp from '@/components/text/CommentComp';
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { User, getAvatar } from '@/pages'; 
import useUserStore from '@/stores/userstore';
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

const Vlog = ({user}:Props) => {
    const router = useRouter();
    const usersStore = useUsersStore();
    const userStore = useUserStore();
    const [userData, setUserData] = useState<User>();
    const [vlogData, setVlogData] = useState<any>();
    const [comments, setComments] = useState<any[]>([]);

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
            getVlog(router.query.id[0].toString());
        }
    }, [router])

    useEffect(() => {
        if (!vlogData) return
        if (vlogData._id.length > 0) {
            getUsersAndComments(vlogData._id)
        }
    }, [vlogData])

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

    async function getVlog (id:string) {
        try {

            const response:any = await axios.post("/api/posts/vlog", {
                type: "GETSPESIFIC",
                id: id
            });

            setVlogData(response.data.content)
        } catch(error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }

    async function handleSendingComments(input:string) {
        if (input.length > 0) {
            if (userData?.id) {
                try {
                    const response = await axios.post("/api/posts/comment", {
                        type: "POST",
                        comment: input,
                        userID: userData?.id,
                        postID: vlogData?._id
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

  return (
    <Layout>

        <div className={`w-full h-screen-wnav flex flex-col items-center gap-5 pt-5`}>
            <div className={`w-4/5 h-fit p-4 rounded-lg bg-c-accent shadow-accent flex justify-center items-center`}>
                <VideoComp title={vlogData ? `${vlogData.title} - ${vlogData.date}` : ""} source={vlogData ? vlogData.videoURL : ""} />
            </div>  
            <div className={`w-4/5 h-fit p-4 rounded-lg bg-c-accent shadow-accent flex flex-col gap-5 text-white`}>
                <div className='flex gap-5 items-center'>
                    <h2 className='text-2xl'>{vlogData?.title}</h2>
                    <p>{vlogData?.date}</p>
                </div>
                <div>
                    <h3 className='text-xl'>Description</h3>
                    <p>{vlogData?.desc}</p>
                </div>
            </div>   
            <div className={`w-4/5 h-fit`}>
                {
                    vlogData?._id &&
                    <CommentComp comments={comments} userData={userData} handleAsync={handleSendingComments} />
                }
            </div>       
        </div>

    </Layout>
  )
}

export default Vlog