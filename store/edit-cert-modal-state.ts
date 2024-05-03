import { create } from "zustand";

interface Props {
  isOpen: boolean;
  onOpen: (cert: Certificate) => void;
  cert: Certificate | null;
  onClose: () => void;
}

export const editCertModalState = create<Props>((set) => ({
  isOpen: false,
  cert: null,
  onOpen: (cert) => set({ isOpen: true, cert: cert }),
  onClose: () => set({ isOpen: false, cert: null }),
}));
