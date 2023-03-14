import { useState } from "react";

export default function ScrollManual() {
    const [placement, setPlacement] = useState(0)
    let StartPos:number;
    let Pos:number;
    const windowSize = window.innerWidth * -1;
    function handleStart(e:any) {
        StartPos = e.touches[0].clientX
        Pos = e.touches[0].clientX * -1
    }
    function handleMove(e:any) {
        const x = e.touches[0].clientX * -1
        if (x <= 0 - 10 && x >= windowSize + 10) {
            if (x > Pos) {
                //left
                setPlacement(x)
            } else if (x < Pos) {
                //right
                setPlacement(x)
            }
        }
        Pos = x;
    }
    function handleEnd(e:any) {
       
    }


    return (
    <>
        <div className="sl-content">
            <div className="text">
                <h2>Velkommen til</h2>
                <h1>dialogkonferansen</h1>
            </div>
            <div className='lines'>
                <span className='line1'></span>
                <span className='line2'></span>
            </div>
            <span
                onTouchStart={(e:any) => handleStart(e)} 
                onTouchMove={(e:any) => handleMove(e)}
                onTouchEnd={(e:any) => handleEnd(e)}
                className="menu-handle"style={{
                    right: placement,
                }}
            ></span>
        </div>

        <div 
            onTouchStart={(e:any) => handleStart(e)} 
            onTouchMove={(e:any) => handleMove(e)}
            onTouchEnd={(e:any) => handleEnd(e)}
            id="menu" 
            className="menu" 
            style={{
                right: placement,
            }}
        >
        </div>     
    </>
  )
}
