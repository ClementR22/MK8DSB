import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import GridItem from "./GridItem";

interface ElementGridProps {
  elements: (CharacterElement | BodyElement | WheelElement | GliderElement)[];
  selectedClassId: Set<number> | number | null;
  onSelectElement: (classId: number) => void;
}

const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;
const PADDING_HORIZONTAL = 20;
const GAP = 10;

// These calculations are outside the component, so they run only once.
// Good practice!
const ITEM_WIDTH = (screenWidth - PADDING_HORIZONTAL * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

const ElementGrid: React.FC<ElementGridProps> = ({ elements, selectedClassId, onSelectElement }) => {
  // 1. Optimize theme access: Use useCallback for the selector
  // This prevents theme-related re-renders if unrelated theme properties change.
  const theme = useThemeStore((state) => state.theme);

  // 2. Keep calculateIsSelected as is - it's already well-optimized with useCallback.
  const calculateIsSelected = useCallback(
    (classId: number) => {
      if (selectedClassId instanceof Set) {
        return selectedClassId.has(classId);
      } else if (typeof selectedClassId === "number") {
        return selectedClassId === classId;
      }
      return false;
    },
    [selectedClassId] // Dependency is correct here.
  );

  // 3. Memoize common styles that depend on theme or are constant.
  // These are passed as props to GridItem, so memoizing them prevents GridItem from re-rendering
  // if these objects change reference but not content.
  const elementCardBaseStyle = useMemo(() => stylesGridItem.elementCardBase, []);
  const elementNameStyle = useMemo(() => [stylesGridItem.elementName, { color: theme.on_surface }], [theme.on_surface]);
  const activeBorderStyle = useMemo(
    () => [stylesGridItem.activeBorder, { borderColor: theme.primary }],
    [theme.primary]
  );
  // pressedStateStyle is a static StyleSheet object, so it's already stable.
  const pressedStateStyle = stylesGridItem.pressedState;

  return (
    <Pressable style={styles.gridContainer}>
      {elements.map((element) => (
        <GridItem
          key={element.id} // Ensure a stable and unique key.
          element={element}
          isSelected={calculateIsSelected(element.classId)} // Call the memoized function.
          onSelectElement={onSelectElement} // This should ideally be a stable function from parent.
          elementCardBaseStyle={elementCardBaseStyle}
          elementNameStyle={elementNameStyle}
          activeBorderStyle={activeBorderStyle}
          // pressedStateStyle is already static from StyleSheet, so no need for useMemo.
          pressedStateStyle={pressedStateStyle}
        />
      ))}
    </Pressable>
  );
};

// --- StyleSheet definitions ---
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: PADDING_HORIZONTAL,
    justifyContent: "space-around",
    gap: GAP, // Ensure your React Native version supports 'gap' property (0.71+)
  },
});

const stylesGridItem = StyleSheet.create({
  elementCardBase: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden", // Important if you have rounded corners with content
  },
  elementImage: {
    width: ITEM_WIDTH * 0.8,
    height: ITEM_WIDTH * 0.8,
    borderRadius: (ITEM_WIDTH * 0.8) / 2,
    marginBottom: 5,
  },
  elementName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  activeBorder: {
    borderWidth: 3,
  },
  pressedState: {
    opacity: 0.7,
  },
});

export default memo(ElementGrid);
