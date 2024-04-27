import { create } from "zustand";

export enum FormType {
  Profile = "profile",
  Account = "account",
}

type Props = {
  toEdit: string;
  prevValue: string;
  formType: FormType | null;
  isOpen: boolean;
  onOpen: (forField: string, formType: FormType, prevValue?: string) => void;
  onClose: () => void;
};

export const settingsModalState = create<Props>((set) => ({
  toEdit: "",
  prevValue: "",
  formType: null,
  isOpen: false,
  onOpen: (toEdit, formType, prevValue) =>
    set({ isOpen: true, toEdit, prevValue, formType }),
  onClose: () =>
    set({
      isOpen: false,
      toEdit: "",
      prevValue: "",
      formType: FormType.Profile,
    }),
}));
