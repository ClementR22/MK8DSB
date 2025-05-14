import React, { createContext, useContext, useEffect, useState } from "react";
import { statNames } from "@/data/data";
import { toggleCheckList } from "@/utils/toggleCheck";
import { loadThingFromMemory, saveThingInMemory } from "@/utils/asyncStorageOperations";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

const isStatsVisibleListConfig = {
  speedGround: true,
  speedAntiGravity: false,
  speedWater: false,
  speedAir: false,
  acceleration: false,
  weight: false,
  handlingGround: false,
  handlingAntiGravity: false,
  handlingWater: false,
  handlingAir: false,
  traction: false,
  miniTurbo: false,
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { setLanguage_ } = useLanguage();
  const { setTheme } = useTheme();

  useEffect(() => {
    loadSettings();
  }, []);

  // pour isAllwaysSync

  const [isAllwaysSync, setIsAllwaysSync_] = useState(false);

  const setIsAllwaysSync = async (newIsAllwaysSync) => {
    setIsAllwaysSync_(newIsAllwaysSync);
    await saveThingInMemory("isAllwaysSync", newIsAllwaysSync);
  };

  // pour isStatsVisibleDefault

  const [isStatsVisibleDefault, setIsStatsVisibleDefault_] = useState(false);

  const setIsStatsVisibleDefault = async (newIsStatsVisibleDefault) => {
    setIsStatsVisibleDefault_(newIsStatsVisibleDefault);
    await saveThingInMemory("isStatsVisibleDefault", newIsStatsVisibleDefault);
  };

  // pour isStatsVisibleListDefault

  const [isStatsVisibleListDefault, setIsStatsVisibleListDefault_] = useState(
    statNames.map((statName) => ({
      name: statName,
      checked: isStatsVisibleListConfig[statName],
    }))
  );

  const setIsStatsVisibleListDefault = async (newIsStatsVisibleListDefault) => {
    setIsStatsVisibleListDefault_(newIsStatsVisibleListDefault);
  };

  useEffect(() => {
    saveThingInMemory("isStatsVisibleListDefault", isStatsVisibleListDefault);
  }, [isStatsVisibleListDefault]);

  const toggleCheckListIsStatsVisibleListDefault = (name) => toggleCheckList(setIsStatsVisibleListDefault, name);

  // pour gerer les settings enregistrés

  const settingsByDefaultKeysAndValues = {
    language: { setState: setLanguage_, value: "en" },
    isAllwaysSync: { setState: setIsAllwaysSync_, value: false },
    isStatsVisibleDefault: { setState: setIsStatsVisibleDefault_, value: false },
    isStatsVisibleListDefault: {
      setState: setIsStatsVisibleListDefault_,
      value: statNames.map((statName) => ({
        name: statName,
        checked: isStatsVisibleListConfig[statName],
      })),
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

  return (
    <SettingsContext.Provider
      value={{
        isAllwaysSync,
        setIsAllwaysSync,
        isStatsVisibleDefault,
        setIsStatsVisibleDefault,
        isStatsVisibleListDefault,
        setIsStatsVisibleListDefault,
        toggleCheckListIsStatsVisibleListDefault,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
