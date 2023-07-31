import { ReactNode } from "react"

interface Props {
    children?: ReactNode
}

const CategorySlider = ({children}:Props) => {
  return (
    <div className="w-full h-fit min-h-32 overflow-y-hidden 
    overflow-x-auto bg-gray-100 rounded-lg p-4">
        {children}
    </div>
  )
}

export default CategorySlider