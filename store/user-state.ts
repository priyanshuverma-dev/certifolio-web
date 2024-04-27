import { create } from "zustand";

interface useCurrentUserStateProp {
  user?: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useCurrentUserState = create<useCurrentUserStateProp>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
  removeUser: () => set({ user: undefined }),
}));
