import { create } from 'zustand'


type User = {
    id: string
    data: {
        email: string,
        fullName: string,
    }
    admin: boolean
}

type Store = {
    user: User
    status: boolean
    setUser: (input:User) => void
    logOut: () => void
}

const useUserStore = create<Store>((set) => ({
    user: {
        id: "",
        data: {
            email: "",
            fullName: "",
        },
        admin: false,
    },
    status: false,
    setUser(input) {
        set(() => ({
            user: {
                id: input.id,
                data: {
                    email: input.data.email,
                    fullName: input.data.fullName,
                },
                admin: input.admin,
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
                    fullName: "",
                },
                admin: false,
            }
        }))
    }
}))

export default useUserStore;