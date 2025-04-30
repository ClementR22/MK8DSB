import React, { createContext, useContext, useState } from "react";
import { statNames } from "../data/data";

const SavedSetScreenContext = createContext();

export const SavedSetScreenProvider = ({ children }) => {
  const [isStatsVisible, setIsStatsVisible] = useState(
    statNames.map((statName) => ({
      name: statName,
      checked: true,
    }))
  );

  return (
    <SavedSetScreenContext.Provider
      value={{ isStatsVisible, setIsStatsVisible }}
    >
      {children}
    </SavedSetScreenContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useSavedSetScreen = () => {
  return useContext(SavedSetScreenContext);
};
