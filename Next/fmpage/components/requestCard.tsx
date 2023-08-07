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
    request: Request
    acceptFunction:any
    deleteFunction:any
}

interface Person {
    fullname: string,
    data: Request[]|null
}

const RequestCard = ({request, acceptFunction, deleteFunction}:Props) => {

    const [items, setItems] = useState<string[]>([]);
    const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
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
    const [potentialFathers, setPotentialFathers ] = useState<Person>({
        fullname: "",
        data: null
    });
    const [potentialMothers, setPotentialMothers ] = useState<Person>({
        fullname: "",
        data: null
    });
    const [potentialChildren, setPotentialChildren ] = useState<Person[]>([]);
    const [fatherCustom, setFatherCustom] = useState<string>("custom");
    const [motherCustom, setMotherCustom] = useState<string>("custom");
    const [childCustom, setChildCustom] = useState<string[]>([]);
    const [checkFoundData, setCheckFoundData] = useState<Request|null>(null);

    useEffect(() => {
        if (!request) return

        setInputs({
            fullname: request.fullname,
            gender: request.gender,
            birthdate: request.birthdate,
            deathdate: request.deathdate,
            bornin: request.bornin,
            diedin: request.diedin,
            father: request.father,
            mother: request.mother,
            extrainfo: request.extrainfo,
        })
        setInputChildren(request.children)
        setItems(request.imageIds.content)

        getPotentials(request.father, request.mother, request.children);

    }, [request])

    useEffect(() => {
        if (potentialChildren) {
            if (childCustom.length > 0) return
            const data:any = []
            potentialChildren.forEach((child:any, index:number) => {
                if (child.data.length > 0 && child.data !== null) {
                    data.push("0")
                } else {
                    data.push("custom")
                }
            })
            setChildCustom((oldState:string[]) => {
                return ([...data])
            })
        } else {
            setChildCustom((oldState:string[]) => {
                return ([...oldState])
            }) 
        }
    }, [potentialChildren])

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

    function handleAcceptData () {

        const children:Request[] = []
        potentialChildren.forEach((child:Person, index:number) => {
            if (childCustom[index] === "custom") {
                const newChild:Request = {
                    _id: "",
                    __v: 0,
                    email: "",
                    fullname: inputChildren[index],
                    gender: "",
                    birthdate: "",
                    deathdate: "",
                    bornin: "",
                    diedin: "",
                    father: "",
                    mother: "",
                    extrainfo: "",
                    children: [],
                    imageIds: {
                        folderId: "",
                        content: [],
                    }
                }
                children.push(newChild)
            } else {
                const cdarr = child.data as Request[]
                const value = parseInt(childCustom[index])
                const chosenChild = cdarr[value]
                children.push(chosenChild)
            }
        })
        let father = {}
        if (fatherCustom === "custom") {
            const newFather:Request = {
                _id: "",
                __v: 0,
                email: "",
                fullname: inputs.father,
                gender: "male",
                birthdate: "",
                deathdate: "",
                bornin: "",
                diedin: "",
                father: "",
                mother: "",
                extrainfo: "",
                children: [],
                imageIds: {
                    folderId: "",
                    content: [],
                }
            }
            father = newFather
        } else {
            const fdarr = potentialFathers.data as Request[]
            const value = parseInt(fatherCustom)
            father = fdarr[value]
        }
        let mother = {}
        if (motherCustom === "custom") {
            const newMother:Request = {
                _id: "",
                __v: 0,
                email: "",
                fullname: inputs.mother,
                gender: "female",
                birthdate: "",
                deathdate: "",
                bornin: "",
                diedin: "",
                father: "",
                mother: "",
                extrainfo: "",
                children: [],
                imageIds: {
                    folderId: "",
                    content: [],
                }
            }
            mother = newMother
        } else {
            const mdarr = potentialMothers.data as Request[]
            const value = parseInt(motherCustom)
            mother = mdarr[value]
        }
        
        return {
            _id: request._id,
            __v: request.__v,
            email: request.email,
            fullname: inputs.fullname,
            gender: inputs.gender,
            birthdate: inputs.birthdate,
            deathdate: inputs.deathdate,
            bornin: inputs.bornin,
            diedin: inputs.diedin,
            father: father,
            mother: mother,
            extrainfo: inputs.extrainfo,
            children: [...children],
            imageIds: {
                folderId: request.imageIds.folderId,
                content: [...items],
            }
        }
    }

  return (
    <>
    <div className={`fixed top-0 left-0 z-[100] w-full h-full 
    ${checkFoundData ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    transition-all duration-300`}>
        <div className=" w-full h-full relative flex justify-center items-center">
            <button onClick={() => setCheckFoundData(null)} 
            className="button-style-1 absolute z-[110] right-5 top-5">X</button>
            <div className='bg-green-800 border-2 border-green-300 flex flex-col gap-5
            p-4 rounded-lg w-4/5 absolute z-[105]'>
                <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">
                    Name: {checkFoundData?.fullname}
                </p>
                <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">
                    Gender: {checkFoundData?.gender}
                </p>
                <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">
                    Birthdate: {checkFoundData?.birthdate}
                </p>
                {
                    checkFoundData?.deathdate &&
                    checkFoundData?.deathdate.length > 0 &&
                    <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">Deathdate: {checkFoundData?.deathdate}</p>
                }
                <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">Country of birth: {checkFoundData?.bornin}</p>
                {
                    checkFoundData?.diedin &&
                    checkFoundData?.diedin.length > 0 &&
                    <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">Country of death: {checkFoundData?.diedin}</p>
                }
                <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">Father: {checkFoundData?.father}</p>
                                  <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">Mother: {checkFoundData?.mother}</p>
                {
                    checkFoundData?.children.map((child:any, index:number) => (
                        <p key={index} className="outline-none border-4 border-transparent
                        rounded-lg p-2 focus:border-green-300 bg-white">Child-{index}: {child}</p>
                    ))
                }
                {
                    checkFoundData?.extrainfo &&
                    checkFoundData?.extrainfo.length > 0 &&
                    <p className="outline-none border-4 border-transparent
                    rounded-lg p-2 focus:border-green-300 bg-white">Extra info: {checkFoundData?.extrainfo}</p>
                }
            </div>
            <span className="absoulute top-0 left-0 bg-black opacity-40 w-full h-full block"></span>
        </div>
    </div>
    <div key={request._id} className='bg-green-700 border-2 border-green-300 flex flex-col gap-10
    p-4 rounded-lg w-full'>
        <div className="flex gap-5">
            <Link href={`mailto:${request.email}`} className='button-style-1'>{request.email}</Link>
            <button onClick={() => acceptFunction(handleAcceptData(), itemsToDelete)} className="button-style-1">Accept</button>
            <button onClick={() => deleteFunction(request._id, [...items, ...itemsToDelete])} className="button-style-1">Delete</button>
        </div>
      <div className='w-full flex lg:flex-row flex-col gap-5'>
        <div className='w-full h-fit flex flex-col gap-5'>
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
            </div>
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
                {
                    inputs.father.length > 0 &&
                    potentialFathers.data !== null &&
                    potentialFathers.data.length > 0
                    ?<div className="flex gap-5">
                            <select onChange={(ev) => setFatherCustom(ev.target.value)} 
                            className={`${fatherCustom === "custom" ? "w-1/6" : "w-full"}`}>
                                <option value={"custom"}>Custom</option>
                                {
                                    potentialFathers.data.map((pchild:Request, index:number) => {
                                        return(
                                            <option key={index} value={`${index}`}>{index} - {pchild.fullname}</option>
                                        )
                                    })
                                }
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
                                <option value={"custom"}>Custom</option>
                                {
                                    potentialMothers.data.map((pchild:Request, index:number) => {
                                        return(
                                            <option key={index} value={`${index}`}>{index} - {pchild.fullname}</option>
                                        )
                                    })
                                }
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
                                            <option value={"custom"}>Custom</option>
                                            {
                                                PCData.map((pchild:Request, index:number) => {
                                                    return(
                                                        <option key={index} value={`${index}`}>{index} - {pchild.fullname}</option>
                                                    )
                                                })
                                            }
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