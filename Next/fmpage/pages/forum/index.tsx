import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { getIronSession } from 'iron-session';
import { GetServerSideProps } from "next";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import axios, { AxiosError } from 'axios';
import Link from 'next/link';

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
  threads: any[]
}

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  const response = await axios.get("http://localhost:3000/api/forum/thread")
  return {
    props: {
      user: user || null,
      threads: response.data.data
    }
  }
}

const forumIndex = ({user, threads}:Props) => {
  const [currentThreads, setCurrentThreads] = useState<any[]>();
  
  useEffect(() => {
    if (!threads) return

    console.log(threads)
    setCurrentThreads(threads)

  }, [threads])
  
  return (
    <Layout>
        
      <div className='w-4/5 mx-auto screen-mt-20 mt-20'>

        {
          currentThreads?.map((thread:any, index:number) => {

            return (
              <Link href={`/forum/${thread._id}`}>
                {thread.title}
              </Link>
            )
          })
        }

      </div>

    </Layout>
  )
}

export default forumIndex