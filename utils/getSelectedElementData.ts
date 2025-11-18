import { ElementData } from "@/types/mk8d/elements";
import { Category, StatName } from "@/types";

export const getSelectedElementData = (
  categoryElementsSorted: ElementData[],
  selectedElementId: number,
  selectedCategory: Category,
  classesStatsByCategory: Map<number, number[]>,
  statNames: StatName[]
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
