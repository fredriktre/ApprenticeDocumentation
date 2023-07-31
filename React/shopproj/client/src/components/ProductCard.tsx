import { useState } from "react"

const ProductCard = () => {

    const [productInformation, setProductInformation] = useState();
    const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <>
        <div>



        </div>
        {
            modalOpened &&
            <div className="fixed z-[60] top-0 left-0 w-full h-screen">



                <span className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></span>
            </div>
        }
    </>
  )
}

export default ProductCard