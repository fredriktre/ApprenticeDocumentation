import { useLocation } from "react-router"
import useProductsStore from "../stores/productStore";
import { useEffect, useState } from "react";
import { ProductImage, ProductOptions, Product as ProductType } from "../library/types/productTypes";

const Product = () => {
  const location = useLocation();
  const productStore = useProductsStore();
  const [currentProduct, setCurrentProduct] = useState<ProductType>();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentOptions, setCurrentOptions] = useState<any[]>([]);
  const [currentVariant, setCurrentVariant] = useState<any>();
  const [refr, setRefr] = useState<boolean>(false);

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
      console.log(product);
      setCurrentProduct(product);

    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (!currentProduct) return
    const options:any[] = []
    currentProduct.options.forEach((option:ProductOptions) => {
      options.push({
        type: option.type,
        activeID: option.values[0].id,
      })
    })
    setCurrentOptions(options)
    handleChangeVariant()
  }, [currentProduct])

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

  const handleChangeOfOption = (type:string, id:number) => {
    const pos = currentOptions.findIndex((piece:any) => piece.type === type);
    const newOptions = currentOptions
    newOptions[pos].activeID = id
    setCurrentOptions(newOptions)
    setRefr(!refr)
    handleChangeVariant();
  }

  const handleChangeVariant = () => {
    currentProduct?.variants.forEach((variant:any) => {
      const variantsArray:any[] = []
      variant.options.forEach((option:number) => {
        const response = currentOptions.filter((piece:any) => piece.activeID === option)[0];
        if (response != undefined) {
          variantsArray.push(response)
        }
      })
      if (variantsArray.length === 2) {
        setCurrentVariant(variant)
      } 
    })
  }

  const addToCart = async () => {
    if (currentProduct) {
      const cartObject:ProductType = {
        blueprint_id: currentProduct.blueprint_id,
        created_at: currentProduct.created_at,
        description: currentProduct.description,
        id: currentProduct.id,
        images: currentProduct.images,
        is_locked: currentProduct.is_locked,
        is_printify_express_eligible: currentProduct.is_printify_express_eligible,
        options: currentProduct.options,
        print_areas: currentProduct.print_areas,
        print_details: currentProduct.print_details,
        print_provider_id: currentProduct.print_provider_id,
        sales_channel_properties: currentProduct.sales_channel_properties,
        shop_id: currentProduct.shop_id,
        tags: currentProduct.tags,
        title: currentProduct.title,
        updated_at: currentProduct.updated_at,
        user_id: currentProduct.user_id,
        variants: [currentVariant],
        visible: currentProduct.visible
      }
      console.log(cartObject)
    }
  }

  return (
    <div className="product_page-wrapper">

      <div className="product_page-header">

        <div className="product_page-header-image-wrapper">
            <button 
              className={`${currentProduct && currentImage != 0 && "active"} left`}
              onClick={() => changeCurrentImage(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>
            {
              currentProduct?.images.map((image:ProductImage, index:number) => (
                <img key={index} className={`${currentImage === index && "shown"}`} src={image.src} alt={image.position} />
              ))
            }
            <button 
              className={`${currentProduct && currentImage != currentProduct?.images.length - 1 && "active"} right`}
              onClick={() => changeCurrentImage(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
            <p>{currentImage + 1}/{currentProduct?.images.length}</p>
        </div>

        <div className="product_page-header-content-wrapper">
            <h1>{currentProduct?.title}</h1>
            <p>{currentVariant ? currentVariant.price / 100 : 0}$</p>
            <div className="product_page-header-content-wrapper-options-wrapper">
              {
                currentProduct?.options.map((option:ProductOptions, index:number) => {

                  if (option.type === "size") {                    
                    return (
                      <div key={index} className="product_page-header-content-wrapper-options">
                        {
                          option.values.length > 1 &&
                          option.values.map((value:any, index:number) => {                           

                            return (
                              <button 
                              onPointerDown={() => handleChangeOfOption("size", value.id)}
                              className={`sizebutton 
                              ${currentOptions.filter((piece:any) => piece.type === "size" 
                              && piece.activeID === value.id).length > 0 ? "chosen" : ""}`} 
                              key={`${index}-${value.id}`}>
                                {value.title}
                              </button>
                            )
                          })
                        }
                      </div>
                    )
                  } else if (option.type === "color") {
                    return (
                      <div key={index} className="product_page-header-content-wrapper-options">
                        {
                          option.values.length > 1 &&
                          option.values.map((value:any, index:number) => (
                            <button 
                            onPointerDown={() => handleChangeOfOption("color", value.id)}
                            className={`colorbutton 
                            ${currentOptions.filter((piece:any) => piece.type === "color" 
                            && piece.activeID === value.id).length > 0 ? "chosen" : ""}`} 
                            key={`${index}-${value.id}`}
                            style={{
                              backgroundColor: value.colors[0]
                            }}>
                            </button>
                          ))
                        }
                      </div>
                    )
                  }

                })
              }
            </div>
            <button 
            onPointerDown={addToCart}
            className="addToCartButton">
              Add to Cart
            </button>
        </div>

      </div>

      <div className="product_page-description" dangerouslySetInnerHTML={{
        __html: `${currentProduct?.description}`
      }}></div>

    </div>
  )
}

export default Product