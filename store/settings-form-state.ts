import { create } from "zustand";

type Props = {
  toEdit: string;
  prevValue: string;
  isOpen: boolean;
  onOpen: (forField: string, prevValue?: string) => void;
  onClose: () => void;
};

export const settingsModalState = create<Props>((set) => ({
  toEdit: "",
  prevValue: "",
  isOpen: false,
  onOpen: (toEdit, prevValue) => set({ isOpen: true, toEdit, prevValue }),
  onClose: () => set({ isOpen: false, toEdit: "", prevValue: "" }),
}));
