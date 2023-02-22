import Auth from "./Auth";
import { useState } from 'react';
import { MdCall, MdVideoCall, MdPeople } from "react-icons/md";

const Viewport = (props) => {    

    return (
        <div className="relative w-full h-full pl-16 bg-gray-800">
            <Header themeColor={props.themeColor} name={props.name} />
            <Chat themeColor={props.themeColor}>
                {props.children}
            </Chat>
            <Auth 
                uploadImage={props.uploadImage} 
                themeGlow={props.themeGlow} 
                themeColor={props.themeColor} 
                profileIcon={props.profileIcon}
                userOn={props.userOn} 
                userName={props.userName}
                loginState={props.loginState}
                setUserOn={props.setUserOn}
                setIconType={props.setIconType}
                setProfileIcon={props.setProfileIcon}
                />
        </div>
    )
}

const Header = (props) => {

    return (
        <div className="flex justify-between w-full h-16 mb-8 pr-16 pl-16 mt-8">
            <h4 className={`${props.themeColor} text-2xl`}>{props.name}</h4>
            <ul className="flex justify-end gap-8">
                <li><button><HeaderIcons themeColor={props.themeColor} icon={<MdCall />} text="Call" /></button></li>
                <li><button><HeaderIcons themeColor={props.themeColor} icon={<MdVideoCall />} text="Video Call" /></button></li>
                <li><button><HeaderIcons themeColor={props.themeColor} icon={<MdPeople />} text="Members" /></button></li>
            </ul>
        </div>
    )
}

const HeaderIcons = ({ icon, text = 'tooltip', themeColor}) => (
    <div className={`header-icon group ${themeColor} hover-bg`}>
        {icon}

        <span className={`header-tooltip ${themeColor} group-hover:scale-100`}>
            {text}
        </span>
    </div>
)

const Chat = (props) => {
    return (
        <div className="relative w-full h-custom-full">
            <div className={`${props.themeColor} ml-16 mr-16 h-4/5`}>
                {props.children}
            </div>
            <ChatBar themeColor={props.themeColor} />
        </div>
    )
}

const ChatBar = (props) => {
    
    const [additionalOpen, setAdditionalOpen] = useState(false)
    return (        
    <div className="w-full h-1/5 absolute bottom-0 pr-8 pl-8 pt-2 pb-2
                    flex justify-between items-center">
        <div className="relative flex w-full h-fit">
        
        <ChatBarTextEdit themeColor={props.themeColor} additionalOpen={additionalOpen} setAdditionalOpen={setAdditionalOpen} />

        <input type="text" placeholder="Write Something! :D" className={`relative z-20 w-full h-6 pl-6 pr-6 pt-6 pb-6 ${additionalOpen ? "rounded-b-3xl" : "rounded-3xl"} 
                                                                        border-2 border-gray-900 ph-text-green hover-bo focus-bo bg-gray-900 outline-0 
                                                                        ${props.themeColor} ease-in-out duration-300 hover:shadow-lg 
                                                                        focus:shadow-lg hover:rounded-xl focus:rounded-xl shadow-md`} />
        </div>
        <button className={`w-1/5 h-12 bg-gray-900 ${props.themeColor} ml-8 rounded-3xl border-2 border-gray-900 
                        hover-bo ease-in-out duration-300 hover:shadow-lg hover:rounded-xl shadow-md`}>Send</button>
    </div>
    )
}

const ChatBarTextEdit = (props) => {

    const [boldActive, setBoldActive] = useState(false)
    const [italicActive, setItalicActive] = useState(false)

    return (
        <div className={`absolute ${props.additionalOpen ? "bottom-12" : "bottom-0"} transition-all duration-300 w-full`}>
            <button onClick={() => {props.setAdditionalOpen(!props.additionalOpen)}} className={`absolute -top-8 left-4 w-8 h-8 bg-gray-900 ${props.themeColor} rounded-t-3xl border-2 border-gray-900 
                        hover-bg ease-in-out duration-300 hover:shadow-lg hover:rounded-t-xl`}><p className={`${props.additionalOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300 ease-in-out`}>^</p></button>
            <ul className={`flex items-center gap-4 w-full h-6 pl-6 pr-6 pt-6 pb-6 ${props.additionalOpen ? "rounded-t-3xl" : "rounded-3xl"}
                        bg-gray-900 outline-0 ${props.themeColor} ease-in-out duration-300`}>
                <li className="m-0 p-0"><button onClick={() => {setBoldActive(!boldActive)}} className={`w-8 h-8 ${props.themeColor} hover-bg rounded-3xl ${boldActive ? "active-bg text-white" : "bg-gray-900"} 
                        ease-in-out duration-300 hover:shadow-lg hover:rounded-xl font-bold`}>B</button></li>
                <li className="m-0 p-0"><button onClick={() => {setItalicActive(!italicActive)}} className={`w-8 h-8 ${props.themeColor} hover-bg rounded-3xl ${italicActive ? "active-bg text-white" : "bg-gray-900 "} 
                        ease-in-out duration-300 hover:shadow-lg hover:rounded-xl italic`}>I</button></li>
            </ul>
        </div>
    )
}

export default Viewport;