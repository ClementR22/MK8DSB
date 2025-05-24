import React, { createContext, useContext, ReactNode } from "react";

// 👉 Le contexte stocke simplement un `string` ou `undefined`
const ScreenContext = createContext<ScreenName | undefined>(undefined);

export type ScreenName = "search" | "display" | "save" | "gallery";

// Typage des props pour le Provider
interface ScreenProviderProps {
  screenName: ScreenName;
  children: ReactNode;
}

// 👉 Le Provider passe directement la `string`, pas un objet
export const ScreenProvider = ({ screenName, children }: ScreenProviderProps) => {
  return <ScreenContext.Provider value={screenName}>{children}</ScreenContext.Provider>;
};

// 👉 Hook pour lire le contexte (retourne `string | undefined`)
export const useScreen = () => {
  return useContext(ScreenContext);
};
