import { create } from "zustand";

interface LoadBuildModaState {
  isLoadBuildModalVisible: boolean;
  setIsLoadBuildModalVisible: (visible: boolean) => void;
}

const useLoadBuildModalStore = create<LoadBuildModaState>((set) => ({
  isLoadBuildModalVisible: false,
  setIsLoadBuildModalVisible: (visible: boolean) => set({ isLoadBuildModalVisible: visible }),
}));

export default useLoadBuildModalStore;
