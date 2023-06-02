import { create } from 'zustand'

export type StoreUser = {
    id: string
    data: {
        email: string,
        name: string,
    }
    admin: boolean,
    avatar: string
}

type Store = {
    user: StoreUser
    status: boolean
    setUser: (input:StoreUser) => void
    logOut: () => void
}

const useStoreUserStore = create<Store>((set) => ({
    user: {
        id: "",
        data: {
            email: "",
            name: "",
        },
        admin: false,
        avatar: "",
    },
    status: false,
    setUser(input:StoreUser) {
        set(() => ({
            user: {
                id: input.id,
                data: {
                    email: input.data.email,
                    name: input.data.name,
                },
                admin: input.admin,
                avatar: input.avatar,
            },
            status: true
        }));
    },
    logOut(){
        set(() => ({
            status: false,
            user: {
                id: "",
                data: {
                    email: "",
                    name: "",
                },
                admin: false,
                avatar: "",
            }
        }))
    }
}))

export default useStoreUserStore;