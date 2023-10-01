import { useLocation } from "react-router"
import useProductsStore from "../stores/productStore";
import { useEffect, useState } from "react";
import { Product as ProductType } from "../library/types/productTypes";

const Product = () => {
  const location = useLocation();
  const productStore = useProductsStore();
  const [currentProduct, setCurrentProduct] = useState<ProductType>();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentlyHovered, setCurrentlyHovered] = useState<boolean>(false);
  const [currentDecicions, setCurrentDecicions] = useState({

  });

  useEffect(() => {

    if (productStore.status) {
      const productData = productStore.products.filter((product:ProductType) => product.id === location.pathname.split("/")[2])[0]
      console.log(productData)
      setCurrentProduct(productData)
    } else {

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
      console.log(product)
      setCurrentProduct(product);

    } catch (error) {
        console.log(error)
    }
  }

  const changeCurrentImage = (value:boolean) => {
    if (currentProduct) {
      if (value === false) {
  
        if (currentImage > 0) {
          setCurrentImage(currentImage - 1)
        } 
  
      } else if (value === true) {
  
        if (currentImage < currentProduct.images.length - 1) {
          setCurrentImage(currentImage + 1)          
        }
  
      }
    }
  }

  const addToCart = async () => {
    console.log("test add")
  }

  return (
    <div className="product-page-wrapper">

      <div className="product-page-wrapper-content">

        <div className="product-page-wrapper-content-image-wrapper"
          onMouseEnter={() => setCurrentlyHovered(true)}
          onMouseLeave={() => setCurrentlyHovered(false)}>
          <button 
            className={`${currentlyHovered && "active"} left`}
            onClick={() => changeCurrentImage(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </button>
          {
            currentProduct != undefined &&
            currentProduct.images.map((image:any, index:number) => {
              return (
                <img src={image.src} key={index} className={`${currentImage === index && "active"}`} />
              )
            })
          }
          <button 
            className={`${currentlyHovered && "active"} right`}
            onClick={() => changeCurrentImage(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>

        <div className="product-page-wrapper-content-interaction-wrapper">
          <h1>{currentProduct?.title}</h1>
          <div dangerouslySetInnerHTML={{
            __html: `${currentProduct?.description}`
          }}></div>
          <div className="product-page-wrapper-content-interaction-wrapper-buttons">
            {
              currentProduct?.options.map((option:any, index:number) => (
                <select id={option.name} key={`${index}-${option.name}`}>
                  {
                    option.values.map((value:any, index:number) => (
                      <option key={`${index}-${value.title}`} 
                      value={value.id}>{value.title}</option>
                    ))
                  }
                </select>
              ))
            }
            <button
              onPointerDown={addToCart}
            >
              Add to cart
            </button>
          </div>
        </div>

      </div>

      

    </div>
  )
}

export default Product