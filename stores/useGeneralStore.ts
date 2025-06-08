import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface GeneralStoreState {
  isScrollEnable: boolean;
  setIsScrollEnable: (newIsScrollEnable: boolean) => void;
}

// Store Zustand typé
const useGeneralStore = create<GeneralStoreState>((set, get) => ({
  isScrollEnable: true,
  setIsScrollEnable: (newIsScrollEnable) => set({ isScrollEnable: newIsScrollEnable }),
}));

export default useGeneralStore;
