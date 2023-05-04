import { ReactNode } from "react"

interface Props {
    title?: string
    children?: ReactNode,
    className?: string
}

const Card = ({title, children, className}:Props) => {
  return (

    <div className={`p-4 bg-gray-950 rounded-md ${className}`}>
        {title && <p>{title}</p>}
        {children}
    </div>

  )
}

export default Card