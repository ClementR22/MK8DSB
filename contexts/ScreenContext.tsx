import React, { createContext, useContext, ReactNode } from "react";

const ScreenContext = createContext<ScreenName | undefined>(undefined);

export type ScreenName = "search" | "display" | "save";

interface ScreenProviderProps {
  screenName: ScreenName;
  children: ReactNode;
}

export const ScreenProvider = ({ screenName, children }: ScreenProviderProps) => {
  return <ScreenContext.Provider value={screenName}>{children}</ScreenContext.Provider>;
};

export const useScreen = () => {
  return useContext(ScreenContext);
};
