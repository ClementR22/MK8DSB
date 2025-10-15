import { useLanguageStore } from "@/stores/useLanguageStore";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { resultStatsDefaultInit } from "./resultStatsInit";
import useGeneralStore from "@/stores/useGeneralStore";
import { IS_RESULT_STATS_SYNC, RESULTS_NUMBER_DEFAULT, SORT_NUMBER_SAVED_SETS_DEFAULT } from "@/constants/constants";
import useSetsPersistenceStore from "@/stores/useSetsPersistenceStore";

type SettingKey =
  | "language"
  | "theme"
  | "isResultStatsSync"
  | "resultStatsDefault"
  | "sortNumberSavedSets"
  | "resultsNumber";

type SettingsEntry = {
  setState: (value: any) => void;
  defaultValue: any;
};

export function useSettingsMap(): Record<SettingKey, SettingsEntry> {
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setIsResultStatsSync = useResultStatsDefaultStore((state) => state.setIsResultStatsSync);
  const setResultStatsDefault = useResultStatsDefaultStore((state) => state.setResultStatsDefault);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setSortNumberSavedSets = useSetsPersistenceStore((state) => state.setSortNumberSavedSets);
  const setResultsNumber = useGeneralStore((state) => state.setResultsNumber);

  return {
    language: { setState: setLanguage, defaultValue: "system" },
    theme: { setState: setTheme, defaultValue: "system" },
    isResultStatsSync: { setState: setIsResultStatsSync, defaultValue: IS_RESULT_STATS_SYNC },
    resultStatsDefault: { setState: setResultStatsDefault, defaultValue: resultStatsDefaultInit },
    sortNumberSavedSets: { setState: setSortNumberSavedSets, defaultValue: SORT_NUMBER_SAVED_SETS_DEFAULT },
    resultsNumber: { setState: setResultsNumber, defaultValue: RESULTS_NUMBER_DEFAULT },
  };
}
