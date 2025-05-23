import React, { createContext, useContext } from "react";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useStatsVisibleListConfigStore, statsVisibleListDefaultInit } from "@/stores/useStatsVisibleListConfigStore";
import { useThemeStore } from "@/stores/useThemeStore";

// Création du contexte
const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

// Fournisseur de contexte
export const SettingsProvider = ({ children }) => {
  const setStatsVisibleConfig = useStatsVisibleListConfigStore((state) => state.setStatsVisibleConfig);
  const setStatsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.setStatsVisibleListDefault);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const setTheme = useThemeStore((state) => state.setTheme);

  const settingsByDefaultKeysAndValues = {
    language: { setState: setLanguage, value: "en" },
    statsVisibleConfig: { setState: setStatsVisibleConfig, value: "no" },
    statsVisibleListDefault: {
      setState: setStatsVisibleListDefault,
      value: statsVisibleListDefaultInit,
    },
    theme: { setState: setTheme, value: "system" },
  };

  const loadSettings = () => {
    Object.entries(settingsByDefaultKeysAndValues).map(([settingKey, { setState }]) => {
      loadThingFromMemory(settingKey, setState);
    });
  };

  const resetSettings = async () => {
    Object.values(settingsByDefaultKeysAndValues).forEach(({ setState, value }) => {
      setState(value);
    });
  };

  return <SettingsContext.Provider value={{ loadSettings, resetSettings }}>{children}</SettingsContext.Provider>;
};
