import { useEffect, useState } from "react"
import CategorySlider from "../components/CategorySlider"
import ProductCard from "../components/ProductCard"

const Home = () => {
    const [shopData, setShopData] = useState();

    useEffect(() => {

        if (shopData) return
        getProducts();

    }, [])

    const getProducts = async () => {

        try {

            const res = await fetch("/api/getproducts");
            const data = await res.json();
            setShopData(data)
            console.log(data)
            console.log(data.body.data)


        } catch (error) {
            console.log(error)
        }

    }
    
  return (
    <div className="w-full h-full min-h-screen-16">

        <div className="w-full h-screen">
            <div className="w-4/5 mx-auto h-full flex flex-col gap-5">
                <CategorySlider>
                    {/* <ProductCard productInformation={} /> */}
                </CategorySlider>
            </div>
        </div>
    </div>
  )
}

export default Home