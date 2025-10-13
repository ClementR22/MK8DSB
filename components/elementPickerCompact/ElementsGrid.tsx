import { Category, ElementData } from "@/data/elements/elementsTypes";
import React, { memo } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native"; // Removed Dimensions
import { useElementPickerStyle } from "@/hooks/useElementPickerStyle";
import ElementPickerCompact from "./ElementPickerCompact";
import {
  GAP_ELEMENTS_GRID,
  MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
  PADDING_PANNEL_PAGINATED,
} from "@/utils/designTokens";

interface ElementsGridProps {
  elements: ElementData[];
  selectedClassId: Set<number> | number | null;
  onSelectElement: (category: Category, classId: number) => void;
}

const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;
export const ELEMENTS_PER_PAGE = 12;
const NUM_LINES = ELEMENTS_PER_PAGE / NUM_COLUMNS;

const PADDING_ELEMENTS_GRID = PADDING_PANNEL_PAGINATED;
const ELEMENTS_GRID_WIDTH = screenWidth * 0.9 - MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER * 2;

const ITEM_WIDTH =
  (ELEMENTS_GRID_WIDTH - PADDING_ELEMENTS_GRID * 2 - GAP_ELEMENTS_GRID * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.1;
const FILLING_ELEMENT_STYLE = { width: ITEM_WIDTH, height: ITEM_HEIGHT };

export const ELEMENTS_GRID_HEIGHT = ITEM_HEIGHT * NUM_LINES + GAP_ELEMENTS_GRID * (NUM_LINES - 1);

const ElementsGrid: React.FC<ElementsGridProps> = ({ elements, selectedClassId, onSelectElement }) => {
  const fillingElements = Array.from({ length: ELEMENTS_PER_PAGE - elements.length });

  const { elementPickerDynamicStyle, activeBorderStyle } = useElementPickerStyle({ size: ITEM_WIDTH }); // Passe la taille commune ici

  return (
    <Pressable style={styles.container}>
      {/* pour capturer le scroll */}
      {elements.map((element) => {
        const isSelected =
          selectedClassId instanceof Set ? selectedClassId.has(element.classId) : selectedClassId === element.classId;

        return (
          <ElementPickerCompact
            key={element.id}
            imageUrl={element.imageUrl}
            name={element.name}
            isSelected={isSelected}
            onPress={() => onSelectElement(element.category, element.classId)}
            elementPickerDynamicStyle={elementPickerDynamicStyle}
            activeBorderStyle={activeBorderStyle}
          />
        );
      })}
      {fillingElements.map((_, i) => (
        <View key={`empty${i}`} style={FILLING_ELEMENT_STYLE} />
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
    gap: GAP_ELEMENTS_GRID,
    paddingHorizontal: PADDING_ELEMENTS_GRID,
  },
});

export default memo(ElementsGrid);
