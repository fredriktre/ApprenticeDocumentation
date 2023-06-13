import { useEffect, useState } from "react"
import Page from "../Layout/Page"

interface Props {
    page: number
    pageValue: number
    loaded: boolean
    roomID: string
}

type Message = {
    user: String,
    message: String,
    time: String,
}

const Room = ({page, pageValue, loaded, roomID}:Props) => {
    const [room, setRoom] = useState<string>("");
    const [textInput, setTextInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!roomID) return
        setRoom(roomID.toString())

    }, [roomID])

  return (
    <Page page={page} pageValue={pageValue} loaded={loaded}>
        <div className="room-wrapper">
            <div className="room-head">
                <p>RoomID: {room}</p>
                <div className="room-head-buttons">
                    <button>Button</button>
                    <button>Button2</button>
                </div>
            </div>
            <div className="room-content">
                {
                    messages.map((message:Message) => {
                        
                        return(
                            <div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="room-chatbar">
                <input 
                    type="text" 
                    value={textInput} 
                    onChange={(ev) => setTextInput(ev.target.value)}
                    placeholder="Write something!" />
                <button>Send</button>
            </div>
        </div>
    </Page>
  )
}

export default Room