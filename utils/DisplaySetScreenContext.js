import React, { createContext, useContext, useMemo } from "react";

const DisplaySetScreenContext = createContext();

export const DisplaySetScreenProvider = ({ children }) => {
  const ok = 3;
  return (
    <DisplaySetScreenContext.Provider value={{ ok }}>
      {children}
    </DisplaySetScreenContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useDisplaySetScreen = () => {
  return useContext(DisplaySetScreenContext);
};
