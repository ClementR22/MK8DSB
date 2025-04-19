import React, { createContext, useContext, useMemo, useState } from "react";
import { statNames } from "../data/data";

const SavedSetScreenContext = createContext();

export const SavedSetScreenProvider = ({ children }) => {
  const [isFoundStatsVisible, setIsFoundStatsVisible] = useState(
    statNames.map((statName, index) => ({
      name: statName,
      checked: index === 0,
    }))
  );

  return (
    <SavedSetScreenContext.Provider
      value={{ isFoundStatsVisible, setIsFoundStatsVisible }}
    >
      {children}
    </SavedSetScreenContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useSavedSetScreen = () => {
  return useContext(SavedSetScreenContext);
};
