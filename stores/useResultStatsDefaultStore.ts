import { create } from "zustand";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { resultStatsDefaultInit } from "@/config/resultStatsInit";
import { ResultStat } from "@/contexts/ResultStatsContext";
import { IS_RESULT_STATS_SYNC } from "@/constants/constants";

interface ResultStatsDefaultState {
  isResultStatsSync: boolean;
  setIsResultStatsSync: (newValue: boolean) => Promise<void>;

  resultStatsDefault: ResultStat[];
  setResultStatsDefault: (newList: ResultStat[]) => void;
  toggleCheckListResultStatsDefault: (name: string) => void;
}

const useResultStatsDefaultStore = create<ResultStatsDefaultState>((set, get) => ({
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

export default useResultStatsDefaultStore;
