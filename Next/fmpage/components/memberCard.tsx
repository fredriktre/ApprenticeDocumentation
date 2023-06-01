import Link from "next/link"
import { useEffect, useRef, useState, DragEvent, Children } from "react"
import { Request } from "@/pages/admin"
import SelectCountry from "./SelectCountry"
import axios, { AxiosError } from "axios"

type Inputs = {
    fullname: string,
    gender: string,
    birthdate: string,
    deathdate: string,
    bornin: string,
    diedin: string,
    father: string,
    mother: string,
    extrainfo: string,
}

interface Props {
    member: Request
    saveFunction:any
    deleteFunction:any
}

interface Person {
    fullname: string,
    data: Request[]|null
}

const RequestCard = ({member, saveFunction, deleteFunction}:Props) => {

    const [items, setItems] = useState<string[]>([]);
    const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
    const [itemOver, setItemOver] = useState<number|null>(null);
    const [itemDelete, setItemDelete] = useState<number|null>(null);
    const [editActive, setEditActive] = useState<boolean>(false)
    const [changes, setChanges] = useState<boolean>(false)
    const [inputs, setInputs] = useState<Inputs>({
        fullname: "",
        gender: "",
        birthdate: "",
        deathdate: "",
        bornin: "",
        diedin: "",
        father: "",
        mother: "",
        extrainfo: "",
    });
    const [familyInfo, setFamilyInfo] = useState({
        father: {},
        mother: {},
        children: [],
    })
    const [inputChildren, setInputChildren] = useState<Person[]>([]);
    const [potentialFathers, setPotentialFathers ] = useState<Person>({
        fullname: "",
        data: null
    });
    const [potentialMothers, setPotentialMothers ] = useState<Person>({
        fullname: "",
        data: null
    });
    const [potentialChildren, setPotentialChildren ] = useState<Person[]>([]);

    useEffect(() => {
        if (!member) return
        
        getSpecific(member.father, member.mother, member.children).then((response:any) => {
            setInputs({
                fullname: member.fullname,
                gender: member.gender,
                birthdate: member.birthdate,
                deathdate: member.deathdate,
                bornin: member.bornin,
                diedin: member.diedin,
                father: response.father.fullname,
                mother: response.mother.fullname,
                extrainfo: member.extrainfo,
            })
            setInputChildren(response.children)
            setItems(member.imageIds.content)
            setFamilyInfo({
                father: response.father,
                mother: response.mother,
                children: response.children
            })
            if (Object.keys(response.father).length > 0 && Object.keys(response.mother).length > 0 && response.children.length > 0) {
                const childrenNames:string[] = []
                response.children.forEach((child:Person) => {
                    childrenNames.push(child.fullname)
                })
                getPotentials(response.father.fullname, response.mother.fullname, childrenNames)
            }
        })
    
    }, [member])

    async function getSpecific(father:string, mother:string, children:string[]) {
        try {
            const response = await axios.post("/api/admin/members", {
                type: "SPECIFIC",
                data: {
                    father,
                    mother,
                    children
                }
            })

            return {
                father: response.data.data.father, 
                mother: response.data.data.mother, 
                children: response.data.data.children,
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }

    async function getPotentials(father:string, mother:string, children:string[]) {

        try {
            const response = await axios.post("/api/admin/members", {
                type: "POTENTIALS",
                data: {
                    father,
                    mother,
                    children
                }
            })

            setPotentialChildren(response.data.data.children)
            setPotentialFathers(response.data.data.father)
            setPotentialMothers(response.data.data.mother)

        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }

    const dragItem = useRef<any>(null)
    const dragOverItem = useRef<any>(null)

    const handleSort = () => {
        let _items = [...items];
        
        const draggedItemContent = _items.splice(dragItem.current, 1)[0];
        _items.splice(dragOverItem.current, 0, draggedItemContent)

        dragItem.current = null
        dragOverItem.current = null
        setItemOver(null)

        setItems(_items)
    }

    const dragOver = (index:number) => {
        dragOverItem.current = index
        setItemOver(index)
    }

    const handleDelete = async (index:number) => {
        const _items = items.filter((item:string) => item != items[index])
        setItems(_items)
        setItemsToDelete((oldState:string[]) => {return([...oldState, items[index]])})
    }

    const handleSave = async () => {
        console.log("save")
        console.log(inputs)
        setEditActive(false)
    }

  return (
    <>
    <div className='bg-green-700 border-2 border-green-300 flex flex-col gap-10
    p-4 rounded-lg w-full'>
        <div className="flex gap-5">
            {
                editActive
                ? <button onClick={() => handleSave()} className="button-style-1">Save</button>
                : <button onClick={() => setEditActive(true)} className="button-style-1">Edit</button>
            }
            <button onClick={() => deleteFunction(member._id, [...items, ...itemsToDelete])} className="button-style-1">Delete</button>
        </div>
        <div className='w-full flex lg:flex-row flex-col gap-5'>
                <div className="w-full flex gap-5 flex-col">
                    {
                        editActive
                        ? <>
                            <input className="w-full" type={"text"} placeholder="Name" 
                                value={inputs.fullname} onChange={(ev) => setInputs({
                                    fullname: ev.target.value,
                                    gender: inputs.gender,
                                    birthdate: inputs.birthdate,
                                    deathdate: inputs.deathdate,
                                    bornin: inputs.bornin,
                                    diedin: inputs.diedin,
                                    father: inputs.father,
                                    mother: inputs.mother,
                                    extrainfo: inputs.extrainfo
                                })} />
                            <select value={inputs.gender} onChange={(ev) => setInputs({
                                fullname: inputs.fullname,
                                gender: ev.target.value,
                                birthdate: inputs.birthdate,
                                deathdate: inputs.deathdate,
                                bornin: inputs.bornin,
                                diedin: inputs.diedin,
                                father: inputs.father,
                                mother: inputs.mother,
                                extrainfo: inputs.extrainfo
                            })}>
                                <option value={""}>Gender</option>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                            </select>
                            <div>
                                <label className="text-white" htmlFor="bornin">Date of Birth</label>
                                <input id="bornin" type={"date"} className="w-full" value={inputs.birthdate} onChange={(ev) => setInputs({
                                    fullname: inputs.fullname,
                                    gender: inputs.gender,
                                    birthdate: ev.target.value,
                                    deathdate: inputs.deathdate,
                                    bornin: inputs.bornin,
                                    diedin: inputs.diedin,
                                    father: inputs.father,
                                    mother: inputs.mother,
                                    extrainfo: inputs.extrainfo
                                    })}/>
                            </div>
                            <div>
                                <label className="text-white" htmlFor="diedin">Date if Death</label>
                                <input id="diedin" type={"date"} className="w-full" value={inputs.deathdate} onChange={(ev) => setInputs({
                                    fullname: inputs.fullname,
                                    gender: inputs.gender,
                                    birthdate: inputs.birthdate,
                                    deathdate: ev.target.value,
                                    bornin: inputs.bornin,
                                    diedin: inputs.diedin,
                                    father: inputs.father,
                                    mother: inputs.mother,
                                    extrainfo: inputs.extrainfo
                                    })}/>
                            </div>
                            <SelectCountry title="Country of birth" value={inputs.bornin} change={(ev:any) => setInputs({
                                fullname: inputs.fullname,
                                gender: inputs.gender,
                                birthdate: inputs.birthdate,
                                deathdate: inputs.deathdate,
                                bornin: ev.target.value,
                                diedin: inputs.diedin,
                                father: inputs.father,
                                mother: inputs.mother,
                                extrainfo: inputs.extrainfo
                            })}/>
                            <SelectCountry title="Country of death" value={inputs.diedin} change={(ev:any) => setInputs({
                                fullname: inputs.fullname,
                                gender: inputs.gender,
                                birthdate: inputs.birthdate,
                                deathdate: inputs.deathdate,
                                bornin: inputs.bornin,
                                diedin: ev.target.value,
                                father: inputs.father,
                                mother: inputs.mother,
                                extrainfo: inputs.extrainfo
                            })}/>

                            {

                            }

                            <textarea 
                                placeholder="Extra information" 
                                className="resize-none" 
                                rows={4} 
                                value={inputs.extrainfo} 
                                onChange={(ev:any) => setInputs({
                                    fullname: inputs.fullname,
                                    gender: inputs.gender,
                                    birthdate: inputs.birthdate,
                                    deathdate: inputs.deathdate,
                                    bornin: inputs.bornin,
                                    diedin: inputs.diedin,
                                    father: inputs.father,
                                    mother: inputs.mother,
                                    extrainfo: ev.target.value
                                })}/>
                        </>
                        : <>
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Name</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.fullname}</p>
                            </div>
                            {
                                inputs.gender &&
                                <div className="flex gap-5">
                                    <p className="bg-white p-4 rounded-lg">Gender</p>
                                    <p className="bg-white p-4 rounded-lg">{inputs.gender}</p>
                                </div>
                            }
                            {
                                inputs.birthdate &&
                                <div className="flex gap-5">
                                    <p className="bg-white p-4 rounded-lg">Birthdate</p>
                                    <p className="bg-white p-4 rounded-lg">{inputs.birthdate}</p>
                                </div>
                            }
                            {
                                inputs.bornin &&
                                <div className="flex gap-5">
                                    <p className="bg-white p-4 rounded-lg">Country of birth</p>
                                    <p className="bg-white p-4 rounded-lg">{inputs.bornin}</p>
                                </div>
                            }
                            {
                                inputs.deathdate &&
                                <div className="flex gap-5">
                                    <p className="bg-white p-4 rounded-lg">Deathdate</p>
                                    <p className="bg-white p-4 rounded-lg">{inputs.deathdate}</p>
                                </div>
                            }
                            {
                                inputs.diedin &&
                                <div className="flex gap-5">
                                    <p className="bg-white p-4 rounded-lg">Country of death</p>
                                    <p className="bg-white p-4 rounded-lg">{inputs.diedin}</p>
                                </div>
                            }
                            {
                                inputs.father &&
                                <div className="flex gap-5">
                                    <p className="bg-white p-4 rounded-lg">Father</p>
                                    <p className="bg-white p-4 rounded-lg">{inputs.father}</p>
                                </div>
                            }
                            {
                                inputs.mother &&
                                <div className="flex gap-5">
                                    <p className="bg-white p-4 rounded-lg">Mother</p>
                                    <p className="bg-white p-4 rounded-lg">{inputs.mother}</p>
                                </div>
                            }
                            {
                                inputChildren.map((child:any, index:number) => (
                                    <div className="flex gap-5">
                                        <p className="bg-white p-4 rounded-lg">Child - {index + 1}</p>
                                        <p className="bg-white p-4 rounded-lg">{child.fullname}</p>
                                    </div>
                                ))
                            }
                        </>
                    }
                </div>
                <div className="scollbar lg:w-full w-fit h-fit max-h-full overflow-y-auto grid md:grid-cols-2 grid-cols-1 gap-5">
                    {
                        items.length > 0 ?
                        items.map((item:any, index:number) => (
                            <div key={index}
                                draggable="true" 
                                className={`relative cursor-move w-fit flex justify-center 
                                items-center px-4 py-2 ${itemOver === index 
                                ? "bg-green-600 hover:bg-green-400 active:bg-green-600" 
                                : "bg-white hover:bg-gray-300 active:bg-gray-600"}
                                transition-colors rounded-lg duration-150 outline-none border-none`}
                                onDragStart={() => dragItem.current = index}
                                onDragEnter={() => dragOver(index)}
                                onDragEnd={() => handleSort()}
                                onDragOver={(e:any) => e.preventDefault()}
                                onClick={() => {
                                    if (itemDelete === null) {
                                        setItemDelete(index)
                                    } else {
                                        setItemDelete(null)
                                    }
                                }}
                                ><img src={item} className="w-full rounded-lg pointer-events-none"/>
                                <button onClick={() => handleDelete(index)} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-fit py-2 px-4 bg-red-500 rounded-lg hover:bg-red-400 active:bg-red-600 
                                transition-all duration-150 outline-none border-none ${itemDelete === index
                                ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>Delete</button>
                            </div>
                        ))
                        : <p className={`relative w-fit flex justify-center  items-center px-4 py-2 bg-white 
                        rounded-lg outline-none border-none`}>No Images Imported</p>
                    }
                </div>        
            </div>
        </div>
    </>
  )
}

export default RequestCard