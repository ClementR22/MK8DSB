import { Category, ElementData } from "@/data/elements/elementsTypes";
import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native"; // Removed Dimensions
import { useElementPickerStyle } from "@/hooks/useElementPickerStyle";
import ElementPickerCompact from "../ElementPickerCompact";
import { MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER, PADDING_PAGINATED_WRAPPER_CONTAINER } from "@/utils/designTokens";

interface ElementsGridProps {
  elements: ElementData[];
  selectedClassId: Set<number> | number | null;
  onSelectElement: (category: Category, classId: number) => void;
}

const GAP = 5;
const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;
export const ELEMENTS_PER_PAGE = 12;

const MARGIN_ELEMENTS_GRID = GAP;
export const ELEMENTS_GRID_WIDTH =
  screenWidth * 0.9 - MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER * 2 - MARGIN_ELEMENTS_GRID * 2;

const ITEM_WIDTH = (ELEMENTS_GRID_WIDTH - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

const ElementsGrid: React.FC<ElementsGridProps> = ({ elements, selectedClassId, onSelectElement }) => {
  const calculateIsSelected = useCallback(
    (classId: number) => {
      if (selectedClassId instanceof Set) {
        return selectedClassId.has(classId);
      } else if (typeof selectedClassId === "number") {
        return selectedClassId === classId;
      }
      return false;
    },
    [selectedClassId]
  );

  const fillingElements = Array.from({ length: ELEMENTS_PER_PAGE - elements.length });

  const { elementPickerDynamicStyle, activeBorderStyle } = useElementPickerStyle({ size: ITEM_WIDTH }); // Passe la taille commune ici
  const fillingElementDimensions = useMemo(() => ({ width: ITEM_WIDTH, height: ITEM_WIDTH * 1.1 }), [ITEM_WIDTH]);

  return (
    <Pressable style={styles.container}>
      {/* pour capturer le scroll */}
      {elements.map((element) => (
        <ElementPickerCompact
          key={element.id}
          imageUrl={element.imageUrl}
          name={element.name}
          isSelected={calculateIsSelected(element.classId)}
          onPress={() => onSelectElement(element.category, element.classId)}
          elementPickerDynamicStyle={elementPickerDynamicStyle}
          activeBorderStyle={activeBorderStyle}
        />
      ))}
      {fillingElements.map((_, i) => (
        <View key={`empty${i}`} style={fillingElementDimensions} />
      ))}
    </Pressable>
  );
};

// --- StyleSheet definitions ---
const styles = StyleSheet.create({
  container: {
    width: ELEMENTS_GRID_WIDTH,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP, // Keep gap defined here
    marginHorizontal: MARGIN_ELEMENTS_GRID,
  },
});

export default memo(ElementsGrid);
