import { Children, ReactNode } from "react"

interface Props {
    page: number
    pageValue: number
    loaded: boolean
    children?: ReactNode
}

const Page = ({page, pageValue, loaded, children}:Props) => {
  return (
    <div className={`page-container ${loaded ? `${page === pageValue ? "open" : "close"}` : `close`}`}>
        {
            page === pageValue && <>
                {children}
            </>
        }
    </div>
  )
}

export default Page