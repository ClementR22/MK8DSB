import { RESULTS_NUMBER_DEFAULT } from "@/config/config";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { create } from "zustand";

interface GeneralStoreState {
  isSettingsLoaded: boolean;
  setIsSettingsLoaded: (newIsSettingsLoaded: boolean) => void;

  isScrollEnable: boolean;
  setIsScrollEnable: (newIsScrollEnable: boolean) => void;

  showAllStatGaugeBonuses: boolean;
  toggleAllStatGaugeBonuses: () => void;

  resultsNumber: number;
  setResultsNumber: (newResultsNumber: number) => void;

  isLoading: boolean;
  setIsLoading: (newIsLoading: boolean) => void;

  shouldScrollToTop: boolean;
  setShouldScrollToTop: () => void;
  resetScrollToTop: () => void;

  isBuildCardsCollapsed: boolean;
  toggleIsBuildCardsCollapsed: () => void;

  numberSavedBuilds: number;
  setNumberSavedBuilds: (newNumberSavedBuilds: number) => void;

  isIntro: boolean;
  hideIntro: () => void;
}

const useGeneralStore = create<GeneralStoreState>((set, get) => ({
  isSettingsLoaded: false,
  setIsSettingsLoaded: (newIsSettingsLoaded) => set({ isSettingsLoaded: newIsSettingsLoaded }),

  isScrollEnable: true,
  setIsScrollEnable: (newIsScrollEnable) => set({ isScrollEnable: newIsScrollEnable }),

  showAllStatGaugeBonuses: false,
  toggleAllStatGaugeBonuses: () => set((state) => ({ showAllStatGaugeBonuses: !state.showAllStatGaugeBonuses })),

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

  isBuildCardsCollapsed: false,
  toggleIsBuildCardsCollapsed: () => {
    set((state) => ({ isBuildCardsCollapsed: !state.isBuildCardsCollapsed }));
  },

  numberSavedBuilds: 0,
  setNumberSavedBuilds: (newNumberSavedBuilds: number) => set({ numberSavedBuilds: newNumberSavedBuilds }),

  isIntro: true,
  hideIntro: () => {
    set({ isIntro: false });
  },
}));

export default useGeneralStore;
