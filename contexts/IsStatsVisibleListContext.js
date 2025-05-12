import React, { createContext, useContext, useState } from "react";
import { statNames } from "@/data/data";
import { useSetsList } from "./SetsListContext";
import { useScreen } from "./ScreenContext";

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

  const { screenName } = useScreen();
  const { chosenStats } = useSetsList();
  const chosenStatsInScreen = screenName === "search" ? chosenStats : Array(12).fill(null);

  return (
    <IsStatsVisibleListContext.Provider value={{ isStatsVisibleList, setIsStatsVisibleList, chosenStatsInScreen }}>
      {children}
    </IsStatsVisibleListContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useIsStatsVisibleList = () => {
  return useContext(IsStatsVisibleListContext);
};
