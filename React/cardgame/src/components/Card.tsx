import { useEffect, useState } from "react"
import { Beaker, Bell, Bolt, Book, Building, CPU, Camera, Clock, Cloud, Cog, Computer, Cube, Documents, Dollar, 
    Emptybattery, Envelope, Eye, Fingerprint, Fire, Fullbattery, Halfbattery, Hand, Moon, MusicNote, Paperclip, 
    Rocketship, Scissors, Sparkles, Star, Sun, Tag, Trash, Trophy, Truckkun, Wrench, Yen, Box, At, Banknotes, 
    ArrowUpCircled, Bars, Cake, Bug, Briefcase, FancyCamera, Calender, Chatbubble, Calculator, Creditcard, Film, 
    FaceSmile, Globe, AcademicCap, Adjustments, Lightbulb } from "./emojis";

interface Props {
    emoji: number,
    id: number,
    cardFlip: any,
    flipped: boolean
    matched:boolean
}

const Card = ({emoji, id, cardFlip, flipped, matched}:Props) => {
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
        justify-center items-center text-gray-400 cardback sm:p-4 p-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
            {
                cardEmoji === 1 && 
                <Fullbattery />
            }
            {
                cardEmoji === 2 && 
                <Halfbattery />
            }
            {
                cardEmoji === 3 && 
                <Emptybattery />
            }
            {
                cardEmoji === 4 && 
                <Beaker />
            }
            {
                cardEmoji === 5 && 
                <Bell />
            }
            {
                cardEmoji === 6 && 
                <Bolt />
            }
            {
                cardEmoji === 7 && 
                <Book />
            }
            {
                cardEmoji === 8 && 
                <Building />
            }
            {
                cardEmoji === 9 && 
                <Cog />
            }
            {
                cardEmoji === 10 && 
                <Clock />
            }
            {
                cardEmoji === 11 && 
                <Cloud />
            }
            {
                cardEmoji === 12 && 
                <Cube />
            }
            {
                cardEmoji === 13 && 
                <CPU />
            }
            {
                cardEmoji === 14 && 
                <Computer />
            }
            {
                cardEmoji === 15 && 
                <Yen />
            }
            {
                cardEmoji === 16 && 
                <Dollar />
            }
            {
                cardEmoji === 17 && 
                <Envelope />
            }
            {
                cardEmoji === 18 && 
                <Documents />
            }
            {
                cardEmoji === 19 && 
                <Fingerprint />
            }
            {
                cardEmoji === 20 && 
                <Eye />
            }
            {
                cardEmoji === 21 && 
                <Fire />
            }
            {
                cardEmoji === 22 && 
                <Hand />
            }
            {
                cardEmoji === 23 && 
                <Moon />
            }
            {
                cardEmoji === 24 && 
                <MusicNote />
            }
            {
                cardEmoji === 25 && 
                <Paperclip />
            }
            {
                cardEmoji === 26 && 
                <Rocketship />
            }
            {
                cardEmoji === 27 && 
                <Scissors />
            }
            {
                cardEmoji === 28 && 
                <Sparkles />
            }
            {
                cardEmoji === 29 && 
                <Star />
            }
            {
                cardEmoji === 30 && 
                <Trophy />
            }
            {
                cardEmoji === 31 && 
                <Trash />
            }
            {
                cardEmoji === 32 && 
                <Tag />
            }
            {
                cardEmoji === 33 && 
                <Sun />
            }
            {
                cardEmoji === 34 && 
                <Truckkun />
            }
            {
                cardEmoji === 35 && 
                <Camera />
            }
            {
                cardEmoji === 36 && 
                <Wrench />
            }
            {
                cardEmoji === 37 && 
                <Box />
            }
            {
                cardEmoji === 38 && 
                <At />
            }
            {
                cardEmoji === 39 && 
                <Banknotes />
            }
            {
                cardEmoji === 40 && 
                <ArrowUpCircled />
            }
            {
                cardEmoji === 41 && 
                <Bars />
            }
            {
                cardEmoji === 42 && 
                <Cake />
            }
            {
                cardEmoji === 43 && 
                <Bug />
            }
            {
                cardEmoji === 44 && 
                <Briefcase />
            }
            {
                cardEmoji === 45 && 
                <FancyCamera />
            }
            {
                cardEmoji === 46 && 
                <Calender />
            }
            {
                cardEmoji === 47 && 
                <Chatbubble />
            }
            {
                cardEmoji === 48 && 
                <Calculator />
            }
            {
                cardEmoji === 49 && 
                <Creditcard />
            }
            {
                cardEmoji === 50 && 
                <Film />
            }
            {
                cardEmoji === 51 && 
                <FaceSmile />
            }
            {
                cardEmoji === 52 && 
                <Globe />
            }
            {
                cardEmoji === 53 && 
                <AcademicCap />
            }
            {
                cardEmoji === 54 && 
                <Adjustments />
            }
            {
                cardEmoji === 55 && 
                <Lightbulb />
            }
            </svg>
        </div>
        <div className={`w-full h-full bg-gray-800 border-4 ${matched ? "border-green-400" : "border-gray-400"} rounded-lg flex 
        justify-center items-center text-gray-400 cardfront`}>

        </div>
    </div>
    </div>
  )
}

export default Card