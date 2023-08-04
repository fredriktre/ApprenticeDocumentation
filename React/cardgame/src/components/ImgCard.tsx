import { useEffect, useState } from "react"

interface Props {
    emoji: number,
    id: number,
    cardFlip: any,
    flipped: boolean
    matched:boolean
    folder:string
}

const ImgCard = ({emoji, id, cardFlip, flipped, matched, folder}:Props) => {
    const [cardEmoji, setCardEmoji] = useState(1);

    useEffect(() => {
        if (!emoji) return
        setCardEmoji(emoji)
    }, [emoji])

  return (
    <div className="card-wrapper w-full aspect-square">
        <div onClick={() => {
            if (!flipped){
                cardFlip(id)
            }
        }}
        className={`relative w-full h-full flex justify-center items-center card ${flipped ? `flipped` : ""}`}>
        <div className={`w-full h-full bg-gray-800 border-4 ${matched ? "border-green-400" : "border-gray-400"} rounded-lg flex 
        justify-center items-center text-gray-400 cardback sm:p-2 p-1`}>
            <img className="max-w-full max-h-full" src={`/images/${folder}/${cardEmoji}.png`} alt={`${cardEmoji}`} />
        </div>
        <div className={`w-full h-full bg-gray-800 border-4 ${matched ? "border-green-400" : "border-gray-400"} rounded-lg flex 
        justify-center items-center text-gray-400 cardfront`}>
        </div>
    </div>
    </div>
  )
}

export default ImgCard