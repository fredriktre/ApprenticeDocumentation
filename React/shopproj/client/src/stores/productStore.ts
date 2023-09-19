import { create } from 'zustand'
import { Product } from '../library/types/productTypes'

type Products = {
    products: Product[]
    status: boolean
    addToProducts: (input:Product[]) => void
    removeFromProducts: (input:string) => void
}

const useProductsStore = create<Products>((set) => ({
    products: [],
    status: false,
    addToProducts(input) {
        set(() => ({
            products: [...this.products, ...input],
            status: true
        }));
    },
    removeFromProducts(input) {
        set(() => ({
            cart: this.products.filter((item:Product) => item.id === input),
            status: this.products.length <= 1 ? false : true,
        }))
    }
}))

export default useProductsStore;