import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface GeneralStoreState {
  isScrollEnable: boolean;
  setIsScrollEnable: (newIsScrollEnable: boolean) => void;
  tabBarHeight: number;
  setTabBarHeight: (height: number) => void;
  showAllStatGaugeBonuses: boolean;
  toggleAllStatGaugeBonuses: () => void;
  isAnyModalVisible: boolean;
  setIsAnyModalVisible: (newIsAnyModalVisible: boolean) => void;
  statusBarHeight: number;
  setStatusBarHeight: (newStatusBarHeight: number) => void;
  getTooltipVerticalOffset: () => number;
}

const useGeneralStore = create<GeneralStoreState>((set, get) => ({
  isScrollEnable: true,
  setIsScrollEnable: (newIsScrollEnable) => set({ isScrollEnable: newIsScrollEnable }),

  tabBarHeight: 0,
  setTabBarHeight: (height) => set({ tabBarHeight: height }),

  showAllStatGaugeBonuses: false,
  toggleAllStatGaugeBonuses: () => set((state) => ({ showAllStatGaugeBonuses: !state.showAllStatGaugeBonuses })),

  isAnyModalVisible: false,
  setIsAnyModalVisible: (newIsAnyModalVisible: boolean) => {
    set({ isAnyModalVisible: newIsAnyModalVisible });
  },

  statusBarHeight: 0,
  setStatusBarHeight: (newStatusBarHeight: number) => set({ statusBarHeight: newStatusBarHeight }),

  getTooltipVerticalOffset: () => {
    return get().isAnyModalVisible ? -get().statusBarHeight : 0;
  },
}));

export default useGeneralStore;
