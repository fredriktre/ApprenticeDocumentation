import { create } from 'zustand'

type cartItem = {
    id: number,
    title: string,
    description: string,
    tags: Array<string>,
    options: Array<any>,
    variants: Array<any>,
    images: Array<any>
}

type Store = {
    cart: cartItem[]
    amount: number
    status: boolean
    addToCart: (input:cartItem[]) => void
    removeFromCart: (input:number) => void
}

const useCartStore = create<Store>((set) => ({
    cart: [],
    amount: 0,
    status: false,
    addToCart(input) {
        set(() => ({
            cart: [...this.cart, ...input],
            amount: this.amount + 1,
            status: true
        }));
    },
    removeFromCart(input) {
        set(() => ({
            cart: this.cart.filter((item:cartItem) => item.id != input),
            amount: this.amount - 1,
            status: this.amount <= 1 ? false : true,
        }))
    }
}))

export default useCartStore;