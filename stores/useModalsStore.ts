import { create } from "zustand";

interface ModalsStoreState {
  isTextInputModalVisible: boolean;
  setIsTextInputModalVisible: (newVisible: boolean) => void;
  isElementsSelectorModalVisible: boolean;
  setIsElementsSelectorModalVisible: (newVisible: boolean) => void;
}

// Store Zustand typé
const useModalsStore = create<ModalsStoreState>((set, get) => ({
  isTextInputModalVisible: false,
  setIsTextInputModalVisible: (newVisible) => set({ isTextInputModalVisible: newVisible }),

  isElementsSelectorModalVisible: false,
  setIsElementsSelectorModalVisible: (newVisible) => set({ isElementsSelectorModalVisible: newVisible }),
}));

export default useModalsStore;
