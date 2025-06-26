import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elementsData";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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

const ITEM_WIDTH = (screenWidth - PADDING_HORIZONTAL * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

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

  const elementCardBaseStyle = useMemo(() => stylesGridItem.elementCardBase, []); // No dependency as it's truly base
  const elementNameStyle = useMemo(() => [stylesGridItem.elementName, { color: theme.on_surface }], [theme.on_surface]);
  const activeBorderStyle = useMemo(
    () => [stylesGridItem.activeBorder, { borderColor: theme.primary }],
    [theme.primary]
  );
  const pressedStateStyle = stylesGridItem.pressedState;

  return (
    <View style={styles.gridContainer}>
      {elements.map((element) => {
        const isSelected = calculateIsSelected(element.classId);

        return (
          <GridItem
            key={element.id}
            element={element}
            isSelected={isSelected}
            onSelectElement={onSelectElement}
            elementCardBaseStyle={elementCardBaseStyle}
            elementNameStyle={elementNameStyle}
            activeBorderStyle={activeBorderStyle}
            pressedStateStyle={pressedStateStyle}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: PADDING_HORIZONTAL,
    justifyContent: "space-around",
    gap: GAP,
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
    overflow: "hidden",
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
