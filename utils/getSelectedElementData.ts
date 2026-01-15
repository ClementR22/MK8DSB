import { ElementData } from "@/types/mk8d/elements";
import { StatName, ElementStats, Stat } from "@/types";

export const getSelectedElementData = (
  categoryElementsSorted: ElementData[],
  selectedElementId: number,
  classesStats: {
    [key: number]: ElementStats;
  }
) => {
  const currentElement = categoryElementsSorted.find((element) => element.id === selectedElementId);

  if (!currentElement) {
    return { selectedElementName: "N/A", selectedElementStats: [] };
  }

  const stats: Stat[] = Object.entries(classesStats[currentElement.classId]).map(([name, value]) => ({
    name: name as StatName,
    value,
  }));

  return {
    selectedElementName: currentElement.name,
    selectedElementStats: stats,
  };
};
