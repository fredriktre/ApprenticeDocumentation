import { create } from 'zustand'

type Store = {
    usernames: string[]
    status: boolean
    setUser: (input:string[]) => void
}

const useUsersStore = create<Store>((set) => ({
    usernames: [],
    status: false,
    setUser(input) {
        set(() => ({
            usernames: [...input],
            status: true
        }));
    }
}))

export default useUsersStore;