import { create } from "zustand";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { Game, ResultStat } from "@/types";
import { IS_RESULT_STATS_SYNC_DEFAULT } from "@/config/config";

interface ResultStatsDefaultState {
  isResultStatsSync: boolean;
  setIsResultStatsSync: (newValue: boolean) => Promise<void>;

  resultStatsDefault: Record<Game, ResultStat[]>;
  initResultStatsDefault: (initObj: Record<Game, ResultStat[]>) => void;
  setResultStatsDefaultForGame: (list: ResultStat[], game: Game) => Promise<void>;
}

const useResultStatsDefaultStore = create<ResultStatsDefaultState>((set, get) => ({
  isResultStatsSync: IS_RESULT_STATS_SYNC_DEFAULT,

  setIsResultStatsSync: async (newValue) => {
    await saveThingInMemory("isResultStatsSync", newValue);
    set({ isResultStatsSync: newValue });
  },

  resultStatsDefault: { MK8D: [], MKW: [] },

  initResultStatsDefault: (obj) => set({ resultStatsDefault: obj }),

  setResultStatsDefaultForGame: async (list, game) => {
    const current = get().resultStatsDefault;
    const updated = { ...current, [game]: list };

    await saveThingInMemory("resultStatsDefault", updated);
    set({ resultStatsDefault: updated });
  },
}));

export default useResultStatsDefaultStore;
