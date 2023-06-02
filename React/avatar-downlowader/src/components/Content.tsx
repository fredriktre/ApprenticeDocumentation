import { ReactNode } from "react"

interface Props {
    children: ReactNode
    background: string
    fontcolor: string
}

const Content = ({children, background, fontcolor}:Props) => {
  return (
    <main style={{
        background: background,
        color: fontcolor 
    }}>
        {children}
    </main>
  )
}

export default Content