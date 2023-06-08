import Layout from "@/components/basic/Layout";
import axios, { AxiosError } from 'axios'
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { useEffect } from "react";
import useStoreUserStore from "@/stores/userstore";

export const getAvatar = async (id:string) => {
  try {
    const avatar = await axios.post("/api/auth/getAvatar", {
      id: id
    })
    const URI = avatar.data.data.toString()

    return URI
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error)
    }
  }
}

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
  user: {
    id: string
    data: {
      email: string
      name: string
    }
    admin: boolean
    avatar: string
  } | null,
}

export default function Home({user}:Props) {
  const userstore = useStoreUserStore();
  
  useEffect(() => {
    if (!user) return

    if (!userstore.status) {
      getAvatar(user.avatar).then((res:string) => {
        userstore.setUser({
          id: user.id,
          data: {
            email: user.data.email,
            name: user.data.name,
          },
          admin: user.admin,
          avatar: res
        })
      })
    }

  }, [user])
  

  return (
    <Layout>

    </Layout>
  )
}
