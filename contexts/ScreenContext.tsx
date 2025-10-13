import React, { createContext, useContext, ReactNode } from "react";

export type ScreenName = "search" | "display" | "save" | "gallery" | "settings";

const ScreenContext = createContext<ScreenName | undefined>(undefined);

interface ScreenProviderProps {
  screenName: ScreenName;
  children: ReactNode;
}

export const ScreenProvider: React.FC<ScreenProviderProps> = ({ screenName, children }) => {
  return <ScreenContext.Provider value={screenName}>{children}</ScreenContext.Provider>;
};

export const useScreen = (): ScreenName => {
  const context = useContext(ScreenContext);
  return context;
};
