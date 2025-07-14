import React, { useMemo, memo, useEffect } from "react";
import { StyleSheet, ViewStyle, StyleProp, View } from "react-native";

import ElementsGrid, { PAGINATED_ELEMENTS_CONTAINER_PADDING } from "./selector/ElementsGrid";
import { Category, ElementData } from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import CategorySelector from "./selector/CategorySelector";
import { BORDER_RADIUS_15 } from "@/utils/designTokens";

export const ELEMENTS_PER_PAGE = 12;

interface PaginatedElementSelectorProps {
  selectedCategory: Category;
  onCategoryPress: (newSelectedCategory: Category) => void;
  categoryElements: ElementData[];
  onSelectElement: (category: Category, classId: number) => void;
  initialSelectedClassId: number | Set<number>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginatedElementsContainer: React.FC<PaginatedElementSelectorProps> = ({
  selectedCategory,
  onCategoryPress,
  categoryElements,
  onSelectElement,
  initialSelectedClassId,
  currentPage,
  setCurrentPage,
}) => {
  const themeSurface = useThemeStore((state) => state.theme.surface);

  const currentElements = useMemo(() => {
    const startIndex = currentPage * ELEMENTS_PER_PAGE;
    const endIndex = startIndex + ELEMENTS_PER_PAGE;
    return categoryElements.slice(startIndex, endIndex);
  }, [categoryElements, currentPage]);

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: themeSurface }] as StyleProp<ViewStyle>,
    [themeSurface]
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  return (
    <View style={containerStyle}>
      <CategorySelector selectedCategory={selectedCategory} onCategoryPress={onCategoryPress} />

      <ElementsGrid
        elements={currentElements}
        selectedClassId={initialSelectedClassId}
        onSelectElement={onSelectElement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS_15 + PAGINATED_ELEMENTS_CONTAINER_PADDING,
    overflow: "hidden",
    padding: PAGINATED_ELEMENTS_CONTAINER_PADDING,
    gap: 6,
  },
});

export default memo(PaginatedElementsContainer);
