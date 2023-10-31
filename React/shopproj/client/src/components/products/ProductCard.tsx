import { useEffect, useState } from "react"
import { Product, ProductImage } from "../../library/types/productTypes"
import { Link } from "react-router-dom";

interface Props {
    product: Product
}

const ProductCard = ({product}:Props) => {
    const [currentShownImage, setCurrentShownImage] = useState(0);
    const [hovering, setHovering] = useState(false);    

    useEffect(() => {
        console.log(product)
    }, [])

    return (
    <div className="product-card"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}>
        <div className={`product-card-image-wrapper ${hovering && "hovering"}`}>
            <button 
                onClick={() => setCurrentShownImage((oldstate) => {
                    if (oldstate > 0) {
                        return oldstate - 1
                    } else {
                        return 0
                    }
                })}
                className={`left ${hovering && currentShownImage != 0 && "active"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
            </button>
            {
                product.images.map((image:ProductImage, index:number) => (
                    <img className={`${currentShownImage === index && "shown"}`} 
                        src={image.src} key={index} />
                ))
            }
            <button 
                onClick={() => setCurrentShownImage((oldstate) => {
                    if (oldstate < product.images.length - 1) {
                        return oldstate + 1
                    } else {
                        return product.images.length - 1
                    }
                })}
                className={`right ${hovering && currentShownImage != product.images.length - 1 && "active"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
        <Link to={`/product/${product.id}`} className={`product-card-content-button ${hovering && "hovering"}`}>
            {product.title}
        </Link>
    </div>
  )
}

export default ProductCard