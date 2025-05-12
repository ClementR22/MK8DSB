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
    loadIsAllwaysSync();
    loadIsStatsVisibleDefault();
    loadIsStatsVisibleListDefault();
  }, []);

  // pour isAllwaysSync

  const [isAllwaysSync, setIsAllwaysSync_] = useState(false);

  const setIsAllwaysSync = async (newIsAllwaysSync) => {
    setIsAllwaysSync_(newIsAllwaysSync);
    await saveIsAllwaysSyncInMemory(newIsAllwaysSync);
  };

  const saveIsAllwaysSyncInMemory = async (newIsAllwaysSync) => {
    try {
      await AsyncStorage.setItem("isAllwaysSync", newIsAllwaysSync);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde de isAllwaysSync :", e);
    }
  };

  const loadIsAllwaysSync = async () => {
    const savedIsAllwaysSync = await AsyncStorage.getItem("isAllwaysSync");
    if (savedIsAllwaysSync) {
      setIsAllwaysSync_(savedIsAllwaysSync === "true");
    }
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
    await saveIsStatsVisibleDefaultInMemory(newIsStatsVisibleDefault);
  };

  const saveIsStatsVisibleDefaultInMemory = async (newIsStatsVisibleDefault) => {
    try {
      await AsyncStorage.setItem("isStatsVisibleDefault", newIsStatsVisibleDefault);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde de isStatsVisibleDefault :", e);
    }
  };

  const loadIsStatsVisibleDefault = async () => {
    const savedIsStatsVisibleDefault = await AsyncStorage.getItem("isStatsVisibleDefault");
    if (savedIsStatsVisibleDefault) {
      setIsStatsVisibleDefault_(savedIsStatsVisibleDefault === "true");
    }
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
    saveIsStatsVisibleListDefaultInMemory();
  }, [isStatsVisibleListDefault]);

  const saveIsStatsVisibleListDefaultInMemory = async () => {
    try {
      await AsyncStorage.setItem("isStatsVisibleListDefault", JSON.stringify(isStatsVisibleListDefault));
    } catch (e) {
      console.error("Erreur lors de la sauvegarde de isStatsVisibleListDefault :", e);
    }
  };

  const loadIsStatsVisibleListDefault = async () => {
    const savedIsStatsVisibleListDefault = await AsyncStorage.getItem("isStatsVisibleListDefault");
    const savedIsStatsVisibleListDefaultParsed = JSON.parse(savedIsStatsVisibleListDefault);
    if (savedIsStatsVisibleListDefaultParsed) {
      setIsStatsVisibleListDefault_(savedIsStatsVisibleListDefaultParsed);
    }
  };

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
