import { usePathname } from "expo-router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { setAllInfos, statNames } from "../data/data";
import { Dimensions } from "react-native";

const OrderNumberContext = createContext();

export const OrderNumberProvider = ({ children }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const imageWidth = Math.min(screenWidth / 5, 120);

  const [orderNumber, setOrderNumber] = useState(0);

  const pathName = usePathname();
  const screenSituation = useMemo(
    () => (pathName === "/SearchSetScreen" ? "search" : "display"),
    [pathName]
  );

  const [chosenStats, setChosenStats] = useState(
    statNames.map((statName, index) => {
      return {
        name: statName,
        checked: index === 0,
        value: index === 0 ? 0 : null,
        statFilterNumber: 0,
        setStatFilterNumber: (newState) => {
          setChosenStats((prevStats) =>
            prevStats.map((stat) =>
              stat.name === statName
                ? { ...stat, statFilterNumber: newState }
                : stat
            )
          );
        },
      };
    })
  );

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false; // Si les longueurs sont différentes, ils ne sont pas égaux
    return a.every((value, index) => value === b[index]); // Comparer chaque élément
  };

  const searchSetStatsFromElementsIds = (pressedImagesClassIds) => {
    const result = setAllInfos.find(({ classIds }) => {
      return arraysEqual(classIds, pressedImagesClassIds);
    });

    return result ? result.stats : [];
  };

  return (
    <OrderNumberContext.Provider
      value={{
        orderNumber,
        setOrderNumber,
        screenSituation,
        chosenStats,
        setChosenStats,
        searchSetStatsFromElementsIds,
        imageWidth,
      }}
    >
      {children}
    </OrderNumberContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useOrderNumber = () => {
  return useContext(OrderNumberContext);
};
