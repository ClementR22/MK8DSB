import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface GeneralStoreState {
  isScrollEnable: boolean;
  setIsScrollEnable: (newIsScrollEnable: boolean) => void;
  tabBarHeight: number;
  setTabBarHeight: (height: number) => void;
}

const useGeneralStore = create<GeneralStoreState>((set, get) => ({
  isScrollEnable: true,
  setIsScrollEnable: (newIsScrollEnable) => set({ isScrollEnable: newIsScrollEnable }),

  tabBarHeight: 0,

  setTabBarHeight: (height) => set({ tabBarHeight: height }),
}));

export default useGeneralStore;
