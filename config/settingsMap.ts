import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { resultStatsDefaultInit } from "./resultStatsInit";
import useGeneralStore from "@/stores/useGeneralStore";
import { IS_RESULT_STATS_SYNC, RESULTS_NUMBER_DEFAULT, SORT_NUMBER_SAVED_BUILDS_DEFAULT } from "@/constants/constants";
import useBuildsPersistenceStore from "@/stores/useBuildsPersistenceStore";

type SettingKey = "theme" | "isResultStatsSync" | "resultStatsDefault" | "sortNumberSavedBuilds" | "resultsNumber";

type SettingsEntry = {
  setState: (value: any) => void;
  defaultValue: any;
};

export function useSettingsMap(): Record<SettingKey, SettingsEntry> {
  const setIsResultStatsSync = useResultStatsDefaultStore((state) => state.setIsResultStatsSync);
  const setResultStatsDefault = useResultStatsDefaultStore((state) => state.setResultStatsDefault);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setSortNumberSavedBuilds = useBuildsPersistenceStore((state) => state.setSortNumberSavedBuilds);
  const setResultsNumber = useGeneralStore((state) => state.setResultsNumber);

  return {
    theme: { setState: setTheme, defaultValue: "system" },
    isResultStatsSync: { setState: setIsResultStatsSync, defaultValue: IS_RESULT_STATS_SYNC },
    resultStatsDefault: { setState: setResultStatsDefault, defaultValue: resultStatsDefaultInit },
    sortNumberSavedBuilds: { setState: setSortNumberSavedBuilds, defaultValue: SORT_NUMBER_SAVED_BUILDS_DEFAULT },
    resultsNumber: { setState: setResultsNumber, defaultValue: RESULTS_NUMBER_DEFAULT },
  };
}
