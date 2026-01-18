import { create } from "zustand";

interface LoadBuildModaState {
  isLoadBuildModalVisible: boolean;
  setIsLoadBuildModalVisible: (newVisible: boolean) => void;
  openLoadBuildModal: () => void;
}

const useLoadBuildModalStore = create<LoadBuildModaState>((set) => ({
  isLoadBuildModalVisible: false,
  setIsLoadBuildModalVisible: (newVisible: boolean) => set({ isLoadBuildModalVisible: newVisible }),
  openLoadBuildModal: () => set({ isLoadBuildModalVisible: true }),
}));

export default useLoadBuildModalStore;
