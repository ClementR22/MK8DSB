import { useLanguageStore } from "@/stores/useLanguageStore";
import { useStatsVisibleListConfigStore, statsVisibleListDefaultInit } from "@/stores/useStatsVisibleListConfigStore";
import { useThemeStore } from "@/stores/useThemeStore";

type SettingKey = "language" | "statsVisibleConfig" | "statsVisibleListDefault" | "theme";

type SettingsEntry = {
  setState: (value: any) => void;
  defaultValue: any;
};

export function useSettingsMap(): Record<SettingKey, SettingsEntry> {
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setStatsVisibleConfig = useStatsVisibleListConfigStore((state) => state.setStatsVisibleConfig);
  const setStatsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.setStatsVisibleListDefault);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    language: { setState: setLanguage, defaultValue: "en" },
    statsVisibleConfig: { setState: setStatsVisibleConfig, defaultValue: "sync" },
    statsVisibleListDefault: { setState: setStatsVisibleListDefault, defaultValue: statsVisibleListDefaultInit },
    theme: { setState: setTheme, defaultValue: "system" },
  };
}
