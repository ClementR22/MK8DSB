import { useLanguageStore } from "@/stores/useLanguageStore";
import { useResultStatsConfigStore } from "@/stores/useResultStatsDefaultStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { resultStatsInit } from "./resultStatsInit";

type SettingKey = "language" | "isResultStatsSync" | "resultStatsDefault" | "theme";

type SettingsEntry = {
  setState: (value: any) => void;
  defaultValue: any;
};

export function useSettingsMap(): Record<SettingKey, SettingsEntry> {
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setIsResultStatsSync = useResultStatsConfigStore((state) => state.setIsResultStatsSync);
  const setResultStatsDefault = useResultStatsConfigStore((state) => state.setResultStatsDefault);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    language: { setState: setLanguage, defaultValue: "en" },
    isResultStatsSync: { setState: setIsResultStatsSync, defaultValue: true },
    resultStatsDefault: { setState: setResultStatsDefault, defaultValue: resultStatsInit },
    theme: { setState: setTheme, defaultValue: "system" },
  };
}
