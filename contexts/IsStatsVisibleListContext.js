import React, { createContext, useContext, useState } from "react";
import { statNames } from "@/data/data";

const IsStatsVisibleListContext = createContext();

export const IsStatsVisibleListProvider = ({ children }) => {
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

  const [isStatsVisibleList, setIsStatsVisibleList] = useState(
    statNames.map((statName) => ({
      name: statName,
      checked: isStatsVisibleListConfig[statName],
    }))
  );

  return (
    <IsStatsVisibleListContext.Provider value={{ isStatsVisibleList, setIsStatsVisibleList }}>
      {children}
    </IsStatsVisibleListContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useIsStatsVisibleList = () => {
  return useContext(IsStatsVisibleListContext);
};
