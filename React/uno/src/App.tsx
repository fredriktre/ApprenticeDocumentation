import { useState, useEffect } from 'react'
import './App.css'

type Card = {
  value: number,
  action: number,
  color: string,
}

function App() {
  const [currentPickedCard, setCurrentPickedCard] = useState(0);
  const [player_1_Deck, setPlayer_1_Deck] = useState<Card[]>([]);
  const [player_2_Deck, setPlayer_2_Deck] = useState<Card[]>([]);
  const [player_3_Deck, setPlayer_3_Deck] = useState<Card[]>([]);

  const cardtypes = {
    c0: {
      value: 0,
      action: 0,
    },
    c1: {
      value: 1,
      action: 0,
    },
    c2: {
      value: 2,
      action: 0,
    },
    c3: {
      value: 3,
      action: 0,
    },
    c4: {
      value: 4,
      action: 0,
    },
    c5: {
      value: 5,
      action: 0,
    },
    c6: {
      value: 6,
      action: 0,
    },
    c7: {
      value: 7,
      action: 0,
    },
    c8: {
      value: 8,
      action: 0,
    },
    c9: {
      value: 9,
      action: 0,
    },
    reverse: {
      value: 20,
      action: 1,
    },
    skip: {
      value: 20,
      action: 2,
    },
    drawtwo: {
      value: 20,
      action: 3,
    },
    wild: {
      value: 20,
      action: 4,
    },
    wilddrawfour: {
      value: 20,
      action: 5,
    },
  }

  useEffect(() => {
    setPlayer_1_Deck([
      {
        value: cardtypes.c0.value,
        action: cardtypes.c0.action,
        color: "red"
      },
      {
        value: cardtypes.c4.value,
        action: cardtypes.c4.action,
        color: "blue"
      },
      {
        value: cardtypes.reverse.value,
        action: cardtypes.reverse.action,
        color: "yellow"
      },
      {
        value: cardtypes.skip.value,
        action: cardtypes.skip.action,
        color: "yellow"
      },
      {
        value: cardtypes.drawtwo.value,
        action: cardtypes.drawtwo.action,
        color: "yellow"
      },
      {
        value: cardtypes.wild.value,
        action: cardtypes.wild.action,
        color: "black"
      },
      {
        value: cardtypes.wilddrawfour.value,
        action: cardtypes.wilddrawfour.action,
        color: "black"
      }
    ])
  }, [])
  

  return (
    <div className='w-full min-h-screen h-full bg-blue-200 flex justify-center items-center perspective relative'>
     
      <div className='max-w-2xl aspect-square w-full rounded-full bg-blue-800 shadow-c centerpiece relative'>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 card-aspect'>
          <div className='px-2 py-4 w-full h-full bg-black rounded-lg'>
            <div className='w-full h-full bg-white flex justify-center items-center rounded-lg'>
              <div className='rounded-full bg-black aspect-square w-4/5 flex justify-center items-center'>
                <p className='text-6xl text-white'>1</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='absolute top-3/4 left-1/2 -translate-x-1/2 w-4/5 h-64 p-4 bg-blue-800 rounded-xl shadow-c flex 
      gap-2 overflow-x-auto custom-scroll'>

        {
          player_1_Deck.map((card:Card, index:number) => (
            <div key={`player1-${index}`} data-action={`${card.action}`} className={`relative z-10 px-2 py-4 h-full card-aspect rounded-lg
            ${card.color === "red" && "bg-red-500"} ${card.color === "green" && "bg-green-500"} ${card.color === "blue" && "bg-blue-500"}
            ${card.color === "yellow" && "bg-yellow-500"} ${card.color === "black" && "bg-black"}`}>
              <div className='w-full h-full bg-white flex justify-center items-center' onClick={() => setCurrentPickedCard(index + 1)}>
                <div className={`rounded-full ${card.color === "red" && "bg-red-500"} ${card.color === "green" && "bg-green-500"} 
                ${card.color === "blue" && "bg-blue-500"} ${card.color === "yellow" && "bg-yellow-500"} ${card.color === "black" && "bg-black"} 
                aspect-square w-4/5 flex justify-center items-center`}>
                  <p className='text-6xl text-white'>{card.value != 20 ? `${card.value}` : 
                  <>
                    {
                      card.action == 1 &&
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    }
                    {
                      card.action == 2 &&
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    }
                    {
                      card.action == 3 &&
                      "+2"
                    }
                    {
                      card.action == 4 &&
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                      </svg>
                    }
                    {
                      card.action == 5 &&
                      "+4"
                    }
                  </>
                  }
                  </p>
                </div>
              </div>
              <div className={`absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center
              ${currentPickedCard === index + 1 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
              transition-all duration-150`}>
                <button className='relative z-30 w-fit h-fit px-4 py-2 bg-blue-800 rounded-xl text-white
                '>Use</button>
                <span className='absolute z-20 top-0 left-0 w-full h-full bg-black opacity-60'></span>
              </div>
            </div>
          ))
        }

        <span className='absolute z-[5] w-full h-full top-0 left-0' onClick={() => setCurrentPickedCard(0)}></span>
      </div>

    </div>
  )
}

export default App
