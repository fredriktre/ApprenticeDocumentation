import { useState } from "react";
import { MdPending, MdSwapVerticalCircle, MdStarHalf, MdLogin } from "react-icons/md"

const SideBar = (props) => {
    const [themeOpen, setThemeOpen] = useState(false);
    
    const channels = props.channels.map((channel) => {
        return <ClickIcon key={channel.id} clickHandler={() => props.channelHandler(channel)} iconType={true} placement="left-14" origin="origin-left" text={channel.data().name} themeGlow={props.themeGlow} themeColor={props.themeColor} icon={channel.data().icon} />
        }
    )

    return (
        <div className="fixed z-50 top-0 left-0 h-full w-16 m-0">
            <div className="relative z-50 flex flex-col justify-between w-full h-full bg-gray-900">
                <div className="relative z-[52] flex flex-col">
                    {channels}
                </div>
                <div className="relative z-[55] flex flex-col">
                    <ClickIcon iconType={false} placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} clickHandler={() => {setThemeOpen(!themeOpen)}} icon={<MdPending size="28" />} text="settings" />
                    <ClickIcon iconType={props.iconType} placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} clickHandler={props.clickHandler} icon={props.iconType ? props.profileIcon : <MdLogin size="28" />} text="Login" />
                </div>
            </div>
            
            
            <div className={`absolute z-[45] ${themeOpen ? "left-full" : "-left-[450%]"} pt-16 pb-16 top-1/2 -translate-y-1/2 w-fit pr-4 pl-4 h-fit
                           bg-gray-900 rounded-r-3xl flex justify-center items-center flex-col gap-4 transition-all duration-300 ease-in-out`}>
                <h4 className={`${props.themeColor} mr-auto`}>Themes</h4>
                <div className="flex justify-center items-center gap-4 w-fit">
                    <ClickIcon iconType={false} placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="green-theme" clickHandler={() => {props.setThemeColor("green-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Green" />
                    <ClickIcon iconType={false} placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="blue-theme" clickHandler={() => {props.setThemeColor("blue-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Blue" />
                    <ClickIcon iconType={false} placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="red-theme" clickHandler={() => {props.setThemeColor("red-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Red" />
                    <ClickIcon iconType={false} placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="yellow-theme" clickHandler={() => {props.setThemeColor("yellow-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Yellow" />
                    <ClickIcon iconType={false} placement="top-full" origin="origin-top" themeGlow={true} themeColor={props.themeColor} clickHandler={() => {props.setThemeGlow(!props.themeGlow)}} icon={<MdStarHalf size="28" />} text="Icon Glow" />
                </div>
                <h4 className={`${props.userOn  ? "block" : "hidden"} ${props.themeColor} mr-auto mt-4`}>Change Avatar</h4>
                <div className={`${props.userOn ? "block" : "hidden"} relative mr-auto ${props.themeColor} ${props.themeGlow ? "active-shadow" : ""} shadow-md rounded-3xl hover:rounded-xl overflow-hidden border-2 border-gray-900 hover-bo transition-all duration-300 ease-in-out`}>
                    <input onChange={(e) => {props.uploadImage(e.target.files[0])}} type="file" className="absolute left-0 top-0 h-full w-full opacity-0 cursor-pointer " accept="image/jpeg,image/x-png" />
                    <button className={`${props.themeColor} bg-gray-800 pt-2 pb-2 pl-4 pr-4 w-full h-full`}>Upload New Avatar</button>
                </div>
                <label className={`${props.userOn ? "block" : "hidden"} ${props.uploaded ? "block" : "hidden"} ${props.themeColor} mr-auto ml-6`}>Upload Complete</label>
            </div>
        </div>
    )
};

const ClickIcon = ({ clickHandler, iconType, icon, text = 'tooltip', themeColor, themeGlow, origin, placement}) => (
    <div onClick={clickHandler} className={`sidebar-icon ${themeColor} hover-bg group ${themeGlow ? "active-shadow" : ""}`}>
        <div className="flex justify-center items-center w-10/12 h-10/12 rounded-3xl overflow-hidden">
            {iconType ? <img src={icon} /> : icon }
        </div>

        <span className={`sidebar-tooltip ${themeColor} group-hover:scale-100 ${origin} ${placement}`}>
            {text}
        </span>
    </div>
)

export default SideBar;