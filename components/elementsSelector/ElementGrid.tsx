import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native"; // Removed Dimensions
import GridItem from "./GridItem";
import { MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL } from "@/primitiveComponents/Modal";

interface ElementGridProps {
  elements: (CharacterElement | BodyElement | WheelElement | GliderElement)[];
  selectedClassId: Set<number> | number | null;
  onSelectElement: (classId: number) => void;
}

export const ELEMENT_GRID_PADDING_VERTICAL = 10;
const ELEMENT_GRID_PADDING_HORIZONTAL = 10;
export const GAP = 10;
const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;

const ITEM_WIDTH =
  (screenWidth * 0.9 -
    MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL * 2 -
    ELEMENT_GRID_PADDING_HORIZONTAL * 2 -
    GAP * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

export const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

const ElementGrid: React.FC<ElementGridProps> = ({ elements, selectedClassId, onSelectElement }) => {
  const theme = useThemeStore((state) => state.theme);

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

  const elementCardDynamicStyle = useMemo(
    () => [stylesGridItem.elementCard, { backgroundColor: theme.surface_container_low }],
    [theme.surface_container_low]
  );

  const activeBorderStyle = useMemo(() => ({ borderColor: theme.primary }), [theme.primary]);

  return (
    // Removed Pressable from here, as it's typically for the entire grid to be clickable,
    // but individual items are clickable. If ElementGrid itself needs to be a Pressable,
    // its purpose should be clear. For a grid of items, a simple View is usually sufficient.
    <View style={styles.gridContainer}>
      {elements.map((element) => (
        <GridItem
          key={element.id}
          element={element}
          isSelected={calculateIsSelected(element.classId)}
          onSelectElement={onSelectElement}
          elementCardDynamicStyle={elementCardDynamicStyle}
          activeBorderStyle={activeBorderStyle}
        />
      ))}
    </View>
  );
};

// --- StyleSheet definitions ---
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: ELEMENT_GRID_PADDING_VERTICAL,
    paddingHorizontal: ELEMENT_GRID_PADDING_HORIZONTAL, // Keep padding defined here for the grid container
    gap: GAP, // Keep gap defined here
  },
});

const stylesGridItem = StyleSheet.create({
  elementCard: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  // If elementImage relied on ITEM_WIDTH, it would also need to become a dynamic style object
  // passed via props, or GridItem needs to calculate its own internal image size.
  // For now, keep it simple, assuming ITEM_WIDTH is not needed directly by GridItem's internal styles.
});

export default memo(ElementGrid);
