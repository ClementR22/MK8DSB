import { create } from "zustand";

interface ModalLoadBuildState {
  isLoadBuildModalVisible: boolean;
  setIsLoadBuildModalVisible: (visible: boolean) => void;
}

export const useModalLoadBuildStore = create<ModalLoadBuildState>((set) => ({
  isLoadBuildModalVisible: false,
  setIsLoadBuildModalVisible: (visible: boolean) => set({ isLoadBuildModalVisible: visible }),
}));
