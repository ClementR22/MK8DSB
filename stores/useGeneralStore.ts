import { RESULTS_NUMBER_DEFAULT } from "@/constants/constants";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
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

  resultsNumber: number;
  setResultsNumber: (newResultsNumber: number) => void;

  isLoading: boolean;
  setIsLoading: (newIsLoading: boolean) => void;

  shouldScrollToTop: boolean;
  setShouldScrollToTop: () => void;
  resetScrollToTop: () => void;
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

  getTooltipVerticalOffset: () => (get().isAnyModalVisible ? -get().statusBarHeight : 0),

  resultsNumber: RESULTS_NUMBER_DEFAULT,
  setResultsNumber: async (newResultsNumber: number) => {
    await saveThingInMemory("resultsNumber", newResultsNumber);
    set({ resultsNumber: newResultsNumber });
  },

  isLoading: false,
  setIsLoading: (newIsLoading: boolean) => {
    set({ isLoading: newIsLoading });
  },

  shouldScrollToTop: false,
  setShouldScrollToTop: () => {
    set({ shouldScrollToTop: true });
  },
  resetScrollToTop: () => {
    set({ shouldScrollToTop: false });
  },
}));

export default useGeneralStore;
