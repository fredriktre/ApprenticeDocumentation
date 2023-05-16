import Layout from "@/components/Layout"
import Link from "next/link"
import Card from "@/components/Card"

const ADaboutExperience = () => {
  return (
    <Layout>
        <div className="w-4/5 mx-auto flex flex-col gap-10">
            <Link href={"/admin"}>
                <Card 
                bg="cyan-800" 
                bordercolor="cyan-300" 
                className="hover:bg-cyan-700 active:bg-cyan-900 transition-colors duration-300">
                <p className="text-white sm:text-lg text-md font-bruno">Return to Admin</p>
                </Card>
            </Link>
        </div>
    </Layout>
  )
}

export default ADaboutExperience