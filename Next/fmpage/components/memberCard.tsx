import Link from "next/link"
import { useEffect, useRef, useState, DragEvent, Children } from "react"
import { Request } from "@/pages/admin"
import SelectCountry from "./SelectCountry"

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
    acceptFunction:any
    deleteFunction:any
}

const MemberCard = ({member, acceptFunction, deleteFunction}:Props) => {
    const [editOn, setEditOn] = useState<boolean>(false)
    const [items, setItems] = useState<string[]>([]);
    const [itemOver, setItemOver] = useState<number|null>(null);
    const [itemDelete, setItemDelete] = useState<number|null>(null);
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
        setItems(member.imageIds.content)
        console.log(member.imageIds)
    }, [member])

    useEffect(() => {
        console.log(items)
    }, [items])

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

    const handleDelete = (index:number) => {
        const _items = items.filter((item:string) => item != items[index])
        setItems(_items)
    }

  return (
    <div key={member._id} className='bg-green-700 border-2 border-green-300 flex flex-col gap-10
    p-4 rounded-lg w-full'>
        <div className="flex gap-5">
            {
                editOn ?
                <>
                    <button onClick={() => acceptFunction({
                        _id: member._id,
                        __v: member.__v,
                        ...inputs,
                        children: inputChildren,
                        imageIds: items
                    })} className="button-style-1">Save</button>
                    <button onClick={() => deleteFunction(member._id)} className="button-style-1">Delete</button>
                </>
                :
                <>
                    <button onClick={() => setEditOn(true)} className="button-style-1">Edit</button>
                </>
            }
        </div>
        <div className='w-full flex lg:flex-row flex-col gap-5'>
            <div className='w-full h-fit flex flex-col gap-5'>

                {
                    editOn ?
                    <>
                        <div className="flex gap-5">
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
                            <div className="flex gap-5">
                                <input type={"date"} className="w-full" value={inputs.birthdate} onChange={(ev) => setInputs({
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
                                {
                                    inputs.deathdate.length > 0 &&
                                    <input type={"date"} className="w-full" value={inputs.deathdate} onChange={(ev) => setInputs({
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
                                }
                            </div>
                            <div className="flex gap-5">
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
                                {
                                    inputs.diedin.length > 0 &&
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
                                }
                            </div>
                            <input type={"text"} placeholder="Father" value={inputs.father} onChange={(ev) => setInputs({
                                fullname: inputs.fullname,
                                gender: inputs.gender,
                                birthdate: inputs.birthdate,
                                deathdate: inputs.deathdate,
                                bornin: inputs.bornin,
                                diedin: inputs.diedin,
                                father: ev.target.value,
                                mother: inputs.mother,
                                extrainfo: inputs.extrainfo
                            })} />
                            <input type={"text"} placeholder="Mother" value={inputs.mother} onChange={(ev) => setInputs({
                                fullname: inputs.fullname,
                                gender: inputs.gender,
                                birthdate: inputs.birthdate,
                                deathdate: inputs.deathdate,
                                bornin: inputs.bornin,
                                diedin: inputs.diedin,
                                father: inputs.father,
                                mother: ev.target.value,
                                extrainfo: inputs.extrainfo
                            })} />
                            {
                                inputChildren.map((child:any, index:number) => (
                                    <input type={"text"} placeholder="Mother" value={inputs.mother} 
                                    onChange={(ev) => setInputChildren((oldState) => {
                                        const data = oldState
                                        data[index] = ev.target.value
                                        setChanges(!changes)
                                        return data
                                    })} />
                                ))
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
                              })}
                            />
                        </div>
                        <div className="scollbar lg:w-full w-fit h-fit max-h-full overflow-y-auto grid md:grid-cols-2 grid-cols-1 gap-5">
                            {
                                items.length > 0 &&
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
                            }
                        </div>
                    </>
                    :
                    <>

                    </>
                }

            </div>    
        </div>
    </div>
  )
}

export default MemberCard