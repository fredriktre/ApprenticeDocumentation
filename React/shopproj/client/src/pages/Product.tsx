import { useLocation } from "react-router"
import useProductsStore from "../stores/productStore";
import { useEffect, useState } from "react";
import { Product as ProductType } from "../library/types/productTypes";

const Product = () => {
  const location = useLocation();
  const productStore = useProductsStore();
  const [currentProduct, setCurrentProduct] = useState<ProductType>();
  const [options, setOptions] = useState();

  useEffect(() => {

    if (productStore.status) {
      const productData = productStore.products.filter((product:ProductType) => product.id === location.pathname.split("/")[2])[0]
      console.log(productData)
    } else {

      // fetch singular product
      getThisProduct(location.pathname.split("/")[2])

    }

  }, [location]);

  async function getThisProduct (id:string) {
    try {

      const res = await fetch(`/api/getproduct/${id}`, {
          method: "GET",
      });
      const data = await res.json();
      const product:ProductType = data.body;
      setCurrentProduct(product);

  } catch (error) {
      console.log(error)
  }
  }

  return (
    <div>

      

    </div>
  )
}

export default Product