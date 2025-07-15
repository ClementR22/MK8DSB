import { Category, ElementData } from "@/data/elements/elementsTypes";
import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native"; // Removed Dimensions
import { MODAL_CHILDREN_CONTAINER_MARGIN_HORIZONTAL } from "@/primitiveComponents/Modal";
import { useElementPickerStyle } from "@/hooks/useElementPickerStyle";
import ElementPickerCompact from "../ElementPickerCompact";
import { ELEMENTS_PER_PAGE } from "../PaginatedElementsContainer";

interface ElementsGridProps {
  elements: ElementData[];
  selectedClassId: Set<number> | number | null;
  onSelectElement: (category: Category, classId: number) => void;
}

export const PAGINATED_ELEMENTS_CONTAINER_PADDING = 6;
const GAP = 5;
const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;

const ELEMENTS_GRID_WIDTH =
  screenWidth * 0.9 - MODAL_CHILDREN_CONTAINER_MARGIN_HORIZONTAL * 2 - PAGINATED_ELEMENTS_CONTAINER_PADDING * 2;

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
    // Removed Pressable from here, as it's typically for the entire grid to be clickable,
    // but individual items are clickable. If ElementsGrid itself needs to be a Pressable,
    // its purpose should be clear. For a grid of items, a simple View is usually sufficient.
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
  },
});

export default memo(ElementsGrid);
