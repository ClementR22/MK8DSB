import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface ModalsStoreState {
  isRenameSetModalVisible: boolean;
  setIsRenameSetModalVisible: (newVisible: boolean) => void;
  isEditModalVisible: boolean;
  setIsEditModalVisible: (newVisible: boolean) => void;
  screenNameForEditModal: ScreenName;
  setScreenNameForEditModal: (newScreenName: ScreenName) => void;
  isChosenStatsModalVisible: boolean;
  setIsChosenStatsModalVisible: (newVisible: boolean) => void;
  isTooltipVisible: boolean;
  setIsTooltipVisible: (newIsTooltipVisible: boolean) => void;
}

// Store Zustand typé
const useModalsStore = create<ModalsStoreState>((set, get) => ({
  isRenameSetModalVisible: false,
  setIsRenameSetModalVisible: (newVisible) => set({ isRenameSetModalVisible: newVisible }),

  isEditModalVisible: false,
  setIsEditModalVisible: (newVisible) => set({ isEditModalVisible: newVisible }),

  screenNameForEditModal: "search",
  setScreenNameForEditModal: (newScreenName) => set({ screenNameForEditModal: newScreenName }),

  isChosenStatsModalVisible: false,
  setIsChosenStatsModalVisible: (newVisible) => set({ isChosenStatsModalVisible: newVisible }),

  isTooltipVisible: false,
  setIsTooltipVisible: (newIsTooltipVisible) => set({ isTooltipVisible: newIsTooltipVisible }),
}));

export default useModalsStore;
