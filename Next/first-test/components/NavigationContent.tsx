import Link from "next/link"
import { useRouter } from "next/router";
import useUserStore from "@/store/userstore";
import { useEffect, useState } from "react";

const NavigationContent = () => {
    const store = useUserStore();
    const router = useRouter();  
    const [loading, setLoading] = useState(true)
    const [canEdit, setCanEdit] = useState(false)    
    const [statusIn, setStatusIn] = useState(false)    
    const [paths, setPath] = useState<string[]>([])

  useEffect(() => {
    if (router.pathname === '/posts') {
        if (store.user.admin) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }

    const rawpath = router.asPath.split("/")
    setPath(rawpath.splice(1, rawpath.length))

    setLoading(false)

}, [store.status])

  if (!loading) {

    return (
      <ul className={`w-full flex gap-2 relative transition-all duration-150 opacity-100`}>
          <Link href={"/"}
              className="text-white text-md sm:text-lg hover:text-gray-300 transition-colors duration-150">
                home</Link>
            {
              paths.map((path:string, index:number) => {
                let text;
                let truepath = "";
                if (path.length > 12) {
                  if (router.pathname.includes("/posts") || router.pathname.includes("/edit")) {
                    text = "post"
                  }
                } else {
                  text = path
                }

                if (paths.length > 1) {
                  const notPath = paths.filter(not => not !== path);
                  notPath.forEach((not:string) => {
                    const notIndex = notPath.findIndex(find => find === not)
                    if (index !== 0) {
                      truepath = `${truepath}/`
                    }
                    console.log(notIndex < index, index)
                    if (notIndex < index) {
                      truepath = `${truepath}${not}/${path}`
                      console.log(truepath)
                    } else {
                      truepath = `${truepath}${path}`
                    }
                  })
                } else {
                  truepath = `${path}`
                }
                
                return(
                  <p key={path} className="text-white text-md sm:text-lg">
                    / <Link href={`/${truepath}`} 
                    className={`hover:text-gray-300 transition-colors duration-150`}
                    >{text}</Link>
                  </p>
                )
              })
            }
      </ul>
    )

  } else {
    return (
        <ul className={`flex gap-2 relative transition-all duration-1000 opacity-0`}>
            
        </ul>
    )
  }
}

export default NavigationContent