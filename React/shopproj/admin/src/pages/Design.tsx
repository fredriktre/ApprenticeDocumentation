import { useEffect, useState } from "react"
import DDWrap from "../components/dropdown/DDWrap"
import DDOption from "../components/dropdown/DDOption"

type ElementImage = {
    type: string
    src: string,
    id: string,
    file: any,
    x: number,
    y: number,
    rotation: number,
    width: number,
}

type ElementText = {
    font: string
    type: string,
    id: string,
    x: number,
    y: number,
    rotation: number,
    text: string,
    fontsize: number,
}

type ProviderData = {
    provider: number,
    title: string,
    blueprints: BlueprintType[]
}

type BlueprintType = {
    brand: string,
    id: number,
    images: string[],
    model: string,
    title: string
}

type VariantParentType = {
    id: number,
    title: string,
    variants: VariantsType[],
    sizes: string[],
    colors: string[]
}

type VariantsType = {
    id: number,
    options: any[],
    placeholder: any[],
    title: string
}

type movingSettingsType = {
    id: string,
    type: string,
    startWidth: number,
    mouseX: number,
    mouseY: number,
    offsetX: number,
    offsetY: number,
    currentElementData: ElementImage|ElementText|any
}

const Design = () => {    
    const [elements, setElements] = useState<any[]>([]);
    const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);
    const [currentlyMovingSettings, setCurrentlyMovingSettings] = useState<movingSettingsType>({
        id: "",
        type: "",
        startWidth: 0,
        mouseX: 0,
        mouseY: 0,
        offsetX: 0,
        offsetY: 0,
        currentElementData: {}
    });   
    const [resizing, setResizing] = useState<boolean>(false)
    const [rotating, setRotating] = useState<boolean>(false)
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
    const [blueprintData, setBlueprintData] = useState<BlueprintType>({
        brand: "",
        id: 0,
        images: [],
        model: "",
        title: "",
    }) 
    const [variantsData, setVariantsData] = useState<VariantParentType>({
        id: 0,
        title: "",
        variants: [],
        sizes: [],
        colors: []
    })
    const [blueprintsMenuOpen, setBlueprintsMenuOpen] = useState<boolean>(false)
    const [variantsMenuOpen, setVariantsMenuOpen] = useState<boolean>(false)
    const [currentBlueprintImage, setCurrentBlueprintImage] = useState({
        currentID: 0,
        showingNum: 0
    })
    const [colorList, setColorList] = useState<any[]>([]);
    const [activeColors, setActiveColors] = useState<any[]>([]);
    const [activeSizes, setActiveSizes] = useState<any[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false)

    const availableFonts = [
        "Arial",
        "Brush Script MT",
        "Courier New",
        "Garamond",
        "Georgia",
        "'Inter'",
        "'Noto Sans'",
        "'Roboto'", 
        "Tahoma",
        "Times New Roman",
        "Verdana",
    ]

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

    async function readFile (target:any) {
        return new Promise((resolve:any) => {
          const reader = new FileReader();
          reader.onload = (evt:any) => {
            resolve(evt.target.result);
          }
          reader.readAsDataURL(target);
        })
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
            rotation: 0,
            width: 100,
        }])
    }    

    const startElementEditing = (id:string, event:any) => {
        const currentElement = elements.filter((element:ElementImage) => element.id === id)[0];
        setIsMouseMoving(true);
        
        const bcr = event.target.getBoundingClientRect();

        setCurrentlyMovingSettings({
            id: id,
            type: currentElement.type,
            startWidth: currentElement.width,
            mouseX: event.clientX,
            mouseY: event.clientY,
            offsetY: (bcr.top - designScreenPlacement.y) - event.clientY,
            offsetX: (bcr.left - designScreenPlacement.x) - event.clientX,
            currentElementData: currentElement
        });
        setRefresh(!refresh);
    }

    const handleMovement = (event:any) => {
        if (isMouseMoving && resizing && !rotating) {

            const oldArray = elements;
            let currentElement = oldArray.filter((element:ElementImage) => element.id === currentlyMovingSettings.id)[0];
            const index = oldArray.findIndex((element:ElementImage) => element.id === currentlyMovingSettings.id);

            const newWidth = (currentlyMovingSettings.startWidth + event.clientX - currentlyMovingSettings.mouseX);
            currentElement.width = newWidth;


            oldArray[index] = currentElement;
            setElements(oldArray);
            setRefresh(!refresh);

        } else if (isMouseMoving && !resizing && !rotating) {

            const oldArray = elements;
            let currentElement = oldArray.filter((element:ElementImage) => element.id === currentlyMovingSettings.id)[0];
            const index = oldArray.findIndex((element:ElementImage) => element.id === currentlyMovingSettings.id);

            currentElement.x = (event.clientX + currentlyMovingSettings.offsetX);
            currentElement.y = (event.clientY + currentlyMovingSettings.offsetY);

            oldArray[index] = currentElement;
            setElements(oldArray);
            setRefresh(!refresh);

        } else if (isMouseMoving && !resizing && rotating) {

            const oldArray = elements;
            let currentElement = oldArray.filter((element:ElementImage) => element.id === currentlyMovingSettings.id)[0];
            const index = oldArray.findIndex((element:ElementImage) => element.id === currentlyMovingSettings.id);
            const htmlElement = document.getElementById(`${currentElement.id}`)

            if (htmlElement != null) {
                const {left, top, width, height} = htmlElement.getBoundingClientRect();

                const mos = {
                    x: left + width / 2, 
                    y: top + height / 2
                };
    
                const rad = Math.atan2(event.clientY - mos.y, event.clientX - mos.x);
                const rawAngle = (rad * 2) * (180/Math.PI);

                let angle = rawAngle % 360;

                if (angle < 0) {
                    angle += 360
                }

                currentElement.rotation = angle;
    
                oldArray[index] = currentElement;
                setElements(oldArray);
                setRefresh(!refresh);
            } else {
                throw new Error("Can't find Element")
            }
            
        }
    }

    const handleElementRemove = (id:string) => {
        const newArray = elements.filter((element:ElementImage) => element.id != id);
        setElements(newArray);
    }

    const handleDesignScreenPos = (event:any) => {
        if (designScreenPlacement.width === 0) {
            const bcr = event.target.childNodes[0].getBoundingClientRect();
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
            rotation: 0,
            text: "Write here",
            fontsize: 18,
            font: availableFonts[0],
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
            rotation: currentElement.rotation,
            x: currentElement.x,
            y: currentElement.y
        }

        oldArray[index] = newElement;

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

            const newBlueprints:any[] = [];

            data.body.blueprints.forEach((element:any) => {
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
                console.log(data)
                resolve(data)
            } catch (error) {
                console.log(error);
            }
        })
    }

    useEffect(() => {
        if (blueprintData.id === 0) return

        getVariants(blueprintData.id).then((response:any) => {
            if (response.body.error) return
            else {
                const sizes:any[] = [];
                const colors:any[] = [];
                for (let i = 0; i < response.body.variants.length; i++) {
                    if (response.body.variants[i].options.size) {
                        if (sizes.filter((size:any) => size.size === response.body.variants[i].options.size).length < 1) {
                            sizes.push({
                                size: response.body.variants[i].options.size,
                                active: false,
                            })
                        }
                    } 
                    if (response.body.variants[i].options.color) {
                        if (colors.filter((color:any) => color.color === response.body.variants[i].options.color).length < 1) {
                            colors.push({
                                color: response.body.variants[i].options.color,
                                active: false
                            })
                        }
                    }
                }        
                console.log(sizes,colors)
                setVariantsData({
                    id: response.body.id,
                    title: response.body.title,
                    variants: response.body.variants,
                    sizes: sizes,
                    colors: colors
                })
            }
        })
    }, [blueprintData])

    const handleBPImageChange = (id:any, value:boolean) => {
        if (id != currentBlueprintImage.currentID) {
            setCurrentBlueprintImage({
                currentID: id,
                showingNum: 0,
            })
        }

        const currentBlueprint = providerData.blueprints.filter((blueprint:any) => blueprint.id === id)[0];
        
        if (value) {
            if (currentBlueprintImage.showingNum < currentBlueprint.images.length - 1) {
                setCurrentBlueprintImage({
                    currentID: id,
                    showingNum: currentBlueprintImage.showingNum + 1,
                })
            }
        } else {
            if (currentBlueprintImage.showingNum > 0) {
                setCurrentBlueprintImage({
                    currentID: id,
                    showingNum: currentBlueprintImage.showingNum - 1,
                })
            }
        }
    }

    async function getColorCodes () {
        console.log("Initiating Function")
        try {
            const res = await fetch("/api/getcolors", {
                method: "GET",
            });
            const data = await res.json();
            console.log("Data retrieved")
            const colors:any[] = []

            for (let i = 0; i < data.body.data.length; i++) {
                const options:any[] = data.body.data[i].options;
                const placeInArray = options.findIndex((item:any) => item.type === 'color');
                let iterations = 0;
                for (let j = 0; j < options[placeInArray].values.length; j++) {
                    const targetData = options[placeInArray].values[j]
                    const potentialData:any = colors.filter((item:any) => item.id === targetData.id)
                    if (potentialData.length < 1) {
                        colors.push({
                            id: targetData.id,
                            title: targetData.title,
                            colors: targetData.colors
                        })
                    }
                    iterations++
                }
                console.log(`total j | ${iterations}...`)
                console.log(`i | ${i}...`)
            }

            const colorsRedone:any[] = [];
            for (let k = 0; k < colors.length; k++) {
                const existsOfSameTitle:any = colors.filter((item:any) => item.title === colors[k].title);
                if (existsOfSameTitle.length > 1) {
                    console.error("Found 2 of the same one");
                    const newColorList:any[] = []
                    for (let l = 0; l < existsOfSameTitle.length; l++) {
                        newColorList.push({
                            color: existsOfSameTitle[l].colors[0],
                            id: existsOfSameTitle[l].id,
                        })
                    }
                    const newID = makeID();
                    const newItem = {
                        colors: newColorList,
                        id: newID,
                        title: existsOfSameTitle[0].title
                    }
                    colorsRedone.push(newItem);
                } else {
                    const newID = makeID();
                    colorsRedone.push({
                        id: newID,
                        title: existsOfSameTitle[0].title,
                        colors: [{
                            color: existsOfSameTitle[0].colors[0],
                            id: existsOfSameTitle[0].id,
                        }]
                    })
                }
            }

            console.log(colorsRedone)
            setColorList(colorsRedone);
        } catch (error){

        }        
    }

    useEffect(() => {
        if (variantsData.colors.length < 1 && variantsData.sizes.length < 1) return

        activeColorCheck();
        activeSizeCheck();

    }, [variantsData])

    function activeColorCheck() {
        if (variantsData.colors.length > 0) {
            const data = variantsData.colors.filter((item:any) => item.active === true);
            
            const newData:string[] = []
            data.forEach((data:any) => {
                newData.push(data.color)
            })
            console.log(newData)
            setActiveColors(newData)
        }
    }

    function activeSizeCheck() {
        if (variantsData.sizes.length > 0) {
            const data = variantsData.sizes.filter((item:any) => item.active === true);

            const newData:string[] = []
            data.forEach((data:any) => {
                newData.push(data.size)
            })
    
            setActiveColors(newData)
        }
    }

    function gcd (width:number,height:number): number  {
        const value = (height == 0) ? width : gcd(height, width%height);
        console.log(value)
        return value;
    }

    function findDesignArea () {

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
                    <button className="button"
                    onMouseDown={() => setVariantsMenuOpen(true)}>
                        VariantsMenu
                    </button>
                    <button className="button"
                    onMouseDown={getColorCodes}>
                        Get Color Codes
                    </button>
                    {
                        activeColors.length > 0 &&
                        <DDWrap id={"hello"} value={0} options={activeColors} setNewValue={() => {console.log("hi")}} />
                    }
                    {
                        activeSizes.length > 0 &&
                        <DDWrap id={"hi"} value={0} options={activeSizes} setNewValue={() => {console.log("hi")}} />
                    }
                </div>
        
                <div className={`design-screen-container ${isMouseMoving ? "hide-cursor" : ""}`}
                onMouseEnter={(event) => handleDesignScreenPos(event)}
                onMouseMove={(event) => handleMovement(event)}
                onMouseUp={() => {
                    setIsMouseMoving(false)
                    if (resizing) {
                        setResizing(false)
                    }
                    if (rotating) {
                        setRotating(false)
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
                                            transform: `rotate(${element.rotation}deg)`,
                                            width: `${element.width}px`,
                                        }}>
                                            <div className={`element-toolbar ${currentlyMovingSettings.id === element.id && "moving"}`}>
                                                <button
                                                onMouseDown={() => {
                                                    handleElementRemove(element.id)
                                                    setResizing(false)
                                                    setCurrentlyMovingSettings({
                                                        id: "",
                                                        type: "",
                                                        startWidth: 0,
                                                        mouseX: 0,
                                                        mouseY: 0,
                                                        offsetY: 0,
                                                        offsetX: 0,
                                                        currentElementData: {}
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
                                                    if (rotating) {
                                                        setRotating(false)
                                                    }
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
                                                <button
                                                onMouseDown={(event) => {
                                                    startElementEditing(element.id, event)                                                    
                                                    setRotating(true)
                                                    if (resizing) {
                                                        setResizing(false)
                                                    }
                                                }}
                                                onMouseUp={() => {
                                                    setIsMouseMoving(false)
                                                    setRotating(true)
                                                }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
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
                                            transform: `rotate(${element.rotation}deg)`,
                                        }}>
                                            <div className={`element-toolbar ${currentlyMovingSettings.id === element.id && "moving"}`}>
                                                <button
                                                onMouseDown={() => {
                                                    handleElementRemove(element.id)
                                                    setCurrentlyMovingSettings({
                                                        id: "",
                                                        type: "",
                                                        startWidth: 0,
                                                        mouseX: 0,
                                                        mouseY: 0,
                                                        offsetY: 0,
                                                        offsetX: 0,
                                                        currentElementData: {}
                                                    })
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <button
                                                onMouseDown={(event) => {
                                                    startElementEditing(element.id, event)                                                    
                                                    setRotating(true)
                                                    if (resizing) {
                                                        setResizing(false)
                                                    }
                                                }}
                                                onMouseUp={() => {
                                                    setIsMouseMoving(false)
                                                    setRotating(true)
                                                }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
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
                    <div className="top-settings">
                    {
                        currentlyMovingSettings.type.length > 0 &&
                        currentlyMovingSettings.type === "image" 
                        ? 
                            <div>
                                <div className="btns-wrapper">
                                <div className="inputnbuttons-wrapper">
                                        <div>
                                            <label htmlFor="X-Pos-text">X-Pos (px)</label>
                                            <input id="X-Pos-text" type="number" placeholder="X-Pos" value={currentlyMovingSettings.currentElementData.x} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.x = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                        </div>
                                        <div className="smallchangebtns-wrapper">
                                            <button 
                                                className="top"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.x = currentElement.x + 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="bottom"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.x = currentElement.x - 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="inputnbuttons-wrapper">
                                        <div>
                                            <label htmlFor="Y-Pos-text">Y-Pos (px)</label>
                                            <input id="Y-Pos-text" type="number" placeholder="Y-Pos" value={currentlyMovingSettings.currentElementData.y} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.y = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                        </div>
                                        <div className="smallchangebtns-wrapper">
                                            <button 
                                                className="top"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.y = currentElement.y + 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="bottom"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.y = currentElement.y - 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="splitdiv">
                                    <div className="content">
                                        <label htmlFor="Rotation-image">Rotation (deg)</label>
                                        <input id="Rotation-image" type="number" placeholder="Rotation" value={currentlyMovingSettings.currentElementData.rotation} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.rotation = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                    </div>
                                    <div className="smallchangebtns-wrapper">
                                        <button 
                                            className="top"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                currentElement.fontsize = currentElement.fontsize + 1;
                                                array[index] = currentElement
                                                setElements(array)
                                                setRefresh(!refresh)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="bottom"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                if (currentElement.fontsize > 1) {
                                                    currentElement.fontsize = currentElement.fontsize - 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="splitdiv">
                                    <div className="content">
                                        <label htmlFor="Width-image">Width (px)</label>
                                        <input id="Width-image" type="number" placeholder="Width" value={currentlyMovingSettings.currentElementData.width} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.width = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                    </div>
                                    <div className="smallchangebtns-wrapper">
                                        <button 
                                            className="top"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                currentElement.width = currentElement.fontsize + 1;
                                                array[index] = currentElement
                                                setElements(array)
                                                setRefresh(!refresh)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="bottom"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                if (currentElement.width > 1) {
                                                    currentElement.width = currentElement.width - 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        : currentlyMovingSettings.type === "text" 
                        ?
                            <div>
                                <div className="btns-wrapper">
                                    <div className="inputnbuttons-wrapper">
                                        <div>
                                            <label htmlFor="X-Pos-text">X-Pos (px)</label>
                                            <input id="X-Pos-text" type="number" placeholder="X-Pos" value={currentlyMovingSettings.currentElementData.x} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.x = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                        </div>
                                        <div className="smallchangebtns-wrapper">
                                            <button 
                                                className="top"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.x = currentElement.x + 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="bottom"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.x = currentElement.x - 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="inputnbuttons-wrapper">
                                        <div>
                                            <label htmlFor="Y-Pos-text">Y-Pos (px)</label>
                                            <input id="Y-Pos-text" type="number" placeholder="Y-Pos" value={currentlyMovingSettings.currentElementData.y} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.y = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                        </div>
                                        <div className="smallchangebtns-wrapper">
                                            <button 
                                                className="top"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.y = currentElement.y + 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="bottom"
                                                onClick={() => {
                                                    const array:any[] = elements;
                                                    const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                    const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                    currentElement.y = currentElement.y - 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="splitdiv">
                                    <div className="content">
                                        <label htmlFor="Rotation-text">Rotation (deg)</label>
                                        <input id="Rotation-text" type="number" placeholder="Rotation" value={currentlyMovingSettings.currentElementData.rotation} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.rotation = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                    </div>
                                    <div className="smallchangebtns-wrapper">
                                        <button 
                                            className="top"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                currentElement.rotation = currentElement.rotation + 1;
                                                array[index] = currentElement
                                                setElements(array)
                                                setRefresh(!refresh)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="bottom"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                currentElement.rotation = currentElement.rotation - 1;
                                                array[index] = currentElement
                                                setElements(array)
                                                setRefresh(!refresh)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div> 
                                <div className="splitdiv">
                                    <div className="content">
                                        <label htmlFor="Font-Size-text">Font-Size (px)</label>
                                        <input id="Font-Size-text" type="number" placeholder="Font-Size" value={currentlyMovingSettings.currentElementData.fontsize} onChange={(event) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.fontsize = parseFloat(event.target.value);
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                            }} />
                                    </div>
                                    <div className="smallchangebtns-wrapper">
                                        <button 
                                            className="top"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                currentElement.fontsize = currentElement.fontsize + 1;
                                                array[index] = currentElement
                                                setElements(array)
                                                setRefresh(!refresh)
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="bottom"
                                            onClick={() => {
                                                const array:any[] = elements;
                                                const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                                const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                                if (currentElement.fontsize > 1) {
                                                    currentElement.fontsize = currentElement.fontsize - 1;
                                                    array[index] = currentElement
                                                    setElements(array)
                                                    setRefresh(!refresh)
                                                }
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div> 
                                <div className="splitdiv">
                                    <div className="content">
                                        <label htmlFor="Font">Font</label>
                                        <DDWrap id="Font" value={currentlyMovingSettings.currentElementData.font} options={availableFonts} setNewValue={(value:string) => {
                                            const array:any[] = elements;
                                            const currentElement = elements.filter((element:any) => element.id === currentlyMovingSettings.id)[0];
                                            const index = elements.findIndex((element:any) => element.id === currentlyMovingSettings.id);
                                            currentElement.font = `${value}`
                                            array[index] = currentElement
                                            setElements(array)
                                            setRefresh(!refresh)
                                        }}>
                                        </DDWrap>
                                    </div>
                                </div> 
                            </div>
                        :
                        ""
                    }

                    </div>
                    <div className="result-wrapper">
                        <button>
                            Finish
                        </button>
                    </div>
                </div>
            </div>
            <div className={`blueprints-modal ${blueprintsMenuOpen ? "open" : ""}`}>

                <div className={`blueprints-modal-grid`}>
                    {
                        providerData.blueprints.map((blueprint:any, index:number) => {

                            if (blueprint.id < 10000) {
                                return (
                                    <div key={index}
                                    className="grid-item">
                                        <button className={`left ${currentBlueprintImage.currentID === blueprint.id ? currentBlueprintImage.showingNum > 0 ? "showing" : "" : ""}`} onClick={() => handleBPImageChange(blueprint.id, false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                        <div onPointerDown={() => {
                                            setBlueprintData({
                                                brand: blueprint.brand,
                                                id: blueprint.id,
                                                images: blueprint.images,
                                                model: blueprint.model,
                                                title: blueprint.title,
                                            });
                                            setBlueprintsMenuOpen(false);
                                        }}>
                                            {
                                                blueprint.images.map((image:string, index:number) => (
                                                    <img key={`${blueprint.brand}-${index}`} src={image} alt={`${blueprint.id}-productimage-${index}`}
                                                    className={`${currentBlueprintImage.currentID === blueprint.id ? currentBlueprintImage.showingNum === index ? "shown" : "" : index === 0 ? "shown" : ""}`} />
                                                ))
                                            }
                                        </div>
                                        <button className={`right ${currentBlueprintImage.currentID === blueprint.id ? currentBlueprintImage.showingNum < blueprint.images.length - 1 ? "showing" : "" : "showing"}`} onClick={() => handleBPImageChange(blueprint.id, true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            
                <button className="close-btn" onPointerDown={() => setBlueprintsMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <span></span>
            </div>

            <div className={`variants-modal ${variantsMenuOpen ? "open" : ""}`}>
                <div className="blueprint-images-container">
                    <button className={`left ${currentBlueprintImage.currentID === blueprintData.id ? currentBlueprintImage.showingNum > 0 ? "showing" : "" : ""}`} onClick={() => handleBPImageChange(blueprintData.id, false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <div>
                        {
                            blueprintData.images.map((image:string, index:number) => (
                                <img key={`${blueprintData.brand}-${index}`} src={image} alt={`${blueprintData.id}-productimage-${index}`}
                                className={`${currentBlueprintImage.currentID === blueprintData.id ? currentBlueprintImage.showingNum === index ? "shown" : "" : index === 0 ? "shown" : ""}`} />
                            ))
                        }
                    </div>
                    <button className={`right ${currentBlueprintImage.currentID === blueprintData.id ? currentBlueprintImage.showingNum < blueprintData.images.length - 1 ? "showing" : "" : "showing"}`} onClick={() => handleBPImageChange(blueprintData.id, true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <div className="variants-wrapper">            
                    <div className="size-variants-wrapper">
                        {
                            variantsData.sizes.map((size:any, index:number) => (
                                <button 
                                    key={`size-button-${index}`}
                                    className={`${size.active ? "picked" : ""}`}
                                    onClick={() => {
                                        const index:number = variantsData.sizes.findIndex((item:any) => item.size === size.size)
                                        const newArray:any[] = variantsData.sizes;
                                        newArray[index] = {
                                            size: size.size,
                                            active: !size.active
                                        }
                                        console.log(newArray)
                                        setVariantsData({  
                                            id: variantsData.id,
                                            title: variantsData.title,
                                            variants: variantsData.variants,
                                            sizes: newArray,
                                            colors: variantsData.colors
                                        })
                                        setRefresh(!refresh)
                                    }}
                                    >
                                    {size.size}
                                </button>
                            ))
                        }
                    </div>
                    <div className="color-variants-wrapper">
                        {
                            variantsData.colors.map((color:any, index:number) => {
                                // console.log(color)
                                const colorCode:any = colorList.filter((item:any) => item.title === color.color)[0]

                                if (colorCode != undefined) {
                                    return (
                                        <div 
                                            key={colorCode.colors[0].color} 
                                            className={`${color.active ? "picked" : ""}`}
                                            onClick={() => {
                                                const index:number = variantsData.colors.findIndex((item:any) => item.color === color.color)
                                                const newArray:any[] = variantsData.colors;
                                                newArray[index] = {
                                                    color: color.color,
                                                    active: !color.active
                                                }
                                                console.log(newArray)
                                                setVariantsData({  
                                                    id: variantsData.id,
                                                    title: variantsData.title,
                                                    variants: variantsData.variants,
                                                    sizes: variantsData.sizes,
                                                    colors: newArray
                                                })
                                                setRefresh(!refresh)
                                            }}
                                            >
                                            <span
                                                style={{
                                                backgroundColor: `${colorCode.colors[0].color}`
                                                }}
                                            ></span>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>

                <button className="close-btn" onPointerDown={() => setVariantsMenuOpen(false)}>
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