import Layout from '@/components/basic/Layout'
import Link from 'next/link';

const About = () => {

  function calcAge() {
    const db = new Date("2004, 06, 13");
    console.log(db)
    const diff = Date.now() - db.getTime();
    const age = new Date(diff)

    return Math.abs(age.getUTCFullYear() - 1970)
  }

  return (
    <Layout>

      <div className='w-full h-screen-wnav p-10 flex flex-col gap-5 justify-center items-center'>
        <div className='bg-c-accent w-full h-fit rounded-lg p-4'>
          <h1 className='text-4xl text-white'>About</h1>
        </div>
        <div className='bg-c-accent w-full h-fit rounded-lg p-4'>
          <h1 className='text-2xl text-white'>Who am I?</h1>
        </div>
        <div className='bg-c-accent w-full h-fit rounded-lg p-4'>
          <p className='text-lg text-white'>
            My name is Fredrik Sjøli Trevland. I'm {calcAge()} Born and raised in the south-east of Norway.<br/>
            I've had an interest in Japan since 2020, after some friends introduced me to Japanese popculture (like anime)<br/>
            This year, I finally bought my plane tickets! To fulfill one of many small dreams I have.<br/>
          </p>
        </div>
        <div className='bg-c-accent w-full h-fit rounded-lg p-4'>
          <h1 className='text-2xl text-white'>What's this page about?</h1>
        </div>
        <div className='bg-c-accent w-full h-fit rounded-lg p-4'>
          <p className='text-lg text-white'>
            This page is a travel blog / vlog.<br />
            I made this so I could cover my travels in Japan, and perhaps more in the future.<br /><br />
            On this website you will be able to read about what I'm doing / I've done while travelling.<br />
            There are videos as well. All of this can be found in <Link href={"/posts"} className={`text-lg line-under-link`}>Posts</Link><br /><br />
            If there is any need for <Link href={"/posts"} className={`text-lg line-under-link`}>Contact</Link> then that's possible as well. シ<br />
          </p>
        </div>
      </div>

    </Layout>
  )
}

export default About