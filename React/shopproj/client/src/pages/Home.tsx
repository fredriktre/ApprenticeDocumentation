import { useEffect, useState } from "react"
import ProductCard from "../components/products/ProductCard";
import { Product } from "../library/types/productTypes"
import useProductsStore from "../stores/productStore";

const Home = () => {
    const [shopData, setShopData] = useState<Product[]>([]);
    const productStore = useProductsStore();
    let i = 0;
    useEffect(() => {
        i++
        if (i < 2) return
        if (shopData.length > 0) return
        getProducts();

    }, [])

    const getProducts = async () => {

        try {

            const res = await fetch("/api/getproducts", {
                method: "GET",
            });
            const data = await res.json();
            const products:Product[] = data.body.data
            console.log(products)
            console.log(data)
            if (!productStore.status) {
                productStore.addToProducts(products)
            }
            setShopData(products)

        } catch (error) {
            console.log(error)
        }

    }
    
  return (
    <div className="home-wrapper">
        <div className="auto-grid"> 
            {
                shopData.length > 0 &&
                shopData.map((data:Product, index:number) => (
                    <ProductCard key={index} product={data} />
                ))
            }
        </div>
    </div>
  )
}

export default Home