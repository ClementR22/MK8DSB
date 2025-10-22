import { Category, ElementData } from "@/data/elements/elementsTypes";
import { classesStatsByCategory } from "@/data/elements/elementsStats";
import { statNames } from "@/data/stats/statsData";

export const getSelectedElementData = (
  categoryElementsSorted: ElementData[],
  selectedElementId: number,
  selectedCategory: Category
) => {
  const currentElement = categoryElementsSorted.find((element) => element.id === selectedElementId);

  if (!currentElement) {
    return { selectedElementName: "N/A", selectedElementStats: [] };
  }

  const statsArray = classesStatsByCategory[selectedCategory].get(currentElement.classId);
  const stats = statsArray
    ? statNames.map((statName, index) => ({
        name: statName,
        value: statsArray[index],
      }))
    : [];

  return {
    selectedElementName: currentElement.name,
    selectedElementStats: stats,
  };
};
