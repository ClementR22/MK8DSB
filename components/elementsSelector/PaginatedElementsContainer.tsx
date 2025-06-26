import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import { View, StyleSheet, ScrollView, ViewStyle, StyleProp } from "react-native";

import ElementGrid from "./ElementGrid";
import { BodyElement, CategoryKey, CharacterElement, GliderElement, WheelElement } from "@/data/elementsData";
import { useThemeStore } from "@/stores/useThemeStore";
import PagesNavigator from "./PagesNavigator";

const ELEMENTS_PER_PAGE = 12; // This constant is fine here

interface PaginatedElementSelectorProps {
  selectedCategory: CategoryKey;
  categoryElements: (CharacterElement | BodyElement | WheelElement | GliderElement)[];
  onElementsSelectionChange: (classId: number) => void;
  initialSelectedClassId: number | Set<number>; // This prop is the source of truth
}

const PaginatedElementsContainer: React.FC<PaginatedElementSelectorProps> = ({
  selectedCategory,
  categoryElements,
  onElementsSelectionChange,
  initialSelectedClassId,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(() => {
    return Math.ceil(categoryElements.length / ELEMENTS_PER_PAGE);
  }, [categoryElements.length]);

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
    () => [styles.container, { backgroundColor: theme.surface }] as StyleProp<ViewStyle>,
    [theme.surface]
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  return (
    <View style={containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ElementGrid
          elements={currentElements}
          selectedClassId={initialSelectedClassId}
          onSelectElement={handleSelectElement}
        />
      </ScrollView>

      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default memo(PaginatedElementsContainer);
