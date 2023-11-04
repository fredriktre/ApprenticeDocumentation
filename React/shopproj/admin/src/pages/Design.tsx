import { useState } from "react"

type ElementImage = {
    type: string
    src: string,
    id: string,
    file: any,
    x: number,
    y: number,
    width: number,
}
type ElementText = {
    font: string
    type: string,
    id: string,
    x: number,
    y: number,
    text: string,
    fontsize: number,
}

type ProviderData = {
    provider: number,
    title: string,
    blueprints: any[]
}

const Design = () => {    
    const [elements, setElements] = useState<any[]>([]);
    const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);
    const [currentlyMovingSettings, setCurrentlyMovingSettings] = useState({
        id: "",
        startWidth: 0,
        mouseX: 0,
        mouseY: 0,
        offsetX: 0,
        offsetY: 0,
    });    
    const [resizing, setResizing] = useState<boolean>(false)
    const [designScreenPlacement, setDesignScreenPlacement] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })
    const [providerData, setProviderData] = useState<ProviderData>({
        provider: 30,
        title: "",
        blueprints: [],
    })
    const [blueprintData, setBlueprintData] = useState({
        brand: "",
        id: 0,
        images: [],
        model: "",
        title: "",
    }) 
    const [variantsData, setVariantsData] = useState({

    })
    const [blueprintsMenuOpen, setBlueprintsMenuOpen] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)

    const alphabetAndNumbers = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"
    ];

    function makeID () {
        let ID = "E"

        for (let i = 0; i < 15; i++) {
            ID = `${ID}${alphabetAndNumbers[Math.floor(Math.random() * alphabetAndNumbers.length)]}`
        }

        return ID
    } 

    const handleAddImage = async (event:any) => {
        const blob:any = await readFile(event.target.files[0])
        setElements((oldElements) => [...oldElements, {
            type: "image",
            src: `${blob}`,
            id: makeID(),
            file: event.target.files[0],
            x: 0,
            y: 0,
            width: 100,
        }])
    }

    async function readFile (target:any) {
        return new Promise((resolve:any) => {
          const reader = new FileReader();
          reader.onload = (evt:any) => {
            resolve(evt.target.result);
          }
          reader.readAsDataURL(target);
        })
    }

    const startElementEditing = (id:string, event:any) => {
        const currentElement = elements.filter((element:ElementImage) => element.id === id)[0];
        setIsMouseMoving(true);
        
        const bcr = event.target.getBoundingClientRect();
        
        setCurrentlyMovingSettings({
            id: id,
            startWidth: currentElement.width,
            mouseX: event.clientX,
            mouseY: event.clientY,
            offsetY: (bcr.top - designScreenPlacement.y) - event.clientY,
            offsetX: (bcr.left - designScreenPlacement.x) - event.clientX,
        });
        setRefresh(!refresh);
    }

    const handleMovement = (event:any) => {
        if (isMouseMoving && resizing) {
            const oldArray = elements;
            let currentElement = oldArray.filter((element:ElementImage) => element.id === currentlyMovingSettings.id)[0];
            const index = oldArray.findIndex((element:ElementImage) => element.id === currentlyMovingSettings.id);
            const newWidth = (currentlyMovingSettings.startWidth + event.clientX - currentlyMovingSettings.mouseX);
            currentElement.width = newWidth;
            oldArray[index] = currentElement;
            setElements(oldArray);
            setRefresh(!refresh);
        } else if (isMouseMoving && !resizing) {
            const oldArray = elements;
            let currentElement = oldArray.filter((element:ElementImage) => element.id === currentlyMovingSettings.id)[0];
            const index = oldArray.findIndex((element:ElementImage) => element.id === currentlyMovingSettings.id);
            currentElement.x = (event.clientX + currentlyMovingSettings.offsetX);
            currentElement.y = (event.clientY + currentlyMovingSettings.offsetY);
            oldArray[index] = currentElement;
            setElements(oldArray);
            setRefresh(!refresh);
        }   
    }

    const handleElementRemove = (id:string) => {
        const newArray = elements.filter((element:ElementImage) => element.id != id);
        setElements(newArray);
    }

    const handleDesignScreenPos = (event:any) => {
        if (designScreenPlacement.width === 0) {
            const bcr = event.target.childNodes[0].getBoundingClientRect();
            console.log(bcr);
            setDesignScreenPlacement({
                y: bcr.top,
                x: bcr.left,
                width: bcr.width,
                height: bcr.height,
            });
        }
    }

    const addTextBox = () => {
        setElements((oldElements) => [...oldElements, {
            type: "text",
            id: makeID(),
            x: 0,
            y: 0,
            text: "Write here",
            fontsize: 18,
            font: "'Roboto'",
        }]);
    }

    const handleTextChange = async (event:any, id:string) => {
        const oldArray = elements;
        let currentElement = oldArray.filter((element:ElementText) => element.id === id)[0];
        let index = oldArray.findIndex((element:ElementText) => element.id === id);
        const text = event.target.value;
        const newElement:ElementText = {
            font: currentElement.font,
            fontsize: currentElement.fontsize,
            id: currentElement.id,
            text: text,
            type: currentElement.type,
            x: currentElement.x,
            y: currentElement.y
        }
        console.log(index);

        oldArray[index] = newElement;

        console.log(newElement);
        console.log(oldArray[index]);

        setElements(oldArray);
        setRefresh(!refresh);
    }

    // const getProviders = async () => {
    //     console.log("start attempt")

    //     try {

    //         const res = await fetch("/api/getproviders", {
    //             method: "GET",
    //         });
    //         const data = await res.json();
    //         const providers = data.body
    //         console.log(data)

    //         for (let i = 0; i < providers.length; i++) {
    //             if (providers[i].location.country != "US" && providers[i].location.country != "CN") {
    //                 console.log("EU location")
    //                 console.log(providers[i].location.country)
    //                 const res = await fetch(`/api/getprovider/${providers[i].id}`, {
    //                     method: "GET",
    //                 });
    //                 const data = await res.json();
    //                 data.body.blueprints
    //             } else {
    //                 console.log("!EU location")
    //             }
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getBlueprints = async () => {
        console.log("start attempt");

        try {

            const res = await fetch("/api/getprovider/30", {
                method: "GET",
            });
            const data = await res.json();
            console.log(data);

            const newBlueprints:any[] = [];

            data.body.blueprints.forEach((element:any) => {
                console.log(element)
                newBlueprints.push({
                    brand: element.brand,
                    id: element.id,
                    images: element.images,
                    model: element.model,
                    title: element.title,
                })
            });

            setProviderData({
                provider: providerData.provider,
                title: data.body.title,
                blueprints: newBlueprints
            })

            // const variants:any[] = [];
            // for (let i = 0; i < blueprints.length; i++) {
            //     if (blueprints[i].id < 5000) {
            //         const variant = await getVariants(blueprints[i].id);
            //         variants.push(variant);
            //     }
            // }
            // console.log(variants);

        } catch (error) {
            console.log(error);
        }
    }

    const getVariants = (id:number) => {
        return new Promise(async (resolve:any) => {            
                    try {
            
                        const res = await fetch(`/api/getblueprint/${id}/30`, {
                            method: "GET",
                        });
                        const data = await res.json();
            
                        resolve(data)
                    } catch (error) {
                        console.log(error);
                    }
        })
    }

    return (
        <main className="design-page">

            <div className="design-tool-container">
                <div className="assets-nav">
                    <div className="file-button">
                        <input 
                            type="file" 
                            accept="image/png, image/jpg"
                            multiple={false}
                            onChange={(event) => handleAddImage(event)} />
                        <p>Add Image</p>
                    </div>
                    <button className="button"
                    onMouseDown={addTextBox}>
                        Add Text
                    </button>
                    {/* <button className="button"
                    onMouseDown={getProviders}>
                        getproviders
                    </button> */}
                    <button className="button"
                    onMouseDown={getBlueprints}>
                        get blueprints
                    </button>
                    <button className="button"
                    onMouseDown={() => setBlueprintsMenuOpen(true)}>
                        {blueprintData.id != 0 ? `${blueprintData.title}` : "Pick Blueprint"}
                    </button>
                </div>
        
                <div className={`design-screen-container ${isMouseMoving ? "hide-cursor" : ""}`}
                onMouseEnter={(event) => handleDesignScreenPos(event)}
                onMouseMove={(event) => handleMovement(event)}
                onMouseUp={() => {
                    setIsMouseMoving(false)
                    if (resizing) {
                        setResizing(false)
                    }
                }}
                >
                    <div className="design-screen">
                        {
                            elements.map((element:any, index:number) => {


                                if (element.type === "image") {
                                    return (
                                        <div onMouseDown={(event) => startElementEditing(element.id, event)}
                                        className="element" 
                                        id={`${element.id}`} 
                                        key={`${element.id}${index}`}
                                        style={{
                                            top: element.y,
                                            left: element.x,
                                            width: `${element.width}px`,
                                        }}>
                                            <div className={`element-toolbar ${currentlyMovingSettings.id === element.id && "moving"}`}>
                                                <button
                                                onMouseDown={() => {
                                                    handleElementRemove(element.id)
                                                    setResizing(false)
                                                    setCurrentlyMovingSettings({
                                                        id: "",
                                                        startWidth: 0,
                                                        mouseX: 0,
                                                        mouseY: 0,
                                                        offsetY: 0,
                                                        offsetX: 0,
                                                    })
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <button
                                                onMouseDown={(event) => {
                                                    startElementEditing(element.id, event)
                                                    setResizing(true)
                                                }}
                                                onMouseUp={() => {
                                                    setIsMouseMoving(false)
                                                    setResizing(false)
                                                }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                    </svg>
                                                </button>
                                            </div> 
                                            <img src={element.src} />
                                        </div>
                                    )
                                } else if (element.type === "text") {
                                    return (
                                        <div onMouseDown={(event) => startElementEditing(element.id, event)}
                                        className="element" 
                                        id={`${element.id}`} 
                                        key={`${element.id}${index}`}
                                        style={{
                                            top: element.y,
                                            left: element.x,
                                        }}>
                                            <div className={`element-toolbar ${currentlyMovingSettings.id === element.id && "moving"}`}>
                                                <button
                                                onMouseDown={() => {
                                                    handleElementRemove(element.id)
                                                    setCurrentlyMovingSettings({
                                                        id: "",
                                                        startWidth: 0,
                                                        mouseX: 0,
                                                        mouseY: 0,
                                                        offsetY: 0,
                                                        offsetX: 0,
                                                    })
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div> 
                                            <input 
                                                className={`${currentlyMovingSettings.id === element.id || element.text.length < 1 ? "moving" : ""}`}
                                                style={{
                                                    fontSize: `${element.fontsize}px`,
                                                    fontFamily: `${element.font}`,
                                                }}
                                                type="text" 
                                                value={element.text} 
                                                onChange={(event) => handleTextChange(event, element.id)} />
                                        </div>
                                    )
                                }

                            }
                                
                            )
                        }
                    </div>
                </div>
        
                <div className="settings-nav">
        
                </div>
            </div>
            <div className={`blueprints-modal ${blueprintsMenuOpen ? "open" : ""}`}>

                <div className={`blueprints-modal-grid`}>
                    {
                        providerData.blueprints.map((blueprint:any, index:number) => (
                            <div
                                className="grid-item"
                                onPointerDown={() => setBlueprintData({
                                    brand: blueprint.brand,
                                    id: blueprint.id,
                                    images: blueprint.images,
                                    model: blueprint.model,
                                    title: blueprint.title,
                                })}>
                                <button>

                                </button>
                                {
                                    blueprint.images.map((image:string, index:number) => (
                                        <img src={image} alt={`${blueprint.id}-productimage-${index}`}
                                        className={`shown`} />
                                    ))
                                }
                                <button>

                                </button>
                            </div>
                        ))
                    }
                </div>
            
                <button className="close-btn" onPointerDown={() => setBlueprintsMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <span></span>
            </div>
        </main>
    )
}

export default Design