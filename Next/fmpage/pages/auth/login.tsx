import Layout from '@/components/Layout'
import Link from 'next/link'

const login = () => {
  return (
    <Layout>
        
      <div className='w-full h-screen flex justify-center items-center'>

        <form className="bg-green-800 w-4/5 mx-auto h-fit rounded-lg flex flex-col gap-5 p-4 border-green-300 border-4">
          <input type="email" required placeholder="Email" />
          <input type="password" required placeholder="Password" />
          <div className='flex gap-5'>
            <button type="submit" className="button-style-1">Log in</button>
            <Link href={"/auth/register"} className="button-style-1">No user? Register here</Link>
          </div>
        </form>
      </div>

    </Layout>
  )
}

export default login