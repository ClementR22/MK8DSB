import { translateToLanguage } from "@/translations/translations";
import { useMemo } from "react";

export const useSortedElements = (elementsByCategory, selectedTab, orderNumber, language) => {
  return useMemo(() => {
    if (orderNumber == 3) {
      return null;
    }
    const elements = Object.values(elementsByCategory[selectedTab] || {}).flat();
    const sortingStrategies = {
      0: (a, b) => a.id - b.id,
      1: (a, b) => translateToLanguage(a.name, language).localeCompare(translateToLanguage(b.name, language)),
      2: (a, b) => translateToLanguage(b.name, language).localeCompare(translateToLanguage(a.name, language)),
    };
    return [...elements].sort(sortingStrategies[orderNumber]);
  }, [elementsByCategory, selectedTab, orderNumber, language]);
};
