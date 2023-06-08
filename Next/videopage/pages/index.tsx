import Layout from '@/components/basic/Layout'
import axios, { AxiosError } from 'axios'
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { useEffect } from "react";
import useUserStore from "@/stores/userstore";

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
  const userStore = useUserStore();

  useEffect(() => {
    if (!user) return

    if (!userStore.status) {
      
    }

  }, [user])

  return (
    <Layout>
      
    </Layout>
  )
}
