import { usePathname } from "expo-router";
import React, { createContext, useContext, useMemo } from "react";

import { Dimensions } from "react-native";

const ScreenSituationContext = createContext();

export const ScreenSituationProvider = ({ children }) => {
  const { width: screenWidth } = Dimensions.get("window");
  const imageWidth = Math.min(screenWidth / 5, 120);

  const pathName = usePathname();
  const screenSituation = useMemo(
    () =>
      pathName === "/SearchSetScreen"
        ? "search"
        : pathName === "/DisplaySetScreen"
        ? "display"
        : pathName === "/SavedSetScreen"
        ? "save"
        : "other",
    [pathName]
  );

  return (
    <ScreenSituationContext.Provider
      value={{
        screenSituation,
        imageWidth,
      }}
    >
      {children}
    </ScreenSituationContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useScreenSituation = () => {
  return useContext(ScreenSituationContext);
};
