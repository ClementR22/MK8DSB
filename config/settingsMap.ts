import { useLanguageStore } from "@/stores/useLanguageStore";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { statsVisibleListInit } from "./statsVisibleListInit";

type SettingKey = "language" | "isStatsVisibleSync" | "statsVisibleListDefault" | "theme";

type SettingsEntry = {
  setState: (value: any) => void;
  defaultValue: any;
};

export function useSettingsMap(): Record<SettingKey, SettingsEntry> {
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setIsStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.setIsStatsVisibleSync);
  const setStatsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.setStatsVisibleListDefault);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    language: { setState: setLanguage, defaultValue: "en" },
    isStatsVisibleSync: { setState: setIsStatsVisibleSync, defaultValue: true },
    statsVisibleListDefault: { setState: setStatsVisibleListDefault, defaultValue: statsVisibleListInit },
    theme: { setState: setTheme, defaultValue: "system" },
  };
}
