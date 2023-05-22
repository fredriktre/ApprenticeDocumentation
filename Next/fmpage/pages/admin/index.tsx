import Layout from '@/components/Layout'
import useUserStore from '@/store/userstore'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '@/lib/auth/session'

const login = () => {
    const store = useUserStore();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!store.status) return;
        setUser(store.user);

    }, [store.status])

  return (
    <Layout>
        
      <div className='w-4/5 mx-auto p-4 bg-green-800 rounded-lg mt-20 flex justify-center items-center gap-5'>
        
      </div>

    </Layout>
  )
}

export default login