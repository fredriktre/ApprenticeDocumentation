import { useEffect, useState } from "react"
import DDOption from "./DDOption";

interface Props {
    id: string|undefined
    value: string|number
    options: string[]|number[]
    setNewValue: any
}

const DDWrap = ({id, options, value, setNewValue}:Props) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    console.log(options)
    return (
        <div id={id} className={`ddwrap`}>
            <p>{value}</p>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <svg 
                    className={`${dropdownOpen ? "open" : ""}`}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
                {
                    options.map((option:string|number, index:number) => (
                        <DDOption key={index} option={option} setNewValue={(newValue:string) => {
                            setNewValue(newValue)
                            setDropdownOpen(false)
                        }} />
                    ))
                }
            </div>
        </div>
    )
}

export default DDWrap