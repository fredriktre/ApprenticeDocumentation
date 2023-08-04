import { useEffect, useState } from "react";
import Card from "../components/Card";
import { GridLoader } from "react-spinners";
import { Link } from 'react-router-dom'
import ClickSound from '../assets/cardclicksound.mp3'
import ImgCard from "../components/ImgCard";

interface Props {
    game: string
}

const Game10x10 = ({game}:Props) => {
    const [cards, setCards] = useState<any[]>([]);
    const [cardStatus, setCardStatus] = useState<any[]>([]);
    const [rerender, setRerender] = useState(false)
    const [flipAmount, setFlipAmount] = useState(0);
    const [loading, setLoading] = useState(true)
    const [victory, setVictory] = useState(false);
    const [gamemode, setGamemode] = useState<string>()
    const clicksound = new Audio(ClickSound);
    
    useEffect(() => {
        setGamemode(game)
        setTimeout(() => {
            createGame();
        }, 1000)
    }, [])
    
    const clearLastGame = () => {
        setCards([]);
        setCardStatus([]);
        setFlipAmount(0);
        setLoading(true);
        setVictory(false);
        setTimeout(() => {
            createGame();
        }, 2000)
    }

    const createGame = () => {
        const usedEmoji:number[] = [];
        const genCards = [];
        const genStatus = [];
        let currpair = 1;
        while (genCards.length < 100) {
            const emoji:number = Math.floor(1 + Math.random() * 55)
            if (usedEmoji.filter((oldemoji) => oldemoji === emoji).length < 1) {
                usedEmoji.push(emoji)
                genCards.push({
                    id: genCards.length,
                    pairid: currpair,
                    emoji: emoji,
                })
                genStatus.push({
                    id: genCards.length - 1,
                    matched: false,
                    flipped: false,
                })
                genCards.push({
                    id: genCards.length,
                    pairid: currpair,
                    emoji: emoji,
                })
                genStatus.push({
                    id: genCards.length - 1,
                    matched: false,
                    flipped: false,
                })
                currpair++;
            } 
        }
        for (let i = genCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [genCards[i], genCards[j]] = [genCards[j], genCards[i]];
        }
        setCards(genCards)
        setCardStatus(genStatus);
        setLoading(false);
    }
    
    function flipCard(id:number) {
        if (flipAmount != 2) {
            const currentCard = cards.filter((card) => card.id == id)[0];
            const currentStatus = cardStatus.filter((card) => card.id == currentCard.id)[0];
            if (!currentStatus.matched) {
                const pairCards = cards.filter((card) => card.pairid == currentCard.pairid);
                const pairCard = pairCards.filter((card) => card.id != currentCard.id)[0];
                const notmatched = cardStatus.filter((card) => card.matched != true);
                const flippedCard = notmatched.filter((card) => card.flipped === true)[0]

                const CS_index = cardStatus.findIndex((card) => card.id == currentStatus.id);
                const newStatus = cardStatus;
                newStatus[CS_index].flipped = true;
                if (flippedCard != undefined) {
                    if (flippedCard.id === pairCard.id) {
                        newStatus[CS_index].matched = true;
                        newStatus[newStatus.findIndex((card) => card.id === pairCard.id)].matched = true;
                    }
                }

                clicksound.play();
                setCardStatus(newStatus)
                setRerender(!rerender)
                setFlipAmount(flipAmount + 1);         
            }        
        }
    }

    useEffect(() => {
        if (flipAmount === 2) {
            setTimeout(() => {
                const newStatus = cardStatus;
                for (let i = 0; i < newStatus.length; i++) {
                    if (newStatus[i].matched === false) {
                        newStatus[i].flipped = false;
                    }
                }
                setCardStatus(newStatus)
                setFlipAmount(0)
                setRerender(!rerender)
            }, 1000)
        }
    }, [flipAmount])

    useEffect(() => {

        if (!loading) {
            if (cardStatus.filter(card => card.matched === false).length < 2) {
                console.log("victory")
                setVictory(true);
            }
        }

    }, [rerender])

  return (
    <div className="relative w-full min-h-screen h-full bg-black flex flex-col gap-5 justify-center items-center">
        <Link to={`/`} 
        className="text-4xl text-white font-bold w-full max-w-[40rem] flex justify-center 
        rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
        active:bg-gray-900">Menu</Link>
        <div className={`${loading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} w-fit h-fit`}>
            <GridLoader
                color={"#9ca3af"}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
        <div className={`w-full max-w-6xl h-full grid grid-cols-10 grid-rows-10 md:gap-5 gap-1 p-5 items-center justify-items-center ${loading ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"}`}>
            {
                gamemode === "standard" ?
                cards.map((card:any, index:number) => (
                    <Card key={index} id={card.id} emoji={card.emoji} cardFlip={flipCard} matched={cardStatus[cardStatus.findIndex((status) => status.id == card.id)].matched} flipped={cardStatus[cardStatus.findIndex((status) => status.id == card.id)].flipped} />
                ))
                :
                cards.map((card:any, index:number) => (
                    <ImgCard key={index} id={card.id} folder={`${gamemode}`} emoji={card.emoji} cardFlip={flipCard} matched={cardStatus[cardStatus.findIndex((status) => status.id == card.id)].matched} flipped={cardStatus[cardStatus.findIndex((status) => status.id == card.id)].flipped} />
                ))
            }
        </div>
        <div className={`w-full h-screen absolute top-0 left-0 z-50 gap-5 justify-center items-center flex 
        flex-col ${victory ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-300`}>
            <Link to={`/`} 
            className="relative z-[60] text-4xl text-white font-bold w-full max-w-[40rem] flex justify-center 
            rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
            active:bg-gray-900">Menu</Link>
            <button onClick={clearLastGame}
            className="relative z-[60] text-4xl text-white font-bold w-full max-w-[40rem] flex justify-center 
            rounded-lg p-4 transition-colors duration-150 bg-gray-700 hover:bg-gray-600 
            active:bg-gray-900">Play again</button>
            <span className="w-full h-full absolute top-0 left-0 bg-black opacity-70"></span>
        </div>
    </div>
  )
}

export default Game10x10