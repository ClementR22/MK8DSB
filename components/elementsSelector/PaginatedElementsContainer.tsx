import React, { useMemo, useCallback, memo, useEffect } from "react";
import { StyleSheet, ViewStyle, StyleProp, View } from "react-native";

import ElementsGrid, { ELEMENT_GRID_PADDING_VERTICAL, GAP, ITEM_HEIGHT } from "./selector/ElementsGrid";
import {
  BodyElement,
  CategoryKey,
  CharacterElement,
  ElementItem,
  GliderElement,
  WheelElement,
} from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";

export const ELEMENTS_PER_PAGE = 12;

interface PaginatedElementSelectorProps {
  selectedCategory: CategoryKey;
  categoryElements: ElementItem[];
  onElementsSelectionChange: (classId: number) => void;
  initialSelectedClassId: number | Set<number>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginatedElementsContainer: React.FC<PaginatedElementSelectorProps> = ({
  selectedCategory,
  categoryElements,
  onElementsSelectionChange,
  initialSelectedClassId,
  currentPage,
  setCurrentPage,
}) => {
  const themeSurface = useThemeStore(useCallback((state) => state.theme.surface, []));

  const currentElements = useMemo(() => {
    const startIndex = currentPage * ELEMENTS_PER_PAGE;
    const endIndex = startIndex + ELEMENTS_PER_PAGE;
    return categoryElements.slice(startIndex, endIndex);
  }, [categoryElements, currentPage]);

  const handleSelectElement = useCallback(
    (element: ElementItem) => {
      onElementsSelectionChange(element.classId);
    },
    [onElementsSelectionChange]
  );

  const containerStyle = useMemo(
    () => [styles.fixedHeightContainer, { backgroundColor: themeSurface }] as StyleProp<ViewStyle>,
    [themeSurface]
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  return (
    <View style={containerStyle}>
      <ElementsGrid
        elements={currentElements}
        selectedClassId={initialSelectedClassId}
        onSelectElement={handleSelectElement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fixedHeightContainer: {
    height: ITEM_HEIGHT * 3 + GAP * 2 + ELEMENT_GRID_PADDING_VERTICAL * 2,
  },
});

export default memo(PaginatedElementsContainer);
