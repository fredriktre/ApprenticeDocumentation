import Layout from '@/components/Layout'
import Link from 'next/link'

const register = () => {
  return (
    <Layout>
      <div className='w-full h-screen flex justify-center items-center'>

        <form className="bg-green-800 w-4/5 mx-auto h-fit rounded-lg flex flex-col gap-5 p-4 border-green-300 border-4">
          <input type="email" required placeholder="Email" />
          <input type="text" placeholder="Username" />
          <input type="password" required placeholder="Password" />
          <div className='flex gap-5'>
            <button type="submit" className="button-style-1">Register</button>
            <Link href={"/auth/login"} className="button-style-1">Have user? Log in here!</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default register