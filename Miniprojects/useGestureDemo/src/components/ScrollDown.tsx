import '../App.css'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated, Any } from '@react-spring/web'
import { useEffect } from 'react';
export default function ScrollDown(props:Any) {
    let screen;
    let screenHeight:number;
    
    useEffect(() => {
        screen = document.getElementById("phone");
        console.log(screen)
        if (screen != null) {
          screenHeight = screen.offsetHeight - 30;
        }
    }, [])


    const menuPos = useSpring({ y: 0 });
    const bindMenuPos = useDrag((params) => {
      const y = params.xy[1];
      if (params.dragging) {
        if (y >= 0 && y <= screenHeight) {
          menuPos.y.set(y); 
        }
      } else {
        if (y > screenHeight / 2) {
          menuPos.y.start(screenHeight);
        } else {
          menuPos.y.start(0);
        }
      }
    })

    return (
        <div id="phone" className='phone-container'>
            <animated.div {...bindMenuPos()} style={{
                y: menuPos.y,
            }} className='app-handle-container'>
                <div className='app-handle' />
            </animated.div>
            <animated.div className='app-overlay' style={{
                y: menuPos.y,
            }} >                              
                <div className="text">
                    <h2>Velkommen til</h2>
                    <h1>dialogkonferansen</h1>
                </div>
                <div className='lines'>
                    <span className='line1'></span>
                    <span className='line2'></span>
                </div>
                <button onClick={() => props.show(false)}>Switch</button>
              
            </animated.div>
            <div className='app-bg'></div>
        </div>   
    )
}
