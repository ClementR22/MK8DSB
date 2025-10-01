import { create } from "zustand";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { resultStatsDefaultInit } from "@/config/resultStatsInit";
import { ResultStats } from "@/contexts/ResultStatsContext";
import { IS_RESULT_STATS_SYNC } from "@/constants/constants";

interface ResultStatsDefaultStore {
  isResultStatsSync: boolean;
  setIsResultStatsSync: (newValue: boolean) => Promise<void>;

  resultStatsDefault: ResultStats;
  setResultStatsDefault: (newList: ResultStats) => void;
  toggleCheckListResultStatsDefault: (name: string) => void;
}

export const useResultStatsDefaultStore = create<ResultStatsDefaultStore>((set, get) => ({
  isResultStatsSync: IS_RESULT_STATS_SYNC,

  async setIsResultStatsSync(newValue) {
    await saveThingInMemory("isResultStatsSync", newValue);
    set({ isResultStatsSync: newValue });
  },

  resultStatsDefault: resultStatsDefaultInit,

  async setResultStatsDefault(newList) {
    await saveThingInMemory("resultStatsDefault", newList);
    set({ resultStatsDefault: newList });
  },

  toggleCheckListResultStatsDefault(name) {
    const newList = toggleAndGetChecks(get().resultStatsDefault, name);
    get().setResultStatsDefault(newList);
  },
}));
