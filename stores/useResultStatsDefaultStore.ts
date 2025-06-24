import { create } from "zustand";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { resultStatsInit } from "@/config/resultStatsInit";
import { ResultStats } from "@/contexts/ResultStatsContext";

interface ResultStatsDefaultStore {
  isResultStatsSync: boolean;
  setIsResultStatsSync: (newValue: boolean) => Promise<void>;

  resultStatsDefault: ResultStats;
  setResultStatsDefault: (newList: ResultStats) => void;
  toggleCheckListResultStatsDefault: (name: string) => void;
}

export const useResultStatsDefaultStore = create<ResultStatsDefaultStore>((set, get) => ({
  isResultStatsSync: true,

  async setIsResultStatsSync(newValue) {
    set({ isResultStatsSync: newValue });
    await saveThingInMemory("isResultStatsSync", newValue);
  },

  resultStatsDefault: resultStatsInit,

  setResultStatsDefault(newList) {
    set({ resultStatsDefault: newList });
    saveThingInMemory("resultStatsDefault", newList);
  },

  toggleCheckListResultStatsDefault(name) {
    const newList = toggleAndGetChecks(get().resultStatsDefault, name);
    get().setResultStatsDefault(newList);
  },
}));
