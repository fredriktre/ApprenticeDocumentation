import Layout from "@/components/Layout";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import axios, { AxiosError } from 'axios'
import { getIronSession } from "iron-session";
import { GetServerSideProps } from "next";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import useUserStore from "@/store/userstore";
const SelectCountry = dynamic(() => import('@/components/SelectCountry'))

export type famInputs = {
  email: string
  fullname: string
  gender: string
  birthdate: string
  deathdate: string
  bornin: string
  diedin: string
  father: string
  mother: string
  extrainfo:  string
}

type conInputs = {
  email: string
  title: string
  content: string
}

export async function getAvatar(ID:string) {
  try {
    return await axios.post("/api/getAvatar", {id:ID})
  } catch(error) {
    if (error instanceof AxiosError) console.error(error)
  }
}

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  return {
    props: {
      user: user || null,
    }
  }
}

interface Props {
  user: {
    id: string
    data: {
      email: string
      name: string
    }
    admin: boolean
    avatar: string
  } | null,
}

export default function Home({ user }:Props) {
  const [inputChildren, setInputChildren] = useState<string[]>([]);
  const [changes, setChanges] = useState<Boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [hovering, setHovering] = useState<Boolean>(false);
  const [familyInputs, setFamilyInputs] = useState<famInputs>({
    email: "",
    fullname: "",
    gender: "",
    birthdate: "",
    deathdate: "",
    bornin: "",
    diedin: "",
    father: "",
    mother: "",
    extrainfo: ""
  });
  const [contactInputs, setContactInputs] = useState<conInputs>({
    email: "",
    title: "",
    content: "",
  });
  const [famSuccess, setFamSuccess] = useState<Boolean>(false);
  const [conSuccess, setConSuccess] = useState<Boolean>(false);
  const userStore = useUserStore();

  useEffect(() => {
    if (!user) return
    if (!userStore.status) {
      getAvatar(user.avatar).then((response:any) => {
        userStore.setUser({
          id: user.id,
          data: {
              email: user.data.email,
              name: user.data.name,
          },
          admin: user.admin,
          avatar: response.data.data,
        })
      })
    }
  
  }, [user])

  function addChild() {
    setInputChildren((oldState:any) => {
      return [...oldState,  "",]
    })
  }

  function removeChild() {
    const data = inputChildren
    const returnData = data.splice(0, inputChildren.length - 1)
    setInputChildren(returnData)
  }

  function handleFileChange(ev: ChangeEvent<HTMLInputElement>) {
    if (ev.target.files) {
      const data = []
      for (let i = 0; i < ev.target.files.length; i++) {
        data.push(ev.target.files[i]);
      }
      setFiles(data);
    }
  }

  function handleScroll() {
    const element = document.getElementById("family-contact-form");
    element?.scrollIntoView({
      behavior: "smooth"
    })
  }

  async function handleFamSubmit(ev:FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    
    try {
      console.log(ev)
      let response
      if (files.length > 0) {
        const data = new FormData();
        files.forEach(file => data.append('file', file));
        response = await axios.post("/api/uploadImage", data)
      }      
      if (response === undefined) {
        response = {
          data: {
            data: {
              folderId: "",
              content: []
            }
          }
        }
      }
      axios.post("/api/landing/uploadFamily", {
        ...familyInputs,
        children: inputChildren,
        imageIds: {
          folderId: response.data.data.folderId,
          content: response.data.data.content
        }
      }).then(() => {
        setFamSuccess(true)
        setFamilyInputs({
          email: "",
          fullname: "",
          gender: "",
          birthdate: "",
          deathdate: "",
          bornin: "",
          diedin: "",
          father: "",
          mother: "",
          extrainfo: ""
        });
        setFiles([]);
        setInputChildren([]);
      })

    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
      }
    }
  }

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <div className="relative h-[95vh] flex justify-center items-center">
          <div className="w-3/5 mx-auto flex justify-center items-start gap-10 lg:flex-row flex-col">
            <div className="text-black rounded-lg">
              <p className="text-purple-800">Family Information</p>
              <h1 className="font-bold">Trevland</h1>
              <p>Want to learn more about the family and its origins? Here you can do that!</p>
              <button 
              onClick={handleScroll}
              onMouseEnter={() => setHovering(true)} 
              onMouseLeave={() => setHovering(false)}
              className="relative px-4 py-2 bg-green-800 text-white rounded-lg mt-5 overflow-hidden">
                <p className="text-sm">Have some info for us?</p>
                <span className={`absolute top-0 left-0 h-full ${hovering ? "w-full" : "w-0"} 
                transition-all duration-150 bg-green-300 rounded-lg`}>
                  <p className="absolute right-12 top-1/2 whitespace-nowrap -translate-y-1/2 text-black text-sm">Tell us about it!</p>
                  <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </button>
            </div>  
            <div className="relative z-30 w-full bg-green-200 border-green-200 border-r-8 border-b-8 rounded-tl-3xl rounded-br-3xl">
              <Image className="relative -top-2 -left-2 rounded-tl-3xl rounded-br-3xl" 
              loading="lazy"
              priority={false}
              src={'/media/images/landingImageOneV2.webp'} 
              width={595} 
              height={447} 
              alt={"image"} />
            </div>                       
          </div>
        </div>
        <div className="relative h-screen bg-landingTwo bg-cover bg-no-repeat flex justify-center items-center
        border-b-8 border-gray-200">
          <div className="relative z-20 text-white text-center">
            <h2>Who are we?</h2>
            <p>We are a small family from Norway - Vestfold.</p>
          </div>
          <div className="absolute z-10 top-0 left-0 h-1/3 w-full bg-gradient-to-b from-gray-200 to-transparent"></div>
          <div className="absolute z-0 top-0 left-0 h-full w-full bg-black opacity-60"></div>
          <div className="absolute z-10 bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-gray-200 to-transparent"></div>
        </div>
        <div className="relative h-screen bg-skip bg-cover bg-no-repeat flex justify-center items-center 
        border-t-8 border-gray-200">
          <div className="relative z-20 text-white text-center">
            <h2>What can you find here?</h2>
            <p>On this website, you can find all kinds of information about the Trevland Family.</p>
            <p>Want to learn about an ancestor? <Link href={"/family"} 
              className="underline decoration-2 underline-offset-2 
              decoration-transparent hover:decoration-white transition-colors 
              duration-100">Go to the family tree!</Link></p>
            <p>Want to look into old documents? <Link href={"/library"} 
              className="underline decoration-2 underline-offset-2 
              decoration-transparent hover:decoration-white transition-colors 
              duration-100">Go to the library!</Link></p>
            <p>Want to talk to other curious people? <Link href={"/forum"} 
              className="underline decoration-2 underline-offset-2 
              decoration-transparent hover:decoration-white transition-colors 
              duration-100">Go to the forum!</Link></p>
          </div>
          <div className="absolute z-10 top-0 left-0 h-1/3 w-full bg-gradient-to-b from-gray-200 to-transparent"></div>
          <div className="absolute z-0 top-0 left-0 h-full w-full bg-black opacity-60"></div>
          <div className="absolute z-10 bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-gray-200 to-transparent"></div>
        </div>
        <div className=" flex flex-col gap-10 p-10">

          <form className="bg-green-800 w-full h-fit rounded-lg flex flex-col gap-5 p-4 border-green-300 border-4">
            <h2 className="text-white font-bold">Contact us!</h2>
            <input type="text" placeholder="Email" value={contactInputs.email} onChange={(ev:any) => setContactInputs({
              email: ev.target.value,
              title: contactInputs.title,
              content: contactInputs.content,
            })} />
            <input type="text" placeholder="Title" value={contactInputs.title} onChange={(ev:any) => setContactInputs({
              email: contactInputs.email,
              title: ev.target.value,
              content: contactInputs.content,
            })} />
            <textarea placeholder="Content" className="resize-none" rows={4} value={contactInputs.content} onChange={(ev:any) => setContactInputs({
              email: contactInputs.email,
              title: contactInputs.title,
              content: ev.target.value,
            })}/>
            <button type="submit" className="button-style-1">Send</button>
            {conSuccess && <p className="text-green-800 bg-white rounded-lg py-2 px-4">Successfully sent!</p>}
          </form>

          <form id="family-contact-form" onSubmit={handleFamSubmit} className="bg-green-800 w-full h-fit rounded-lg flex flex-col gap-5 p-4 border-green-300 border-4">
            <h2 className="text-white font-bold">Have info on a potential relative? Send it here!</h2>
            <input 
              type="text" 
              
              placeholder="Your Email" 
              value={familyInputs.email} 
              onChange={(ev:any) => setFamilyInputs({
                email: ev.target.value,
                fullname: familyInputs.fullname,
                gender: familyInputs.gender,
                birthdate: familyInputs.birthdate,
                deathdate: familyInputs.deathdate,
                bornin: familyInputs.bornin,
                diedin: familyInputs.diedin,
                father: familyInputs.father,
                mother: familyInputs.mother,
                extrainfo: familyInputs.extrainfo
              })} 
            />
            <div className="flex gap-5 w-full">
              <input 
                className="w-full" 
                type="text" 
                
                placeholder="Full name" 
                value={familyInputs.fullname} 
                onChange={(ev:any) => setFamilyInputs({
                  email: familyInputs.email,
                  fullname: ev.target.value,
                  gender: familyInputs.gender,
                  birthdate: familyInputs.birthdate,
                  deathdate: familyInputs.deathdate,
                  bornin: familyInputs.bornin,
                  diedin: familyInputs.diedin,
                  father: familyInputs.father,
                  mother: familyInputs.mother,
                  extrainfo: familyInputs.extrainfo
                })}
              />
              <select 
                
                value={familyInputs.gender} 
                onChange={(ev:any) => setFamilyInputs({
                  email: familyInputs.email,
                  fullname: familyInputs.fullname,
                  gender: ev.target.value,
                  birthdate: familyInputs.birthdate,
                  deathdate: familyInputs.deathdate,
                  bornin: familyInputs.bornin,
                  diedin: familyInputs.diedin,
                  father: familyInputs.father,
                  mother: familyInputs.mother,
                  extrainfo: familyInputs.extrainfo
                })}
                >
                <option value={"none"}>Gender</option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </select>
            </div>
            <div className="w-full flex gap-5">
              <div className="w-full">
                <label htmlFor="bd" className="text-white">Birthdate</label>
                <input 
                  id="bd" 
                  type="date" 
                  className="w-full" 
                  value={familyInputs.birthdate} 
                  onChange={(ev:any) => setFamilyInputs({
                    email: familyInputs.email,
                    fullname: familyInputs.fullname,
                    gender: familyInputs.gender,
                    birthdate: ev.target.value,
                    deathdate: familyInputs.deathdate,
                    bornin: familyInputs.bornin,
                    diedin: familyInputs.diedin,
                    father: familyInputs.father,
                    mother: familyInputs.mother,
                    extrainfo: familyInputs.extrainfo
                  })}
                />
              </div>
              <div className="w-full">
                <label htmlFor="dd" className="text-white">Deathdate (Leave empty if alive)</label>
                <input 
                  id="dd" 
                  type="date" 
                  className="w-full" 
                  value={familyInputs.deathdate} 
                  onChange={(ev:any) => setFamilyInputs({
                    email: familyInputs.email,
                    fullname: familyInputs.fullname,
                    gender: familyInputs.gender,
                    birthdate: familyInputs.birthdate,
                    deathdate: ev.target.value,
                    bornin: familyInputs.bornin,
                    diedin: familyInputs.diedin,
                    father: familyInputs.father,
                    mother: familyInputs.mother,
                    extrainfo: familyInputs.extrainfo
                  })}
                />
              </div>
            </div>
            <div className="flex gap-5 w-full">
              <SelectCountry 
                title="Born in"
                value={familyInputs.bornin}
                change={(ev:any) => setFamilyInputs({
                  email: familyInputs.email,
                  fullname: familyInputs.fullname,
                  gender: familyInputs.gender,
                  birthdate: familyInputs.birthdate,
                  deathdate: familyInputs.deathdate,
                  bornin: ev.target.value,
                  diedin: familyInputs.diedin,
                  father: familyInputs.father,
                  mother: familyInputs.mother,
                  extrainfo: familyInputs.extrainfo
                })}
              />
              <SelectCountry 
                title="Died in (leave empty if alive)" 
                value={familyInputs.diedin}
                change={(ev:any) => setFamilyInputs({
                  email: familyInputs.email,
                  fullname: familyInputs.fullname,
                  gender: familyInputs.gender,
                  birthdate: familyInputs.birthdate,
                  deathdate: familyInputs.deathdate,
                  bornin: familyInputs.bornin,
                  diedin: ev.target.value,
                  father: familyInputs.father,
                  mother: familyInputs.mother,
                  extrainfo: familyInputs.extrainfo
                })}
              />
            </div>
            <div className="flex gap-5 w-full">
              <input 
                className="w-full" 
                type="text" 
                placeholder="Father's name" 
                value={familyInputs.father} 
                onChange={(ev:any) => setFamilyInputs({
                  email: familyInputs.email,
                  fullname: familyInputs.fullname,
                  gender: familyInputs.gender,
                  birthdate: familyInputs.birthdate,
                  deathdate: familyInputs.deathdate,
                  bornin: familyInputs.bornin,
                  diedin: familyInputs.diedin,
                  father: ev.target.value,
                  mother: familyInputs.mother,
                  extrainfo: familyInputs.extrainfo
                })}
              />
              <input 
                className="w-full" 
                type="text" 
                placeholder="Mother's name" 
                value={familyInputs.mother} 
                onChange={(ev:any) => setFamilyInputs({
                  email: familyInputs.email,
                  fullname: familyInputs.fullname,
                  gender: familyInputs.gender,
                  birthdate: familyInputs.birthdate,
                  deathdate: familyInputs.deathdate,
                  bornin: familyInputs.bornin,
                  diedin: familyInputs.diedin,
                  father: familyInputs.father,
                  mother: ev.target.value,
                  extrainfo: familyInputs.extrainfo
                })}
              />
            </div>
            <div className="bg-green-900 p-4 rounded-lg w-full h-fit flex flex-col gap-5">
              <div className="flex gap-5">
                <button type="button" onClick={addChild} className="button-style-1">Add Child</button>
                {inputChildren.length > 0 && <button type="button" onClick={removeChild} className={`button-style-1`}>Remove Child</button>}
              </div>
            {
              inputChildren.length > 0 && <div className="flex flex-col gap-5 w-full h-fit">
                {
                  inputChildren.map((child:any, index:number) => {
                    return(
                      <input
                      key={index}
                      className="w-full" 
                      type="text" 
                      placeholder="Child's name" 
                      value={inputChildren[index]}
                      onChange={ev => setInputChildren((oldState) => {
                        const data = oldState
                        data[index] = ev.target.value
                        setChanges(!changes)
                        return data
                      })}
                      />
                    )
                  })
                }
              </div>
            }
            </div>
            <div className="bg-green-900 p-4 rounded-lg w-full h-fit flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="relative w-fit cursor-pointer flex justify-center items-center button-style-1">
                  <input
                  onChange={handleFileChange} 
                  className="absolute w-full h-full top-0 left-0 opacity-0 p-0 border-0 cursor-pointer" 
                  type="file" 
                  name="files[]" 
                  multiple 
                  accept=".png,.jpg,.jpeg" />
                  <p>Images</p>
                </div>
                {files.length > 0 && 
                  <button 
                  type="button" 
                  onClick={() => setFiles([])}
                  className="button-style-1">
                    Clear Image{files.length > 1 && "s"}
                  </button>}
              </div>
              {
                files?.length > 0 && <div className="flex flex-col gap-5 w-full h-fit">
                  {
                    files.map((file:any) => {
                      return (
                        <div key={file.name} className="bg-white border-4 border-green-300 p-2 
                        rounded-lg"><p>{file.name}</p></div>
                      )
                    })
                  }
                </div>
              }
            </div>
            <textarea 
              placeholder="Extra information" 
              className="resize-none" 
              rows={4} 
              value={familyInputs.extrainfo} 
              onChange={(ev:any) => setFamilyInputs({
                email: familyInputs.email,
                fullname: familyInputs.fullname,
                gender: familyInputs.gender,
                birthdate: familyInputs.birthdate,
                deathdate: familyInputs.deathdate,
                bornin: familyInputs.bornin,
                diedin: familyInputs.diedin,
                father: familyInputs.father,
                mother: familyInputs.mother,
                extrainfo: ev.target.value
              })}
            />
            <button type="submit" className="button-style-1">Send</button>
            {famSuccess && <p className="text-green-800 bg-white rounded-lg py-2 px-4">Successfully sent information. Thank you for your contribution!</p>}
          </form>

        </div>
      </div>
    </Layout>
  )
}