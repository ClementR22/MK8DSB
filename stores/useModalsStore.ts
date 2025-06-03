import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface ModalsStoreState {
  isRenameSetModalVisible: boolean;
  setIsRenameSetModalVisible: (newVisible: boolean) => void;
  isEditModalVisible: boolean;
  setIsEditModalVisible: (newVisible: boolean) => void;
  isChosenStatsModalVisible: boolean;
  setIsChosenStatsModalVisible: (newVisible: boolean) => void;
  screenNameForEditModal: ScreenName;
  setScreenNameForEditModal: (newScreenName: ScreenName) => void;
  isTooltipVisible: boolean;
  setIsTooltipVisible: (newIsTooltipVisible: boolean) => void;
}

// Store Zustand typé
const useModalsStore = create<ModalsStoreState>((set, get) => ({
  isRenameSetModalVisible: false,
  setIsRenameSetModalVisible: (newVisible) => set({ isRenameSetModalVisible: newVisible }),

  isEditModalVisible: false,
  setIsEditModalVisible: (newVisible) => set({ isEditModalVisible: newVisible }),

  isChosenStatsModalVisible: false,
  setIsChosenStatsModalVisible: (newVisible) => set({ isChosenStatsModalVisible: newVisible }),

  screenNameForEditModal: "search",
  setScreenNameForEditModal: (newScreenName) => set({ screenNameForEditModal: newScreenName }),

  isTooltipVisible: false,
  setIsTooltipVisible: (newIsTooltipVisible) => set({ isTooltipVisible: newIsTooltipVisible }),
}));

export default useModalsStore;
