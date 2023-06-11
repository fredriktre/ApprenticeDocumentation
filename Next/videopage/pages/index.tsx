import Layout from '@/components/basic/Layout'
import axios, { AxiosError } from 'axios'
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { useEffect } from "react";
import useUserStore from "@/stores/userstore";
import VideoComp from '@/components/media/VideoComp';

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

  }
}

export default function Home({user}:Props) {
  const userStore = useUserStore();

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

  }, [user])

  return (
    <Layout>

    </Layout>
  )
}
