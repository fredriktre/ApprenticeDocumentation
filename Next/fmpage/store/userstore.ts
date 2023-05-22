import { create } from 'zustand'
import { User } from '@/lib/auth/session'

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
            name: "",
        },
        admin: false,
        avatarURI: "",
    },
    status: false,
    setUser(input) {
        set(() => ({
            user: {
                id: input.id,
                data: {
                    email: input.data.email,
                    name: input.data.name,
                },
                admin: input.admin,
                avatarURI: input.avatarURI,
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
                avatarURI: "",
            }
        }))
    }
}))

export default useUserStore;