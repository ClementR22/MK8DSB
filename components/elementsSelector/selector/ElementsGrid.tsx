import { ElementData } from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { memo, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native"; // Removed Dimensions
import { MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL } from "@/primitiveComponents/Modal";
import { useItemCardStyle } from "@/hooks/useItemCardStyle";
import ItemCard from "../ItemCard";

interface ElementsGridProps {
  elements: ElementData[];
  selectedClassId: Set<number> | number | null;
  onSelectElement: (element: ElementData) => void;
}

export const PAGINATED_ELEMENTS_CONTAINER_PADDING = 6;
const GAP = 5;
const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;

const ITEM_WIDTH =
  (screenWidth * 0.9 -
    MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL * 2 -
    PAGINATED_ELEMENTS_CONTAINER_PADDING * 2 -
    GAP * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

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

  const { itemCardDynamicStyle, activeBorderStyle } = useItemCardStyle({ size: ITEM_WIDTH }); // Passe la taille commune ici

  return (
    // Removed Pressable from here, as it's typically for the entire grid to be clickable,
    // but individual items are clickable. If ElementsGrid itself needs to be a Pressable,
    // its purpose should be clear. For a grid of items, a simple View is usually sufficient.
    <View style={styles.container}>
      {elements.map((element) => (
        <ItemCard
          key={element.id}
          imageUrl={element.imageUrl}
          name={element.name}
          isSelected={calculateIsSelected(element.classId)}
          onPress={() => onSelectElement(element)}
          itemCardDynamicStyle={itemCardDynamicStyle}
          activeBorderStyle={activeBorderStyle}
        />
      ))}
    </View>
  );
};

// --- StyleSheet definitions ---
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP, // Keep gap defined here
  },
});

export default memo(ElementsGrid);
