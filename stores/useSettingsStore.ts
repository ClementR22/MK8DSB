import { create } from "zustand";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useStatsVisibleListConfigStore, statsVisibleListDefaultInit } from "@/stores/useStatsVisibleListConfigStore";
import { useThemeStore } from "@/stores/useThemeStore";

type SettingKey = "language" | "statsVisibleConfig" | "statsVisibleListDefault" | "theme";

type SettingsEntry = {
  setState: (value: any) => void;
  value: any;
};

export const useSettingsStore = create(() => {
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setStatsVisibleConfig = useStatsVisibleListConfigStore((state) => state.setStatsVisibleConfig);
  const setStatsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.setStatsVisibleListDefault);
  const setTheme = useThemeStore((state) => state.setTheme);

  const settingsByDefaultKeysAndValues: Record<SettingKey, SettingsEntry> = {
    language: { setState: setLanguage, value: "en" },
    statsVisibleConfig: { setState: setStatsVisibleConfig, value: "sync" },
    statsVisibleListDefault: {
      setState: setStatsVisibleListDefault,
      value: statsVisibleListDefaultInit,
    },
    theme: { setState: setTheme, value: "system" },
  };

  const loadSettings = () => {
    Object.entries(settingsByDefaultKeysAndValues).forEach(([key, { setState }]) => {
      loadThingFromMemory(key, setState);
    });
  };

  const resetSettings = () => {
    Object.values(settingsByDefaultKeysAndValues).forEach(({ setState, value }) => {
      setState(value);
    });
  };

  return { loadSettings, resetSettings };
});
