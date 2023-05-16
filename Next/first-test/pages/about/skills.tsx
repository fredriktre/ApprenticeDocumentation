import Layout from "@/components/Layout"
import Card from '@/components/Card'
import Link from 'next/link'

const skills = () => {
  return (
    <Layout UseNav={true}>

      <section className="w-4/5 mx-auto flex flex-col gap-10">
        <Card 
          bg="cyan-800"
          bordercolor="cyan-300"
          className="">
            <h1>NB! This is based on my level of confidence!</h1>
        </Card>

        <Card
          bg="cyan-800"
          bordercolor="cyan-300"
          className="gap-5">
            <Card
              bg="cyan-700"
              bordercolor="cyan-300"
              className="w-full flex-col">
                <h2 className="mr-auto">Coding</h2>
                
                <div className="relative w-full flex justify-center items-center h-15 rounded-lg 
                bg-black border-2 border-gray-300">
                  <p className="relative z-40 mix-blend-difference font-bold text-white">HTML</p>
                  <div className="absolute top-0 left-0 h-full bg-cyan-300" style={{
                    width: `20%`
                  }}></div>
                </div>
            </Card>
            <Card
              bg="cyan-700"
              bordercolor="cyan-300"
              className="w-full flex-col">
                <h2 className="mr-auto">Frameworks</h2>
                
                <div className="relative w-full flex justify-center items-center h-15 rounded-lg 
                bg-black border-2 border-gray-300">
                  <p className="relative z-40 mix-blend-difference font-bold text-white">React.js</p>
                  <div className="absolute top-0 left-0 h-full bg-cyan-300" style={{
                    width: `20%`
                  }}></div>
                </div>
            </Card>
            <Card
              bg="cyan-700"
              bordercolor="cyan-300"
              className="w-full flex-col">
                <h2 className="mr-auto">MISC</h2>
                
                <div className="relative w-full flex justify-center items-center h-15 rounded-lg 
                bg-black border-2 border-gray-300">
                  <p className="relative z-40 mix-blend-difference font-bold text-white">HTML Email</p>
                  <div className="absolute top-0 left-0 h-full bg-cyan-300" style={{
                    width: `20%`
                  }}></div>
                </div>
            </Card>
        </Card>
      </section>

    </Layout>
  )
}

export default skills