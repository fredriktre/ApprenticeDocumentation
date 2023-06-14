import Layout from '@/components/basic/Layout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import VideoComp from '@/components/media/VideoComp';
import CommentComp from '@/components/text/CommentComp';
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { User } from '@/pages'; 
import { getAvatar } from '@/pages'
import useUserStore from '@/stores/userstore';

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


const vlog = ({user}:Props) => {
    const router = useRouter();
    const userStore = useUserStore();
    const [userData, setUserData] = useState<User>();
    const [vlogData, setVlogData] = useState<any>();

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
      }, [user])

    useEffect(() => {
        if (!router) return
        if (router.query.id) {
            getVlog(router.query.id[0].toString());
        }
    }, [router])

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
                    return response
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
            <div className={`w-4/5 h-fit p-4 rounded-lg bg-c-accent flex justify-center items-center`}>
                <VideoComp title={vlogData ? `${vlogData.title} - ${vlogData.date}` : ""} source={vlogData ? vlogData.videoURL : ""} />
            </div>     
            <div className={`w-4/5 h-fit`}>
                <CommentComp postID={vlogData?._id} userData={userData} handleAsync={handleSendingComments} />
            </div>       
        </div>

    </Layout>
  )
}

export default vlog