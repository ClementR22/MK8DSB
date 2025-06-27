import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import { View, StyleSheet, ScrollView, ViewStyle, StyleProp, Pressable } from "react-native";

import ElementGrid from "./ElementGrid";
import { BodyElement, CategoryKey, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import { ELEMENTS_PER_PAGE } from "./ElementsSelector";

interface PaginatedElementSelectorProps {
  selectedCategory: CategoryKey;
  categoryElements: (CharacterElement | BodyElement | WheelElement | GliderElement)[];
  onElementsSelectionChange: (classId: number) => void;
  initialSelectedClassId: number | Set<number>; // This prop is the source of truth
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
  // OPTIMIZATION: Use useCallback for the Zustand selector to ensure its stability.
  // This helps prevent unnecessary re-renders if the `theme` object reference
  // changes, but its `surface` property remains the same.
  const themeSurface = useThemeStore(useCallback((state) => state.theme.surface, []));

  const currentElements = useMemo(() => {
    const startIndex = currentPage * ELEMENTS_PER_PAGE;
    const endIndex = startIndex + ELEMENTS_PER_PAGE;
    return categoryElements.slice(startIndex, endIndex);
  }, [categoryElements, currentPage]);

  const handleSelectElement = useCallback(
    (classId: number) => {
      onElementsSelectionChange(classId);
    },
    [onElementsSelectionChange]
  );

  const containerStyle = useMemo(
    // Now depends on `themeSurface` which is a stable primitive.
    () => [styles.fixedHeightContainer, { backgroundColor: themeSurface }] as StyleProp<ViewStyle>,
    [themeSurface]
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  return (
    <ScrollView style={containerStyle} contentContainerStyle={styles.scrollViewContent}>
      <ElementGrid
        elements={currentElements}
        selectedClassId={initialSelectedClassId}
        onSelectElement={handleSelectElement}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fixedHeightContainer: {
    height: 300, // Set your desired fixed height here
    // Example: height: Dimensions.get('window').height * 0.4,
    // If this component should fill remaining space in a flex parent, use flex: 1
    // flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1, // Allows ElementGrid to grow and fill the ScrollView's height
    alignItems: "center", // Horizontally centers content within the ScrollView
  },
});

export default memo(PaginatedElementsContainer);
