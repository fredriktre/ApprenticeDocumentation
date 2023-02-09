import { useState } from "react";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { MdPending, MdSwapVerticalCircle, MdStarHalf } from "react-icons/md"
import { auth } from "../App";

const SideBar = (props) => {
    const [themeOpen, setThemeOpen] = useState(false);

    return (
        <div className="fixed z-50 top-0 left-0 h-full w-16 m-0">
            <div className="relative z-50 flex flex-col justify-between w-full h-full bg-gray-900">
                <div className="relative z-[52] flex flex-col">
                <SideBarIcon placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} icon={<FaFire size="28" />} />
                <SideBarIcon placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} icon={<BsPlus size="28" />} />
                <SideBarIcon placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} icon={<BsFillLightningFill size="28" />} />
                <SideBarIcon placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} icon={<FaPoo size="28" />} />
                </div>
                <div className="relative z-[55] flex flex-col">
                    <ClickIcon placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} clickHandler={() => {setThemeOpen(!themeOpen)}} icon={<MdPending size="28" />} text="settings" />
                    <ClickImageIcon iconType={props.iconType} placement="left-14" origin="origin-left" themeGlow={props.themeGlow} themeColor={props.themeColor} clickHandler={props.clickHandler} icon={props.profileIcon} text="Login" />
                </div>
            </div>
            
            
            <div className={`absolute z-[45] ${themeOpen ? "left-full" : "-left-[450%]"} pt-16 pb-16 top-1/2 -translate-y-1/2 w-fit pr-4 pl-4 h-fit
                           bg-gray-900 rounded-r-3xl flex justify-center items-center flex-col gap-4 transition-all duration-300 ease-in-out`}>
                <h4 className={`${props.themeColor} mr-auto`}>Themes</h4>
                <div className="flex justify-center items-center gap-4 w-fit">
                    <ClickIcon placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="green-theme" clickHandler={() => {props.setThemeColor("green-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Green" />
                    <ClickIcon placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="blue-theme" clickHandler={() => {props.setThemeColor("blue-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Blue" />
                    <ClickIcon placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="red-theme" clickHandler={() => {props.setThemeColor("red-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Red" />
                    <ClickIcon placement="top-full" origin="origin-top" themeGlow={props.themeGlow} themeColor="yellow-theme" clickHandler={() => {props.setThemeColor("yellow-theme")}} icon={<MdSwapVerticalCircle size="28" />} text="Yellow" />
                    <ClickIcon placement="top-full" origin="origin-top" themeGlow={true} themeColor={props.themeColor} clickHandler={() => {props.setThemeGlow(!props.themeGlow)}} icon={<MdStarHalf size="28" />} text="Icon Glow" />
                </div>
                <h4 className={`${props.user != null ? "block" : "hidden"} ${props.themeColor} mr-auto mt-4`}>Change Avatar</h4>
                <div className={`${props.user != null ? "block" : "hidden"} relative mr-auto ${props.themeColor} rounded-3xl hover:rounded-xl overflow-hidden border-2 border-gray-900 hover-bo transition-all duration-300 ease-in-out`}>
                    <input onChange={(e) => {props.uploadImage(e.target.files[0])}} type="file" className="absolute left-0 top-0 h-full w-full opacity-0 cursor-pointer " accept="image/jpeg,image/x-png" />
                    <button className={`${props.themeColor} bg-gray-800 pt-2 pb-2 pl-4 pr-4 w-full h-full`}>Upload New Avatar</button>
                </div>
                <label className={`${props.user != null ? "block" : "hidden"} ${props.uploaded ? "block" : "hidden"} ${props.themeColor} mr-auto ml-6`}>Upload Complete</label>
            </div>
        </div>
    )
};

const SideBarIcon = ({ icon, text = 'tooltip', themeColor, themeGlow, origin, placement}) => (
    <div className={`sidebar-icon ${themeColor} hover-bg group ${themeGlow ? "active-shadow" : ""}`}>
        {icon}

        <span className={`sidebar-tooltip ${themeColor} group-hover:scale-100 ${origin} ${placement}`}>
            {text}
        </span>
    </div>
)
const ClickIcon = ({ clickHandler, icon, text = 'tooltip', themeColor, themeGlow, origin, placement}) => (
    <div onClick={clickHandler} className={`sidebar-icon ${themeColor} hover-bg group ${themeGlow ? "active-shadow" : ""}`}>
        {icon}

        <span className={`sidebar-tooltip ${themeColor} group-hover:scale-100 ${origin} ${placement}`}>
            {text}
        </span>
    </div>
)
const ClickImageIcon = ({ clickHandler, iconType, icon, text = 'tooltip', themeColor, themeGlow, origin, placement}) => (
    <div onClick={clickHandler} className={`sidebar-icon ${themeColor} hover-bg group ${themeGlow ? "active-shadow" : ""}`}>
        {iconType ? <img src={icon} /> : icon }

        <span className={`sidebar-tooltip ${themeColor} group-hover:scale-100 ${origin} ${placement}`}>
            {text}
        </span>
    </div>
)

export default SideBar;