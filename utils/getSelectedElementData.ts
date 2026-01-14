import { ElementData } from "@/types/mk8d/elements";
import { StatName, ElementStats } from "@/types";

export const getSelectedElementData = (
  categoryElementsSorted: ElementData[],
  selectedElementId: number,
  classesStats: {
    [key: number]: ElementStats;
  },
  statNames: StatName[]
) => {
  const currentElement = categoryElementsSorted.find((element) => element.id === selectedElementId);

  if (!currentElement) {
    return { selectedElementName: "N/A", selectedElementStats: [] };
  }

  const statsArray = classesStats[currentElement.classId];
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
