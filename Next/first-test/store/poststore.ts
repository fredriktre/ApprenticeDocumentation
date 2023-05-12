import { create } from 'zustand'
import { OutputData } from '@editorjs/editorjs'

export type Post = {
    content: OutputData
    title: string,
    updated: string,
    _id: string,
}

type Store = {
    posts: Post[]
    status: boolean
    setPosts: (input:Post[]) => void
}

const usePostStore = create<Store>((set) => ({
    posts: [],
    status: false,
    setPosts(input:Post[]) {
        set(() => ({
            status: true,
            posts: input,
        }));
    }
}))

export default usePostStore;