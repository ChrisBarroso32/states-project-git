import {create} from "zustand"

export const useUserStore = create((set) => ({
    user: null,
    login: () => set({ user: { name: "Chris", email: "chris@example.com"}}),
    logout: () => set({user: null}),
}));