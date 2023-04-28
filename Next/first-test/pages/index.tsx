import Layout from "@/components/Layout";
import { useState } from "react";

export default function Home() {

  const [currText, setCurrText] = useState('');

  const Desc = "This is a portfolio website"

  return (

    <Layout description={Desc}>

      <main className="h-full w-full">

        <section className="flex justify-evenly items-center w-full text-white">
          
          <div>
            <h1 className="font-bruno">Fredrik Sjøli Trevland</h1>
            <p>A <span>{currText}</span><span>...</span></p>
          </div>
          
          <div>

            

          </div>
        </section>

      </main>

    </Layout>

  )
}
