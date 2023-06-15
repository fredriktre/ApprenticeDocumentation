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
    needRefresh: boolean
    setUser: (input:StoreUser) => void
    setForRefresh: (input:boolean) => void
    logOut: () => void
}

const useUserStore = create<Store>((set) => ({
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
    needRefresh: false,
    setUser(input) {
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
    setForRefresh(input) {
        set(() => ({
            needRefresh: input
        }))
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

export default useUserStore;