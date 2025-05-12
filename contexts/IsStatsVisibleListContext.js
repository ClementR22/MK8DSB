import React, { createContext, useContext, useState } from "react";
import { statNames } from "@/data/data";
import { useSetsList } from "./SetsListContext";
import { useScreen } from "./ScreenContext";
import { toggleCheckList } from "@/utils/toggleCheck";
import { useSettings } from "./SettingsContext";

const IsStatsVisibleListContext = createContext();

export const IsStatsVisibleListProvider = ({ children }) => {
  const { isStatsVisibleDefault, isStatsVisibleListDefault } = useSettings();

  const [isStatsVisibleList_, setIsStatsVisibleList] = useState(
    statNames.map((statName) => ({
      name: statName,
      checked: false,
    }))
  );

  const isStatsVisibleList = isStatsVisibleDefault ? isStatsVisibleListDefault : isStatsVisibleList_;

  const { screenName } = useScreen();
  const { chosenStats } = useSetsList();
  const chosenStatsInScreen = screenName === "search" ? chosenStats : Array(12).fill(null);

  const toggleCheckListIsStatsVisibleList = (name) => toggleCheckList(setIsStatsVisibleList, name);

  return (
    <IsStatsVisibleListContext.Provider
      value={{ isStatsVisibleList, setIsStatsVisibleList, chosenStatsInScreen, toggleCheckListIsStatsVisibleList }}
    >
      {children}
    </IsStatsVisibleListContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useIsStatsVisibleList = () => {
  return useContext(IsStatsVisibleListContext);
};
