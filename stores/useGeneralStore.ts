import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface GeneralStoreState {
  isScrollEnable: boolean;
  setIsScrollEnable: (newIsScrollEnable: boolean) => void;
  tabBarHeight: number;
  setTabBarHeight: (height: number) => void;
  showAllStatSliderCompactBonuses: boolean;
  toggleAllStatSliderCompactBonuses: () => void;
}

const useGeneralStore = create<GeneralStoreState>((set, get) => ({
  isScrollEnable: true,
  setIsScrollEnable: (newIsScrollEnable) => set({ isScrollEnable: newIsScrollEnable }),

  tabBarHeight: 0,
  setTabBarHeight: (height) => set({ tabBarHeight: height }),

  showAllStatSliderCompactBonuses: false,
  toggleAllStatSliderCompactBonuses: () =>
    set((state) => ({ showAllStatSliderCompactBonuses: !state.showAllStatSliderCompactBonuses })),
}));

export default useGeneralStore;
