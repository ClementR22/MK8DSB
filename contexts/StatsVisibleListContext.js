import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useScreen } from "./ScreenContext";
import { toggleCheckList } from "@/utils/toggleCheck";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import useSetsStore from "@/stores/useSetsStore";
import { statsVisibleListInit } from "@/config/statsVisibleListInit";

const StatsVisibleListContext = createContext();

export const StatsVisibleListProvider = ({ children }) => {
  const statsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.statsVisibleListDefault);
  const [statsVisibleList, setStatsVisibleList] = useState(statsVisibleListInit);

  useEffect(() => {
    setStatsVisibleList(statsVisibleListDefault);
  }, [statsVisibleListDefault]);

  const toggleCheckListStatsVisibleList = (name) => toggleCheckList(setStatsVisibleList, name);

  return (
    <StatsVisibleListContext.Provider
      value={{
        statsVisibleList,
        setStatsVisibleList,
        toggleCheckListStatsVisibleList,
      }}
    >
      {children}
    </StatsVisibleListContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useStatsVisibleList = () => {
  return useContext(StatsVisibleListContext);
};
