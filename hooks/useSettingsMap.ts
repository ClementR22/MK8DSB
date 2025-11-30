import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import useThemeStore from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import {
  LANGUAGE_DEFAULT,
  THEME_DEFAULT,
  IS_RESULT_STATS_SYNC_DEFAULT,
  SORT_NUMBER_SAVED_BUILDS_DEFAULT,
  RESULTS_NUMBER_DEFAULT,
  GAME_DEFAULT,
} from "@/config/config";
import useBuildsPersistenceStore from "@/stores/useBuildsPersistenceStore";
import useGameStore from "@/stores/useGameStore";
import useLanguageStore from "@/stores/useLanguageStore";
import { resultStatsDefaultInit as resultStatsDefaultInitMK8D } from "@/data/mk8d";
import { resultStatsDefaultInit as resultStatsDefaultInitMKW } from "@/data/mkw";

type SettingKey =
  | "language"
  | "theme"
  | "game"
  | "isResultStatsSync"
  | "resultStatsDefault"
  | "sortNumberSavedBuilds"
  | "resultsNumber";

type SettingsEntry = {
  setState: (value: any) => void;
  defaultValue: any;
};

export function useSettingsMap(): Record<SettingKey, SettingsEntry> {
  const setTheme = useThemeStore((state) => state.setTheme);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setIsResultStatsSync = useResultStatsDefaultStore((state) => state.setIsResultStatsSync);
  const initResultStatsDefault = useResultStatsDefaultStore((state) => state.initResultStatsDefault);
  const setSortNumberSavedBuilds = useBuildsPersistenceStore((state) => state.setSortNumberSavedBuilds);
  const setResultsNumber = useGeneralStore((state) => state.setResultsNumber);
  const setGame = useGameStore((state) => state.setGame);

  return {
    language: { setState: setLanguage, defaultValue: LANGUAGE_DEFAULT },
    theme: { setState: setTheme, defaultValue: THEME_DEFAULT },
    game: { setState: setGame, defaultValue: GAME_DEFAULT },
    isResultStatsSync: { setState: setIsResultStatsSync, defaultValue: IS_RESULT_STATS_SYNC_DEFAULT },
    resultStatsDefault: {
      setState: initResultStatsDefault,
      defaultValue: {
        MK8D: resultStatsDefaultInitMK8D,
        MKW: resultStatsDefaultInitMKW,
      },
    },
    sortNumberSavedBuilds: { setState: setSortNumberSavedBuilds, defaultValue: SORT_NUMBER_SAVED_BUILDS_DEFAULT },
    resultsNumber: { setState: setResultsNumber, defaultValue: RESULTS_NUMBER_DEFAULT },
  };
}
