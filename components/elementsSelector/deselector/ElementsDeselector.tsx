// components/elementsSelector/ElementsDeselector.tsx
import React, { memo, useCallback, useMemo } from "react";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { ElementItem } from "@/data/elements/elementsTypes";
import { elementsGroupedByClassId } from "@/data/elements/elementsData";
import BaseDeselector from "./BaseDeselector"; // Nouveau chemin d'importation

const ElementsDeselector: React.FC = () => {
  const multiSelectedClassIdsStore = usePressableElementsStore((state) => state.multiSelectedClassIds);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  const elementsToDisplay = useMemo(() => {
    let elementsToDisplayList = [];
    for (const key in multiSelectedClassIdsStore) {
      if (Object.prototype.hasOwnProperty.call(multiSelectedClassIdsStore, key)) {
        const classIdSet = multiSelectedClassIdsStore[key];
        classIdSet.forEach((classId: number) => {
          const elementsInThisClass = elementsGroupedByClassId.get(classId);
          if (Array.isArray(elementsInThisClass)) {
            elementsToDisplayList = elementsToDisplayList.concat(elementsInThisClass);
          } else {
            console.warn(`No array found for classId: ${classId} in elementsGroupedByClassId.`);
          }
        });
      }
    }
    return elementsToDisplayList;
  }, [multiSelectedClassIdsStore, elementsGroupedByClassId]);

  const handleDeselectElement = useCallback(
    (element: ElementItem) => {
      toggleMultiSelectElementsByClassId(element.category, element.classId);
    },
    [toggleMultiSelectElementsByClassId] // Removed elementsGroupedByClassId, multiSelectedClassIdsStore, selectElementsByClassId as they are not needed in this callback's deps
  );

  return (
    <BaseDeselector
      titleKey="SelectedElements"
      isEmpty={elementsToDisplay.length === 0}
      itemsToDisplay={elementsToDisplay}
      handleDeselect={handleDeselectElement}
    />
  );
};

export default memo(ElementsDeselector);
