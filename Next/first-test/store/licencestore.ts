import { create } from 'zustand'

export type Licence = {
    title: string,
    forsystem: string,
    time: string,
    _id: string,
}

type Store = {
    licences: Licence[]
    status: boolean
    setLicence: (input:Licence) => void
    changeLicence: (input:Licence) => void
}

const useLicenceStore = create<Store>((set) => ({
    licences: [],
    status: false,
    setLicence(input:Licence) {
        set((state) => ({
            status: true,
            licences: [
                ...state.licences,
                {
                    title: input.title,
                    forsystem: input.forsystem,
                    time: input.time,
                    _id: input._id
                }
            ]
        }))
    },
    changeLicence(input:Licence) {
        
        function handleChange(get:Licence[]) {
            const same = get.filter((piece:Licence) => piece._id !== input._id)
            same.push(input)
            return same
        }

        set((state) => ({
            status: true,
            licences: handleChange(state.licences)
        }))
    }
}))

export default useLicenceStore;