import Layout from '@/components/Layout'
import Link from 'next/link'
import { useState } from 'react'

const login = () => {
  const [showPass, setShowPass] = useState(false)
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  return (
    <Layout>
        
      <div className='w-full h-screen flex justify-center items-center'>

        <form className="bg-green-800 w-4/5 mx-auto h-fit rounded-lg flex flex-col gap-5 p-4 border-green-300 border-4">
        <input value={input.email} onChange={ev => setInput({
            email: ev.target.value,
            password: input.password,
          })} type="email" required placeholder="Email" />
          <div className='w-full flex items-stretch gap-5'>
            <input className='w-full' 
            value={input.password} 
            onChange={ev => setInput({
              email: input.email,
              password: ev.target.value,
            })} 
            type={showPass ? "text" : "password"} 
            required 
            placeholder="Password" />
            <button onClick={() => setShowPass(!showPass)} type="button" className="button-style-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {
                showPass 
                ?
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </>
                :
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </> 
              }
            
            </svg>

            </button>
          </div>
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