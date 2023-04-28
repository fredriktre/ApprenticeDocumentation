import { ReactNode } from "react"

interface Props {
    title?: string
    children?: ReactNode,
    className?: string,
}

const CardWrapper = ({title, children, className}:Props) => {
  return (
    <div className={`p-4 bg-gray-900 rounded-md flex flex-col gap-2 ${className}`}>
        <h2>{title}</h2>
        {children}
    </div>
  )
}

export default CardWrapper