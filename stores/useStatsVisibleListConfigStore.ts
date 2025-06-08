import { create } from "zustand";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { statsVisibleListInit } from "@/config/statsVisibleListInit";

type StatVisibility = {
  name: string;
  checked: boolean;
};

export type StatsVisibleList = StatVisibility[];

interface StatsVisibleListConfigState {
  isStatsVisibleSync: boolean;
  setIsStatsVisibleSync: (newValue: boolean) => Promise<void>;

  statsVisibleListDefault: StatsVisibleList;
  setStatsVisibleListDefault: (newList: StatsVisibleList) => void;
  toggleCheckListStatsVisibleListDefault: (name: string) => void;
}

// === CONFIGURATION INITIALE ===

export const useStatsVisibleListConfigStore = create<StatsVisibleListConfigState>((set, get) => ({
  isStatsVisibleSync: true,

  async setIsStatsVisibleSync(newValue) {
    set({ isStatsVisibleSync: newValue });
    await saveThingInMemory("isStatsVisibleSync", newValue);
  },

  statsVisibleListDefault: statsVisibleListInit,

  setStatsVisibleListDefault(newList) {
    set({ statsVisibleListDefault: newList });
    saveThingInMemory("statsVisibleListDefault", newList);
  },

  toggleCheckListStatsVisibleListDefault(name) {
    const newList = toggleAndGetChecks(get().statsVisibleListDefault, name);
    get().setStatsVisibleListDefault(newList);
  },
}));
