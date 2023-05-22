import Layout from '@/components/Layout'
import useUserStore from '@/store/userstore'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '@/lib/auth/session'

const login = () => {
    const router = useRouter();
    const store = useUserStore();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!store.status) return;
        setUser(store.user);

    }, [store.status])

    async function handleLogout() {
        try {

            const response = await axios.post("/api/auth/logout");

            if (response.status === 200) {
                store.logOut()
                router.push("/")
            }
        } catch(error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }

  return (
    <Layout>
        
      <div className='w-4/5 mx-auto p-4 bg-green-800 rounded-lg mt-20 flex justify-center items-center gap-5'>
        <button type="button" onClick={handleLogout} className="button-style-1">Log Out</button>
        { user?.admin && <button type="button" onClick={() => router.push('/admin')} className="button-style-1">Admin Dashboard</button> }
      </div>

    </Layout>
  )
}

export default login