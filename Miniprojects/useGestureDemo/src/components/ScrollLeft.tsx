import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

export default function ScrollLeft(props:any) {
    const screen:number = window.innerWidth;
    let falseCounter:number = 0;
    let mousePos:number;
    let i:number = 0;

    const [navOpen, setNavOpen] = useState(false)

    useEffect(() => {
        if (i >= 1) {
            document.getElementById("sl-menu")?.addEventListener("touchstart", (e:any) => {
                mousePos = e.touches[0].clientX
            })
        }
        i = i + 1;
    }, [])

    const menuPos = useSpring({ x: 0});

    const bindMenuPos = useDrag((params) => {
        const x = params.xy[0] - screen;
        if (params.tap === true) {
            falseCounter = 0
        } else {
            falseCounter = falseCounter + 1;
            if (falseCounter > 10){
                if (mousePos >= 300 || mousePos <= 50) {
                    if (params.dragging) {
                        if (x <= 0 && x >= -screen + 30) {
                            menuPos.x.set(x)
                        }
                    } else {
                        console.log(x)
                        if (x < screen / 2 * -1) {
                            menuPos.x.start(-screen);
                            falseCounter = 0
                        } else {
                            menuPos.x.start(0)
                            falseCounter = 0
                        }
                    }
                }
            }
        }
    })

    const pages = [
        {
            name: "Hjem"
        },
        {
            name: "Program"
        },
        {
            name: "Mitt program"
        },
        {
            name: "Foredragsholdere"
        },
    ]

    const links = pages.map((page:any) => 
        <li key={page.name}><a id={page.name} onClick={(e) => {console.log(e.target.id)}} className='sl-menu-link' href='#'>{ page.name }</a></li>
    )

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
            <button onClick={() => props.show(true)}>Switch</button>
        </div>
        <animated.div 
            id="sl-menu"
            className="sl-menu"
            {...bindMenuPos()}
            style={{
                x: menuPos.x
            }}
        >   
            {/* <button className='sl-menu-shut-btn' onClick={handleNavShut}>X</button> */}
            <div className='sl-menu-handle'></div>
            <div className='sl-menu-content'>
                <ul>
                    { links }
                </ul>
            </div>
        </animated.div>
    </>
  )
}
