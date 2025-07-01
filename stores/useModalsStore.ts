import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface ModalsStoreState {
  isRenameSetModalVisible: boolean;
  setIsRenameSetModalVisible: (newVisible: boolean) => void;
  isEditModalVisible: boolean;
  setIsEditModalVisible: (newVisible: boolean) => void;
  isChosenStatsModalVisible: boolean;
  setIsChosenStatsModalVisible: (newVisible: boolean) => void;
}

const useModalsStore = create<ModalsStoreState>((set, get) => ({
  isRenameSetModalVisible: false,
  setIsRenameSetModalVisible: (newVisible) => set({ isRenameSetModalVisible: newVisible }),

  isEditModalVisible: false,
  setIsEditModalVisible: (newVisible) => set({ isEditModalVisible: newVisible }),

  isChosenStatsModalVisible: false,
  setIsChosenStatsModalVisible: (newVisible) => set({ isChosenStatsModalVisible: newVisible }),
}));

export default useModalsStore;
