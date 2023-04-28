import { ReactNode } from "react"

interface Props {
    title?: string
    children?: ReactNode,
}

const Card = ({title, children}:Props) => {
  return (

    <div className="p-4 bg-gray-950 rounded-md">
        {title && <p>{title}</p>}
        {children}
    </div>

  )
}

export default Card