import Layout from "@/components/basic/Layout"
import axios, { AxiosError } from "axios"
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { useEffect, useState } from "react";
import useUserStore from "@/stores/userstore";
import Link from "next/link";
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

export type User = {
  id: string
  data: {
    email: string
    name: string
  }
  admin: boolean
  avatar: string
}

interface Props {
  user: User | null,
}

export async function getAvatar(id:string) {
  try {
    const response = await axios.post("/api/auth/getAvatar", {id})
    return response.data.avatar
  } catch (error) {
    console.error(error)
  }
}

export default function Home({user}:Props) {
  const userStore = useUserStore();
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
    if (!router) return
    if (userStore.needRefresh === false) return
    const checkIflogout = (url:any) => {
      if (url === "/"){
        if (userStore.status === false) {
          userStore.setForRefresh(false);
          router.reload();
        }
      }
    }
    router.events.on("routeChangeStart", checkIflogout)
  }, [router, userStore])

  useEffect(() => {
    axios.get("/api/checkConnect").then((res:any) => {
      console.log(res.data.message)
    })
  }, [])

  return (
    <Layout>
      <div className="h-screen-wnav w-4/5 mx-auto flex flex-col justify-center gap-10">
        <div className="h-full w-full flex flex-col gap-5">
          <div className="bg-c-accent w-full h-fit rounded-lg p-4 text-white">
            <h1 className="text-4xl">Welcome to TrefTravelVlog!</h1>
          </div>
          <div className="bg-c-accent w-full h-fit rounded-lg p-4 text-white">
            <p>Here you can find <Link href={"/posts"} className="line-under-link">posts</Link> about my travels!</p>
            
            <p>If you want to contact me, please email me at <Link href={"mailto:trevlandf0604@gmail.com"} className="line-under-link">trevlandf0604@gmail.com</Link></p>
            <p>I don{"'"}t have an email system for forgot password, is you forget it, contact me :D</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
