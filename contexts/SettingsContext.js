import React, { createContext, useContext, useState } from "react";
import { statsVisibleListDefaultInit, useStatsVisibleListConfig } from "../contexts/StatsVisibleListConfigContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";

// Création du contexte
const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

// Fournisseur de contexte
export const SettingsProvider = ({ children }) => {
  const { setStatsVisibleConfig, setStatsVisibleListDefault } = useStatsVisibleListConfig();
  const { setLanguage } = useLanguage();
  const { setTheme } = useTheme();

  const settingsByDefaultKeysAndValues = {
    language: { setState: setLanguage, value: "en" },
    statsVisibleConfig: { setState: setStatsVisibleConfig, value: "no" },
    statsVisibleListDefault: {
      setState: setStatsVisibleListDefault,
      value: statsVisibleListDefaultInit,
    },
    theme: { setState: setTheme, value: "light" },
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
