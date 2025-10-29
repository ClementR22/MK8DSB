import { create } from "zustand";

interface ModalLoadSetState {
  isLoadSetModalVisible: boolean;
  setIsLoadSetModalVisible: (visible: boolean) => void;
}

export const useModalLoadSetStore = create<ModalLoadSetState>((set) => ({
  isLoadSetModalVisible: false,
  setIsLoadSetModalVisible: (visible: boolean) => set({ isLoadSetModalVisible: visible }),
}));
