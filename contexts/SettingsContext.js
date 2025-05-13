import React, { createContext, useContext, useEffect, useState } from "react";
import { statNames } from "@/data/data";
import { toggleCheckList } from "@/utils/toggleCheck";
import { loadThingFromMemory, saveThingInMemory } from "@/utils/asyncStorageOperations";

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  useEffect(() => {
    loadThingFromMemory("isAllwaysSync", setIsAllwaysSync_);
    loadThingFromMemory("isStatsVisibleDefault", setIsStatsVisibleDefault_);
    loadThingFromMemory("isStatsVisibleListDefault", setIsStatsVisibleListDefault_);
  }, []);

  // pour isAllwaysSync

  const [isAllwaysSync, setIsAllwaysSync_] = useState(false);

  const setIsAllwaysSync = async (newIsAllwaysSync) => {
    setIsAllwaysSync_(newIsAllwaysSync);
    await saveThingInMemory("isAllwaysSync", newIsAllwaysSync);
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
    // saveThingInMemory("isStatsVisibleListDefault", isStatsVisibleListDefault);
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
