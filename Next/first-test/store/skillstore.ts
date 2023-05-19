import { create } from 'zustand'

export type Skill = {
    category: string,
    name: string,
    confidence: number,
    _id: string,
}

type Store = {
    skills: Skill[]
    status: boolean
    setSkill: (input:Skill) => void
    changeSkill: (input:Skill) => void
}

const useSkillStore = create<Store>((set) => ({
    skills: [],
    status: false,
    setSkill(input:Skill) {
        set((state) => ({
            status: true,
            skills: [
                ...state.skills,
                {
                    category: input.category,
                    name: input.name,
                    confidence: input.confidence,
                    _id: input._id
                }
            ]
        }))
    },
    changeSkill(input:Skill) {
        
        function handleChange(get:Skill[]) {
            const same = get.filter((piece:Skill) => piece._id !== input._id)
            same.push(input)
            return same
        }

        set((state) => ({
            status: true,
            skills: handleChange(state.skills)
        }))
    }
}))

export default useSkillStore;