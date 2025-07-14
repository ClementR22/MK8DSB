import { useMemo } from "react";
import { Category, ElementData } from "@/data/elements/elementsTypes";
import { classesStatsByCategory } from "@/data/elements/elementsStats";
import { statNames, statNamesCompact } from "@/data/stats/statsData";
import { translateToLanguage } from "@/translations/translations";

export const useSelectedElementData = (
  categoryElementsSorted: ElementData[],
  selectedElementId: number,
  selectedCategory: Category,
  language: string
) => {
  return useMemo(() => {
    const currentElement = categoryElementsSorted.find((element) => element.id === selectedElementId);

    if (!currentElement) {
      return { selectedElementName: "N/A", selectedElementStats: [] };
    }

    const statsArray = classesStatsByCategory[selectedCategory].get(currentElement.classId);
    const stats = statsArray
      ? statNames.map((statName, index) => ({
          name: statNamesCompact[statName],
          value: statsArray[index],
        }))
      : [];

    return {
      selectedElementName: translateToLanguage(currentElement.name, language),
      selectedElementStats: stats,
    };
  }, [categoryElementsSorted, selectedElementId, selectedCategory, language]);
};
