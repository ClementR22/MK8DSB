import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { statNames } from "@/data/data";
import { toggleCheckList } from "@/utils/toggleCheck";

export const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  useEffect(() => {
    loadSettingFromMemory("isAllwaysSync", setIsAllwaysSync_);
    loadSettingFromMemory("isStatsVisibleDefault", setIsStatsVisibleDefault_);
    loadSettingFromMemory("isStatsVisibleListDefault", setIsStatsVisibleListDefault_);
  }, []);

  const loadSettingFromMemory = async (settingKey, setSetting_) => {
    const savedSetting = await AsyncStorage.getItem(settingKey);
    console.log("savedsetting", savedSetting);
    if (savedSetting) {
      let savedSettingParsed;
      if (savedSetting === "true" || savedSetting === "false") {
        // si savedSetting est un booleen
        savedSettingParsed = savedSetting === "true";
      } else {
        savedSettingParsed = JSON.parse(savedSetting);
      }
      setSetting_(savedSettingParsed);
    }
  };

  const saveSettingInMemory = async (settingKey, newIsAllwaysSync) => {
    try {
      await AsyncStorage.setItem(settingKey, JSON.stringify(newIsAllwaysSync));
    } catch (e) {
      console.error("Erreur lors de la sauvegarde de ", settingKey, e);
    }
  };

  // pour isAllwaysSync

  const [isAllwaysSync, setIsAllwaysSync_] = useState(false);

  const setIsAllwaysSync = async (newIsAllwaysSync) => {
    setIsAllwaysSync_(newIsAllwaysSync);
    await saveSettingInMemory("isAllwaysSync", newIsAllwaysSync);
  };

  // pour isStatsVisibleDefault

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

  const [isStatsVisibleDefault, setIsStatsVisibleDefault_] = useState(false);

  const setIsStatsVisibleDefault = async (newIsStatsVisibleDefault) => {
    setIsStatsVisibleDefault_(newIsStatsVisibleDefault);
    await saveSettingInMemory("isStatsVisibleDefault", newIsStatsVisibleDefault);
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
    saveSettingInMemory("isStatsVisibleListDefault", isStatsVisibleListDefault);
  }, [isStatsVisibleListDefault]);

  const toggleCheckListIsStatsVisibleListDefault = (name) => toggleCheckList(setIsStatsVisibleListDefault, name);

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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
