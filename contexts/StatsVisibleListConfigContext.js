import React, { createContext, useContext, useEffect, useState } from "react";
import { statNames } from "@/data/data";
import { toggleCheckList } from "@/utils/toggleCheck";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

export const statsVisibleConfigList = [
  { label: "DontConfigure", value: "no" },
  { label: "Configure", value: "yes" },
  { label: "SyncWithChosenStats", value: "sync" },
];

const statsVisibleListConfig = {
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

export const statsVisibleListDefaultInit = statNames.map((statName) => ({
  name: statName,
  checked: statsVisibleListConfig[statName],
}));

const StatsVisibleListConfigContext = createContext();

export const StatsVisibleListConfigProvider = ({ children }) => {
  // statsVisibleConfig

  const [statsVisibleConfig, setStatsVisibleConfig_] = useState("no");
  const setStatsVisibleConfig = async (newSetStatsVisibleConfig) => {
    setStatsVisibleConfig_(newSetStatsVisibleConfig);
    await saveThingInMemory("statsVisibleConfig", newSetStatsVisibleConfig);
  };
  const isDefault = statsVisibleConfig === "yes";
  const isSync = statsVisibleConfig === "sync";

  // statsVisibleListDefault

  const [statsVisibleListDefault, setStatsVisibleListDefault] = useState(statsVisibleListDefaultInit);

  useEffect(() => {
    saveThingInMemory("statsVisibleListDefault", statsVisibleListDefault);
  }, [statsVisibleListDefault]);

  const toggleCheckListStatsVisibleListDefault = (name) => toggleCheckList(setStatsVisibleListDefault, name);

  return (
    <StatsVisibleListConfigContext.Provider
      value={{
        isDefault,
        isSync,
        statsVisibleConfig,
        setStatsVisibleConfig,
        setStatsVisibleConfig_,
        statsVisibleListDefault,
        setStatsVisibleListDefault,
        toggleCheckListStatsVisibleListDefault,
      }}
    >
      {children}
    </StatsVisibleListConfigContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useStatsVisibleListConfig = () => {
  return useContext(StatsVisibleListConfigContext);
};
