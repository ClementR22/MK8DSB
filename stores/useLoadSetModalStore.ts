import { create } from "zustand";

interface LoadSetModalState {
  isLoadSetModalVisible: boolean;
  setIsLoadSetModalVisible: (visible: boolean) => void;
}

export const useLoadSetModalStore = create<LoadSetModalState>((set) => ({
  isLoadSetModalVisible: false,
  setIsLoadSetModalVisible: (visible: boolean) => set({ isLoadSetModalVisible: visible }),
}));
