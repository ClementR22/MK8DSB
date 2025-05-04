import React, { createContext, useContext, useState } from "react";
import { statNames } from "@/data/data";

const SearchSetScreenContext = createContext();

export const SearchSetScreenProvider = ({ children }) => {
  const [isStatsVisible, setIsStatsVisible] = useState(
    statNames.map((statName, index) => ({
      name: statName,
      checked: index === 0,
    }))
  );

  return (
    <SearchSetScreenContext.Provider
      value={{ isStatsVisible, setIsStatsVisible }}
    >
      {children}
    </SearchSetScreenContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useSearchSetScreen = () => {
  return useContext(SearchSetScreenContext);
};
