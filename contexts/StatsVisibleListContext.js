import React, { createContext, useContext, useEffect, useState } from "react";
import { useScreen } from "./ScreenContext";
import { toggleCheckList } from "@/utils/toggleCheck";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import useSetsStore from "@/stores/useSetsStore";
import { statsVisibleListInit } from "@/config/statsVisibleListInit";

const StatsVisibleListContext = createContext();

export const StatsVisibleListProvider = ({ children }) => {
  const isStatsVisibleDefault = useStatsVisibleListConfigStore((state) => state.isStatsVisibleDefault);
  const statsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.statsVisibleListDefault);
  const [statsVisibleList, setStatsVisibleList] = useState(statsVisibleListInit);

  useEffect(() => {
    if (isStatsVisibleDefault) setStatsVisibleList(statsVisibleListDefault);
  }, [isStatsVisibleDefault, statsVisibleListDefault]);

  const screenName = useScreen();
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
