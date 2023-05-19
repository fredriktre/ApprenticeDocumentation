import Layout from "@/components/Layout"
import Link from "next/link"
import Card from "@/components/Card"
import { useState } from "react"
import type { Skill } from "@/store/skillstore"
import { GetServerSideProps } from 'next'
import { useEffect } from "react"
import useSkillStore from "@/store/skillstore"
import axios from "axios"

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

interface SI {
  category: string
  name: string
  confidence: number
}

type cC = {
  category: string
  content: Skill[]
}

const ADaboutSkills = ({ skills }:Props) => {
  const [skillsInput, setSkillsInput] = useState<SI>({
    category: "",
    name: "",
    confidence: 0,
  })
  const [currentCategory, setCurrentCategory] = useState<cC>({
    category: "",
    content: []
  });
  const store = useSkillStore();
  const [skillEdit, setSkillEdit] = useState("")
  let k = 0

  useEffect(() => {
    if (!skills) return;
    k++
    if (k < 2) return;
    if (store.skills.length <= 0) {
      skills.forEach((skill:Skill) => {
        store.setSkill({
          category: skill.category,
          name: skill.name,
          confidence: skill.confidence,
          _id: skill._id
        })
      })
    }  
  }, [skills])

  async function handleSubmit(ev:any) {
    ev.preventDefault();

    if (skillEdit.length > 0) {
      try {

        const response = await axios.post("/api/skills", {
          category: skillsInput.category,
          name: skillsInput.name,
          confidence: skillsInput.confidence,
          _id: skillEdit,
          type: "PUT"
        })

        const { category, name, confidence, _id} = response.data.body

        store.changeSkill({
          category,
          name,
          confidence,
          _id
        })

        setSkillsInput({
          category: "",
          name: "",
          confidence: 0
        })

        setSkillEdit("");

        setCurrentCategory({
          category: "",
          content: []
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      try {

        const response = await axios.post("/api/skills", {
          category: skillsInput.category,
          name: skillsInput.name,
          confidence: skillsInput.confidence,
          type: "POST"
        })

        store.setSkill({
          category: response.data.body.category,
          name: response.data.body.name,
          confidence: response.data.body.confidence,
          _id: response.data.body._id
        })

        setSkillsInput({
          category: "",
          name: "",
          confidence: 0
        })

      } catch (error) {
        console.error(error)
      }
    }

  }

  function handleNum(type:boolean) {
    let canIncrease = true
    let canDecrease = true
    let val = skillsInput.confidence;
    if (skillsInput.confidence === 10) {
      canIncrease = false
      canDecrease = true
    } else if (skillsInput.confidence === 0) {
      canIncrease = true
      canDecrease = false
    } else {
      canIncrease = true
      canDecrease = true
    }

    if (type) {
      if (canIncrease) {
        val = val + 1
      }
    } else {
      if (canDecrease) {
        val = val - 1
      }
    }
    setSkillsInput({
      category: skillsInput.category,
      name: skillsInput.name,
      confidence: val
    })
  }

  function handleChangeCategory(tocat:string) {
    console.log(store.skills)
    const filtered = store.skills.filter((skill:Skill) => skill.category === tocat)
    setCurrentCategory({
      category: tocat,
      content: filtered
    });
  }

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

            <Card
            bg="cyan-800"
            bordercolor="cyan-300"
            className="gap-10 items-stretch">
              <Card
              bg="cyan-700"
              bordercolor="cyan-300"
              className="w-full">
                <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                <select 
                  placeholder="Category" 
                  value={skillsInput.category} 
                  onChange={ev => setSkillsInput({
                    category: ev.target.value,
                    name: skillsInput.name,
                    confidence: skillsInput.confidence})} 
                  className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                  text-white rounded-md outline-none border-2 border-cyan-700
                  transition-colors duration-300 focus:border-cyan-300">
                    <option value={""}>Select Category</option>
                    <option value={"coding"}>Coding</option>
                    <option value={"frameworks"}>Frameworks</option>
                    <option value={"databases"}>Databases</option>
                    <option value={"misc"}>MISC</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={skillsInput.name} 
                    onChange={ev => setSkillsInput({
                      category: skillsInput.category,
                      name: ev.target.value,
                      confidence: skillsInput.confidence})} 
                    className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                    text-white rounded-md outline-none border-2 border-cyan-700
                    transition-colors duration-300 focus:border-cyan-300" />
                  <Card 
                    bg="gray-800"
                    bordercolor="gray-300"
                    className="flex-col gap-5 w-fit">
                    <p className="mr-auto">Confidence</p>
                    <div className="flex gap-5 w-fit items-center">
                      <button type="button" onClick={() => handleNum(false)} className="px-4 py-2 bg-cyan-700 rounded-lg hover:bg-cyan-600 active:bg-cyan-900 transition-all duration-75 text-white border-2 border-gray-300">-</button>
                      <p className="text-center py-2 w-16 bg-cyan-700 rounded-lg border-2 border-gray-300">{skillsInput.confidence}</p>
                      <button type="button" onClick={() => handleNum(true)} className="px-4 py-2 bg-cyan-700 rounded-lg hover:bg-cyan-600 active:bg-cyan-900 transition-all duration-75 text-white border-2 border-gray-300">+</button>
                    </div>
                  </Card>
                  <button type="submit" className="mt-3 px-4 py-2 w-fit bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">{skillEdit.length > 0 ? "Save" : "Create"}</button>
              </form>
              </Card>              
              <Card
              bg="cyan-700"
              bordercolor="cyan-300"
              className="flex-col w-full gap-5">
                <h1 className="mr-auto">{skillsInput.category.length > 0 ? `${skillsInput.category}` : "Preview"}</h1>
                <div className="relative w-full flex justify-center items-center h-15 rounded-lg 
                bg-black border-2 border-gray-300">
                  <p className="relative z-40 mix-blend-difference min-h-[30px] font-bold text-white">{skillsInput.name}</p>
                  <div className="absolute top-0 left-0 h-full bg-cyan-300" style={{
                    width: `${skillsInput.confidence * 10}%`
                  }}></div>
                </div>
              </Card>
            </Card>
            <Card
              bg="cyan-800"
              bordercolor="cyan-300"
              className="gap-10 items-stretch">
                <Card
                  bg="cyan-700"
                  bordercolor="cyan-300"
                  className="w-full flex-col gap-5">
                    <h1 className="mr-auto">Category</h1>
                    <button onClick={() => handleChangeCategory("coding")} className="mr-auto w-full px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300"><p>Coding</p></button>
                    <button onClick={() => handleChangeCategory("frameworks")} className="mr-auto w-full px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300"><p>Frameworks</p></button>
                    <button onClick={() => handleChangeCategory("databases")} className="mr-auto w-full px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300"><p>Databases</p></button>
                    <button onClick={() => handleChangeCategory("misc")} className="mr-auto w-full px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300"><p>MISC</p></button>
                </Card>
                <Card
                  bg="cyan-700"
                  bordercolor="cyan-300"
                  className="w-full items-baseline flex-col gap-5">
                    <h1>{currentCategory.category === "" ? 'Categories' : `${currentCategory.category}`}</h1>
                    {
                      currentCategory.content.map((skill:Skill) => {
                        return (
                          <button key={skill._id} onClick={() => {setSkillsInput({
                            category: skill.category,
                            name: skill.name,
                            confidence: skill.confidence,
                          }), setSkillEdit(skill._id)}} className="mr-auto w-full px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300"><p>{skill.name}</p></button>
                        )
                      })
                    }
                </Card>
            </Card>
        </div>
    </Layout>
  )
}

export default ADaboutSkills