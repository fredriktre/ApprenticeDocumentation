import Layout from "@/components/Layout"
import Card from '@/components/Card'
import type { Skill } from "@/store/skillstore"
import { GetServerSideProps } from 'next'
import { useEffect, useState } from "react"

interface Props {
  skills:Skill[] | null
}

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {

  try {
    const response = await fetch("http://localhost:3000/api/skills")

    const jsonData = await response.json()

    return {
      props: {
        skills: jsonData.body
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        skills: null
      }
    }
  }
}

const skills = ({ skills }:Props) => {
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [categoryList, setCategoryList] = useState<String[]>([]);

  useEffect(() => {
    if (!skills) return
    const categories:String[] = []
    const skilldata:Skill[] = [];
    skills.forEach((skill:Skill) => {
      if (!categories.includes(skill.category)) {
        categories.push(skill.category);
      }
      skilldata.push(skill)
    })

    setCategoryList(categories);
    setSkillList(skilldata)

  }, [skills])

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
          bordercolor="cyan-300">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full gap-5">
            {
              categoryList.map((category:String, index:number) => {

                const capitalized = `${category.charAt(0).toUpperCase()}${category.substring(1, category.length)}`

                return(
                  <Card
                    key={index}
                    bg="cyan-700"
                    bordercolor="cyan-300"
                    className="w-full flex-col gap-5">
                      <h2 className="mr-auto">{capitalized}</h2>
                      {
                        skillList.map((skill:Skill) => {                   
                          if (skill.category === category) {
                            return (
                              <div key={skill._id} className="relative w-full flex justify-center items-center h-15 rounded-lg 
                              bg-black border-2 border-cyan-300 overflow-hidden">
                                <p className="relative z-40 mix-blend-difference font-bold text-white">{skill.name}</p>
                                <div className="absolute top-0 left-0 h-full bg-cyan-600 rounded-md" style={{
                                  width: `${skill.confidence * 10}%`
                                }}></div>
                              </div>
                            )
                          }
                        })                  
                      }
                  </Card>
                )
              })
            }   
            </div>
        </Card>
      </section>

    </Layout>
  )
}

export default skills