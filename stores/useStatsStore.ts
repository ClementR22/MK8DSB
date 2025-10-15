import { create } from "zustand";

// Data and Types
import { statNames } from "@/data/stats/statsData";
import { StatName } from "@/data/stats/statsTypes";

// Constants
import { CHOSEN_STATS_DEFAULT_SELECTED } from "@/constants/constants";

export interface ChosenStat {
  name: StatName;
  checked: boolean;
  value: number | null;
  statFilterNumber: number;
}

export interface StatsStoreState {
  chosenStats: ChosenStat[];

  setChosenStats: (newChosenStats: ChosenStat[]) => void;
  updateStatValue: (name: StatName, newValue: number) => void;
  setStatFilterNumber: (statName: string, newState: number) => void;
  loadStatsFromSet: (stats: number[]) => void;
}

const useStatsStore = create<StatsStoreState>((set, get) => ({
  chosenStats: statNames.map((statName) => ({
    name: statName,
    checked: CHOSEN_STATS_DEFAULT_SELECTED.includes(statName),
    value: 0,
    statFilterNumber: 0,
  })),

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

  loadStatsFromSet: (stats) => {
    set((state) => ({
      chosenStats: state.chosenStats.map((stat, i) => ({
        ...stat,
        value: stats[i],
      })),
    }));
  },
}));

export default useStatsStore;
