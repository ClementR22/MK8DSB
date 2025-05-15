import React, { createContext, useContext, useState } from "react";
import { statNames } from "@/data/data";
import { useSetsList } from "./SetsListContext";
import { useScreen } from "./ScreenContext";
import { toggleCheckList } from "@/utils/toggleCheck";
import { useStatsVisibleListConfig } from "./StatsVisibleListConfigContext";

const StatsVisibleListContext = createContext();

export const StatsVisibleListProvider = ({ children }) => {
  const { isDefault, statsVisibleListDefault } = useStatsVisibleListConfig();

  const [statsVisibleList_, setStatsVisibleList] = useState(
    statNames.map((statName) => ({
      name: statName,
      checked: false,
    }))
  );

  const statsVisibleList = isDefault ? statsVisibleListDefault : statsVisibleList_;

  const { screenName } = useScreen();
  const { chosenStats } = useSetsList();
  const chosenStatsInScreen = screenName === "search" ? chosenStats : Array(12).fill(null);

  const toggleCheckListStatsVisibleList = (name) => toggleCheckList(setStatsVisibleList, name);

  return (
    <StatsVisibleListContext.Provider
      value={{ statsVisibleList, setStatsVisibleList, chosenStatsInScreen, toggleCheckListStatsVisibleList }}
    >
      {children}
    </StatsVisibleListContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useStatsVisibleList = () => {
  return useContext(StatsVisibleListContext);
};
