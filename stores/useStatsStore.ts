import { create } from "zustand";

// Types
import { ChosenStat, StatName } from "@/types";

interface StatsStoreState {
  chosenStats: ChosenStat[];

  initChosenStats: (chosenStatsSelectedInit: ChosenStat[]) => void;
  setChosenStats: (newChosenStats: ChosenStat[]) => void;
  updateStatValue: (name: StatName, newValue: number) => void;
  setStatFilterNumber: (statName: string, newState: number) => void;
  loadBuildStats: (stats: number[]) => void;
}

const useStatsStore = create<StatsStoreState>((set, get) => ({
  chosenStats: [],

  initChosenStats: (chosenStatsSelectedInit) =>
    set({
      chosenStats: chosenStatsSelectedInit,
    }),

  setChosenStats: (newChosenStats) => {
    set({ chosenStats: newChosenStats });
  },

  updateStatValue: (name, newValue) =>
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) => (stat.name === name ? { ...stat, value: newValue } : stat)),
    })),

  setStatFilterNumber: (statName, newState) => {
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) =>
        stat.name === statName ? { ...stat, statFilterNumber: newState } : stat
      ),
    }));
  },

  loadBuildStats: (stats) => {
    set((state) => ({
      chosenStats: state.chosenStats.map((stat, i) => ({
        ...stat,
        value: stats[i],
      })),
    }));
  },
}));

export default useStatsStore;
