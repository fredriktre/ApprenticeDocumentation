import Layout from "@/components/Layout"
import Link from "next/link"
import Card from "@/components/Card"
import { useEffect, useState } from "react"
import { GetServerSideProps } from 'next'
import axios, { AxiosError } from "axios"
import useLicenceStore from "@/store/licencestore"
import type { Licence } from "@/store/licencestore"

interface Props {
  licences:Licence[] | null
}

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {

  try {
    const response = await fetch("http://localhost:3000/api/licences")

    const jsonData = await response.json()

    return {
      props: {
        licences: jsonData.body
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        licences: null
      }
    }
  }
}


const ADaboutEducation = ({licences}:Props) => {
  const [licenceInput, setLicenceInput] = useState({
    title: "",
    forsystem: "",
    time: "",
  })
  const licenceStore = useLicenceStore();
  const [licenceEdit, setLicenceEdit] = useState("")
  const [currentLicences, setCurrentLicences] = useState<Licence[]>([]);
  let k = 0;
  useEffect(() => {
    if (!licences) return;
    if (k > 0) {
      if (licenceStore.licences.length === 0) {
        licences?.forEach((licence:any) => {
          console.log(licence)
          licenceStore.setLicence({
            title: licence.title,
            forsystem: licence.forsystem,
            time: licence.time,
            _id: licence._id,
          })
        })
      }
    }
    k++
  }, [licences])

  useEffect(() => {
    setCurrentLicences(licenceStore.licences)
  }, [licenceStore.licences])

  async function handleLicenceSubmit (ev:any) {
    ev.preventDefault();

    if (licenceEdit.length > 0 ) {
      try {

        const response:any = await axios.post("/api/licences", {
          title: licenceInput.title,
          forsystem: licenceInput.forsystem,
          time: licenceInput.time,
          _id: licenceEdit,
          type: "PUT"
        })

        console.log(response.data)

        licenceStore.changeLicence({
          title: response.data.body.title,
          forsystem: response.data.body.forsystem,
          time: response.data.body.time,
          _id: response.data.body._id
        })
        
        setLicenceEdit("")
        setLicenceInput({
          title: "",
          forsystem: "",
          time: "",
        })

      } catch (error) {
        if (error instanceof AxiosError) {
        console.error(error)
        }
      }

    } else {
      try {

        const response:any = await axios.post("/api/licences", {
          title: licenceInput.title,
          forsystem: licenceInput.forsystem,
          time: licenceInput.time,
          type: "POST"
        })

        licenceStore.setLicence({
          title: response.data.body.title,
          forsystem: response.data.body.forsystem,
          time: response.data.body.time,
          _id: response.data.body._id,
        })


      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
        }
      }
    }
  }

  function convertDate(input:string) {
    const d = new Date(input);
    return d.toISOString().substring(0,10);
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

          <div className="flex flex-col gap-5">
            <Card
            bg="cyan-800"
            bordercolor="cyan-300"
            className="flex-col gap-5">
              <h1 className="mr-auto">Licences</h1>
              <h2 className="mr-auto">{licenceEdit.length > 0  ? "Edit existing" : "Create new"}</h2>
              <form className="w-full flex flex-col gap-2" onSubmit={ev => handleLicenceSubmit(ev)}>
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={licenceInput.title} 
                  onChange={ev => setLicenceInput({
                    title: ev.target.value,
                    forsystem: licenceInput.forsystem,
                    time: licenceInput.time})} 
                  className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                  text-white rounded-md outline-none border-2 border-cyan-700
                  transition-colors duration-300 focus:border-cyan-300" />
                <input 
                  type="text" 
                  placeholder="From who? / For what system?" 
                  value={licenceInput.forsystem} 
                  onChange={ev => setLicenceInput({
                    title: licenceInput.title,
                    forsystem: ev.target.value,
                    time: licenceInput.time})} 
                  className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                  text-white rounded-md outline-none border-2 border-cyan-700
                  transition-colors duration-300 focus:border-cyan-300" />
                <input 
                  type="date" 
                  value={licenceInput.time.length > 0 ? convertDate(licenceInput.time) : licenceInput.time} 
                  onChange={ev => setLicenceInput({
                      title: licenceInput.title, 
                      forsystem: licenceInput.forsystem, 
                      time: ev.target.value})} 
                  className="w-full p-2 bg-cyan-900 backdrop-blur-xl placeholder:text-white 
                  text-white rounded-md outline-none border-2 border-cyan-700
                  transition-colors duration-300 focus:border-cyan-300" />
                  <button type="submit" className="mt-3 px-4 py-2 w-fit bg-gray-800 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition-all duration-75 text-white border-2 border-gray-300">{licenceEdit.length > 0 ? "Save" : "Create"}</button>
              </form>
            </Card>
            <Card
            bg="cyan-800"
            bordercolor="cyan-300"
            className="flex-col">
              <div className="w-full justify-items-center 
              items-center grid grid-cols-2">
                {
                  currentLicences.map((licence:any) => {
                    const date = new Date(licence.time)
                    const day = date.getUTCDate()
                    const month = date.getUTCMonth()
                    const formattedDate = `${day < 10 ? `0${day}` : `${day}`} - ${day < 10 ? `0${month}` : `${month}`} - ${date.getUTCFullYear()}`
                    return (
                      <button
                        className="w-full"
                        onClick={() => {setLicenceInput({
                          title: licence.title,
                          forsystem: licence.forsystem,
                          time: licence.time,
                          })
                          setLicenceEdit(licence._id)  
                        }}
                        key={licence._id}>
                        <Card
                          key={licence._id}
                          bg="cyan-700" 
                          bordercolor="cyan-300"
                          className="flex-col">
                              <h2 className="mr-auto">{licence.title}</h2>
                              <p className="mr-auto">{licence.forsystem} | {formattedDate}</p>
                        </Card>
                      </button>
                    )
                  })
                }
              </div>              
            </Card>
          </div>
        </div>
    </Layout>
  )
}

export default ADaboutEducation