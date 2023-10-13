import { useEffect, useState } from "react"

type ElementType = {
    src: string,
    id: string,
    file: any,
    x: number,
    y: number,
    width: number,
}


const Design = () => {
    const [currentProduct, setCurrentProduct] = useState();
    const [elements, setElements] = useState<ElementType[]>([]);
    const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);
    const [currentlyMovingSettings, setCurrentlyMovingSettings] = useState({
        id: "",
        startWidth: 0,
        mouseX: 0,
        mouseY: 0
    });    

    const alphabetAndNumbers = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"
    ];

    useEffect(() => {
        console.log(elements)
    }, [elements])

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

    const startElementResize = (id:string, event:any) => {
        const currentElement = elements.filter((element:ElementType) => element.id === currentlyMovingSettings.id)[0];
        
        setIsMouseMoving(true);
        
        setCurrentlyMovingSettings({
            id: id,
            startWidth: currentElement.width,
            mouseX: event.clientX,
            mouseY: event.clientY
        })
    }
    
    const handleMovement = (event:any) => {
        if (isMouseMoving) {
            const oldArray = elements;
            console.log(oldArray)
            const currentElement = oldArray.filter((element:ElementType) => element.id === currentlyMovingSettings.id)[0];
            const index = oldArray.findIndex((element:ElementType) => element.id === currentlyMovingSettings.id)
            const newWidth = (currentlyMovingSettings.startWidth + event.clientX - currentlyMovingSettings.mouseX);
            currentElement.width = newWidth;
        }
    }

    const handleElementRemove = (id:string) => {

    }

    const handleElementMove = (id:string, event:any) => {

    }

    return (
        <div className="design-page">

            <div className="design-tool-container">
                <div className="assets-nav">
                    <div className="file-button">
                        <input 
                            type="file" 
                            accept="image/png, image/jpg"
                            multiple={false}
                            onChange={(event) => handleAddImage(event)} />
                        <p>Add Image from Desktop</p>
                    </div>
                </div>
        
                <div className="design-screen-container"
                onPointerMove={(event) => handleMovement(event)}>
                    <div className="design-screen">
                        {
                            elements.map((element:ElementType, index:number) => (
                                <div 
                                className="element" 
                                id={`${element.id}`} 
                                key={`${element.id}${index}`}
                                style={{
                                    width: `${element.width}px`,
                                }}>
                                    <div className="element-toolbar">
                                        <button
                                        onPointerDown={() => handleElementRemove(element.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <button
                                        onPointerDown={(event) => startElementResize(element.id, event)}
                                        onPointerUp={(event) => setIsMouseMoving(false)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                            </svg>
                                        </button>
                                    </div> 
                                    <img src={element.src} />
                                </div>
                            ))
                        }
                    </div>
                </div>
        
                <div className="settings-nav">
        
                </div>
            </div>

        </div>
    )
}

export default Design