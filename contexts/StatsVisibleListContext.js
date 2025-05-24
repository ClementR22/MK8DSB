import React, { createContext, useContext, useState } from "react";
import { useScreen } from "./ScreenContext";
import { toggleCheckList } from "@/utils/toggleCheck";
import { statsVisibleListDefaultInit, useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import useSetsStore from "@/stores/useSetsStore";

const StatsVisibleListContext = createContext();

export const StatsVisibleListProvider = ({ children }) => {
  const statsVisibleConfig = useStatsVisibleListConfigStore((state) => state.statsVisibleConfig);
  const isDefault = statsVisibleConfig === "yes";
  const statsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.statsVisibleListDefault);
  const [statsVisibleList_, setStatsVisibleList] = useState(statsVisibleListDefaultInit);
  const statsVisibleList = isDefault ? statsVisibleListDefault : statsVisibleList_;
  const { screenName } = useScreen();
  const chosenStats = useSetsStore((state) => state.chosenStats);
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
