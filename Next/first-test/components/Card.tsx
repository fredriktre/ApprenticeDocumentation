import { ReactNode } from "react"

interface Props {
    children?: ReactNode 
    className?: string
    bg: string
    bordercolor: string
}
const Card = ({children, className, bg, bordercolor}: Props) => {
  return (
    <div 
     className={`py-5 px-10 flex justify-start 
     items-center rounded-lg text-white border-2 
     ${className} bg-${bg} border-${bordercolor}`}>
        {children}
    </div>
  )
}

export default Card