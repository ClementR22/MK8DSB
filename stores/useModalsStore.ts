import { create } from "zustand";

type ScreenName = "search" | "display" | "save" | "gallery";
interface ModalsStoreState {
  isRenameSetModalVisible: boolean;
  setIsRenameSetModalVisible: (newVisible: boolean) => void;
  isEditModalVisible: boolean;
  setIsEditModalVisible: (newVisible: boolean) => void;
  screenNameForEditModal: ScreenName;
  setScreenNameForEditModal: (screenName: ScreenName) => void;
}

// Store Zustand typé
const useModalsStore = create<ModalsStoreState>((set, get) => ({
  isRenameSetModalVisible: false,
  setIsRenameSetModalVisible: (newVisible) => set({ isRenameSetModalVisible: newVisible }),

  isEditModalVisible: false,
  setIsEditModalVisible: (newVisible) => set({ isEditModalVisible: newVisible }),

  screenNameForEditModal: "search",
  setScreenNameForEditModal: (screenName) => set({ screenNameForEditModal: screenName }),
}));

export default useModalsStore;
