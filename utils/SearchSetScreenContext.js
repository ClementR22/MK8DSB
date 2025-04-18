import React, { createContext, useContext, useMemo } from "react";

const SearchSetScreenContext = createContext();

export const SearchSetScreenProvider = ({ children }) => {
  const ok = 3;
  return (
    <SearchSetScreenContext.Provider value={{ ok }}>
      {children}
    </SearchSetScreenContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useSearchSetScreen = () => {
  return useContext(SearchSetScreenContext);
};
