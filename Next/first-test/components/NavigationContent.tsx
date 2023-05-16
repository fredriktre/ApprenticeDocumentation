import Link from "next/link"
import { useRouter } from "next/router";
import useUserStore from "@/store/userstore";
import { useEffect, useState } from "react";

const NavigationContent = () => {
    const router = useRouter();  
    const [loading, setLoading] = useState(true)
    const [paths, setPath] = useState<string[]>([])

  useEffect(() => {
    if (!router.isReady) return
    const rawpath = router.asPath.split("/")
    setPath(rawpath.splice(1, rawpath.length))
    setLoading(false)
}, [router.isReady])

  if (!loading) {

    return (
      <ul className={`w-full flex gap-2 relative transition-all duration-150 opacity-100`}>
          <Link href={"/"}
              className="text-white text-md sm:text-lg hover:text-gray-300 transition-colors duration-150">
                home</Link>
            {
              paths.map((path:string, index:number) => {
                let text:string = "";
                let truepath:string = "";
                let skip:boolean = false

                if (path === "admin" || path === "edit") {
                  skip = true;
                }

                if (!skip) {

                  if (path.length > 12) {
                    if (router.pathname.includes("/posts")) {
                      text = "post"
                    }
                    if (router.pathname.includes("/edit")) {
                      text = "edit"
                    }
                  } else {
                    text = path
                  }
                  
                  if (paths.length > 1) {
                    const notPath = paths.filter(not => not !== path);
                    let count = index
                    notPath.forEach((not:string, index:number) => {
                      // const notIndex = notPath.findIndex(find => find === not)
                      if (index < count) {
                        truepath = `${truepath}/${not}`
                      }
                    })
                    truepath = `${truepath}/${path}`
                    console.log(truepath)
                  } else {
                    truepath = `${path}`
                  }

                  return(
                    <p key={path} className="text-white text-md sm:text-lg">
                      / <Link href={`${truepath}`} 
                      className={`hover:text-gray-300 transition-colors duration-150`}
                      >{text}</Link>
                    </p>
                  )

                } else {
                  console.log("skip: " + skip)
                }

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