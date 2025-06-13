import { useLanguageStore } from "@/stores/useLanguageStore";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { resultStatsInit } from "./resultStatsInit";

type SettingKey = "language" | "isResultStatsSync" | "resultStatsDefault" | "theme";

type SettingsEntry = {
  setState: (value: any) => void;
  defaultValue: any;
};

export function useSettingsMap(): Record<SettingKey, SettingsEntry> {
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setIsResultStatsSync = useResultStatsDefaultStore((state) => state.setIsResultStatsSync);
  const setResultStatsDefault = useResultStatsDefaultStore((state) => state.setResultStatsDefault);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    language: { setState: setLanguage, defaultValue: "en" },
    isResultStatsSync: { setState: setIsResultStatsSync, defaultValue: true },
    resultStatsDefault: { setState: setResultStatsDefault, defaultValue: resultStatsInit },
    theme: { setState: setTheme, defaultValue: "system" },
  };
}
