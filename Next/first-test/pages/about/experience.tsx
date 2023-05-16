import Layout from "@/components/Layout"
import Card from '@/components/Card'
import Link from 'next/link'

const experience = () => {
  return (
    <Layout UseNav={true}>

      <section className="w-4/5 mx-auto flex flex-col gap-10">
        <Card
          bg="cyan-800"
          bordercolor="cyan-300"
          className="flex-col gap-5">
            <h1 className="mr-auto">Job experience</h1>
            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
              <Card
                bg="cyan-700"
                bordercolor="cyan-300"
                className="flex-col">
                  <h2 className="mr-auto">Freight Forwarder</h2>
                  <p className="mr-auto">KGH | 20 - 06 - 2022 --{'>'} 12 - 08 - 2022</p>
              </Card>
              <Card
                bg="cyan-700"
                bordercolor="cyan-300"
                className="flex-col">
                  <h2 className="mr-auto">Front-end Development Apprentice</h2>
                  <p className="mr-auto">Bas Kommunikasjon | 15 - 08 - 2022 --{'>'} 15 - 08 - 2024</p>
              </Card>
            </div>
        </Card>
        <Card
          bg="cyan-800"
          bordercolor="cyan-300"
          className="flex-col gap-5">
            <h1 className="mr-auto">Travel experience</h1>
            <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
              <Card
                bg="cyan-700"
                bordercolor="cyan-300"
                className="flex-col">
                  <h2 className="mr-auto">Japan</h2>
                  <p className="mr-auto">Tokyo | 28 - 06 - 2023 --{'>'} 30 - 06 - 2023</p>
                  <p className="mr-auto">Osaka | 30 - 06 - 2023 --{'>'} 29 - 07 - 2023</p>
              </Card>
            </div>
        </Card>
      </section>

    </Layout>
  )
}

export default experience