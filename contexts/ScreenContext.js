import React, { createContext, useContext } from "react";

const ScreenContext = createContext();

export const ScreenProvider = ({ screenName, children }) => {
  return <ScreenContext.Provider value={{ screenName }}>{children}</ScreenContext.Provider>;
};

// Hook pour utiliser le contexte
export const useScreen = () => {
  return useContext(ScreenContext);
};
