import { create } from 'zustand'
import { StoreUser } from './userstore'

type Store = {
    users: StoreUser[]
    status: boolean
    setUsers: (input:StoreUser[]) => void
}

const useUsersStore = create<Store>((set) => ({
    users: [],
    status: false,
    setUsers(input) {
        set(() => ({
            users: [...this.users, ...input],
            status: true
        }));
    }
}))

export default useUsersStore;