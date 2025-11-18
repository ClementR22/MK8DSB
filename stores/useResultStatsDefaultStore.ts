import { create } from "zustand";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { ResultStat } from "@/types";
import { IS_RESULT_STATS_SYNC } from "@/config/config";

interface ResultStatsDefaultState {
  isResultStatsSync: boolean;
  setIsResultStatsSync: (newValue: boolean) => Promise<void>;

  resultStatsDefault: ResultStat[];
  initResultStatsDefault: (resultStatsDefaultInit: ResultStat[]) => void;
  setResultStatsDefault: (newList: ResultStat[]) => void;
  toggleCheckListResultStatsDefault: (name: string) => void;
}

const useResultStatsDefaultStore = create<ResultStatsDefaultState>((set, get) => ({
  isResultStatsSync: IS_RESULT_STATS_SYNC,

  async setIsResultStatsSync(newValue) {
    await saveThingInMemory("isResultStatsSync", newValue);
    set({ isResultStatsSync: newValue });
  },

  resultStatsDefault: [],

  initResultStatsDefault: (resultStatsDefaultInit: ResultStat[]) => set({ resultStatsDefault: resultStatsDefaultInit }),

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
