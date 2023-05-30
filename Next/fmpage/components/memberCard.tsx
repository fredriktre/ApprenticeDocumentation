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
    const [inputChildren, setInputChildren] = useState<string[]>([]);

    useEffect(() => {
        if (!member) return

        setInputs({
            fullname: member.fullname,
            gender: member.gender,
            birthdate: member.birthdate,
            deathdate: member.deathdate,
            bornin: member.bornin,
            diedin: member.diedin,
            father: member.father,
            mother: member.mother,
            extrainfo: member.extrainfo,
        })
        setInputChildren(member.children)
        setItems(member.imageIds.content)
    }, [member])

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
        console.log(member)
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
                                <label className="text-white" htmlFor="bornin">Country of birth</label>
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
                                <label className="text-white" htmlFor="diedin">Country of death</label>
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
                            {/* {
                                inputs.father.length > 0 &&
                                potentialFathers.data !== null &&
                                potentialFathers.data.length > 0
                                ?<div className="flex gap-5">
                                        <select onChange={(ev) => setFatherCustom(ev.target.value)} 
                                        className={`${fatherCustom === "custom" ? "w-1/6" : "w-full"}`}>
                                            {
                                                potentialFathers.data.map((pchild:Request, index:number) => {
                                                    return(
                                                        <option key={index} value={`${index}`}>{index} - {pchild.fullname}</option>
                                                    )
                                                })
                                            }
                                            <option value={"custom"}>Custom</option>
                                        </select>
                                        {
                                            fatherCustom === "custom" ?
                                            <input type={"text"} className="w-full" value={inputs.father} onChange={(ev) => setInputs({
                                                fullname: inputs.fullname,
                                                gender: inputs.gender,
                                                birthdate: inputs.birthdate,
                                                deathdate: inputs.deathdate,
                                                bornin: inputs.bornin,
                                                diedin: inputs.diedin,
                                                father: ev.target.value,
                                                mother: inputs.mother,
                                                extrainfo: inputs.extrainfo
                                            })}/>
                                            : <button onClick={() => {
                                                const pdata = potentialFathers.data as Request[]
                                                setCheckFoundData(pdata[parseInt(fatherCustom)])
                                            }} 
                                            className="button-style-1 whitespace-nowrap">Check Data</button>
                                        }
                                    </div>
                                :   <input type={"text"} className="w-full" value={inputs.father} onChange={(ev) => setInputs({
                                       fullname: inputs.fullname,
                                       gender: inputs.gender,
                                       birthdate: inputs.birthdate,
                                       deathdate: inputs.deathdate,
                                       bornin: inputs.bornin,
                                       diedin: inputs.diedin,
                                       father: ev.target.value,
                                       mother: inputs.mother,
                                       extrainfo: inputs.extrainfo
                                    })}/>
                            }
                            {
                                inputs.mother.length > 0 &&
                                potentialMothers.data !== null &&
                                potentialMothers.data.length > 0
                                ?<div className="flex gap-5">
                                        <select onChange={(ev) => setMotherCustom(ev.target.value)} 
                                        className={`${motherCustom === "custom" ? "w-1/6" : "w-full"}`}>
                                            {
                                                potentialMothers.data.map((pchild:Request, index:number) => {
                                                    return(
                                                        <option key={index} value={`${index}`}>{index} - {pchild.fullname}</option>
                                                    )
                                                })
                                            }
                                            <option value={"custom"}>Custom</option>
                                        </select>
                                        {
                                            motherCustom === "custom" ?
                                            <input type={"text"} className="w-full" value={inputs.mother} onChange={(ev) => setInputs({
                                                fullname: inputs.fullname,
                                                gender: inputs.gender,
                                                birthdate: inputs.birthdate,
                                                deathdate: inputs.deathdate,
                                                bornin: inputs.bornin,
                                                diedin: inputs.diedin,
                                                father: inputs.father,
                                                mother: ev.target.value,
                                                extrainfo: inputs.extrainfo
                                            })}/>
                                            : <button onClick={() => {
                                                const pdata = potentialMothers.data as Request[]
                                                setCheckFoundData(pdata[parseInt(motherCustom)])
                                            }} 
                                            className="button-style-1 whitespace-nowrap">Check Data</button>
                                        }
                                    </div>
                                :   <input type={"text"} className="w-full" value={inputs.mother} onChange={(ev) => setInputs({
                                       fullname: inputs.fullname,
                                       gender: inputs.gender,
                                       birthdate: inputs.birthdate,
                                       deathdate: inputs.deathdate,
                                       bornin: inputs.bornin,
                                       diedin: inputs.diedin,
                                       father: inputs.father,
                                       mother: ev.target.value,
                                       extrainfo: inputs.extrainfo
                                    })}/>
                            }
                            {
                                inputChildren.length > 0 &&
                                inputChildren.map((child:string, index:number) => {
                                    
                                    if (potentialChildren.length > 0) {
                                        const PCData = potentialChildren[index].data as Request[]
                                        if (PCData.length > 0) {
                                            return(
                                                <div key={child} className="flex gap-5">
                                                    <select onChange={(ev) => setChildCustom((oldState:string[]) => {
                                                        const data = oldState
                                                        data[index] = ev.target.value
                                                        setChanges(!changes)
                                                        return (data)
                                                    })} className={`${childCustom[index] === "custom" ? "w-1/6" : "w-full"}`}>
                                                        {
                                                            PCData.map((pchild:Request, index:number) => {
                                                                return(
                                                                    <option key={index} value={`${index}`}>{index} - {pchild.fullname}</option>
                                                                )
                                                            })
                                                        }
                                                        <option value={"custom"}>Custom</option>
                                                    </select>
                                                    {
                                                        childCustom[index] === "custom" ?
                                                        <input type={"text"} className="w-full" value={inputChildren[index]} onChange={(ev) => setInputChildren(
                                                            (OldState:string[]) => {
                                                                const data = OldState
                                                                data[index] = ev.target.value
                                                                setChanges(!changes)
                                                                return (data)
                                                            }
                                                        )}/>
                                                        :<button onClick={() => setCheckFoundData(PCData[parseInt(childCustom[index])])} 
                                                        className="button-style-1 whitespace-nowrap">Check Data</button>
                                                    }
                                                </div>
                                            )                                
                                        } else {
                                            return (
                                                <input key={child} type={"text"} className="w-full" value={inputChildren[index]} onChange={(ev) => setInputChildren(
                                                    (OldState:string[]) => {
                                                        const data = OldState
                                                        data[index] = ev.target.value
                                                        setChanges(!changes)
                                                        return (data)
                                                    }
                                                )}/>
                                            )
                                        }
                                    
                                    }
                                
                                })
                            } */}
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
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Gender</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.gender}</p>
                            </div>
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Birthdate</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.birthdate}</p>
                            </div>
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Country of birth</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.bornin}</p>
                            </div>
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Deathdate</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.deathdate}</p>
                            </div>
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Country of death</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.diedin}</p>
                            </div>
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Father</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.father}</p>
                            </div>
                            <div className="flex gap-5">
                                <p className="bg-white p-4 rounded-lg">Mother</p>
                                <p className="bg-white p-4 rounded-lg">{inputs.mother}</p>
                            </div>
                            {
                                inputChildren.map((child:any, index:number) => (
                                    <div className="flex gap-5">
                                        <p className="bg-white p-4 rounded-lg">Child - {index}</p>
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