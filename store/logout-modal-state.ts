import { create } from "zustand";

interface ILogoutModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const logoutModalState = create<ILogoutModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
