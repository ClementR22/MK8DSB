import React, { useMemo, useCallback, memo, useEffect } from "react";
import { StyleSheet, ViewStyle, StyleProp, View } from "react-native";

import ElementsGrid, { PAGINATED_ELEMENTS_CONTAINER_PADDING } from "./selector/ElementsGrid";
import { CategoryKey, ElementItem } from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import CategorySelector from "./selector/CategorySelector";
import { ITEM_CARD_BORDER_RADIUS } from "@/hooks/useItemCardStyle";

export const ELEMENTS_PER_PAGE = 12;

interface PaginatedElementSelectorProps {
  selectedCategory: CategoryKey;
  setSelectedCategory: (newSelectedCategory: CategoryKey) => void;
  categoryElements: ElementItem[];
  onElementsSelectionChange: (classId: number) => void;
  initialSelectedClassId: number | Set<number>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginatedElementsContainer: React.FC<PaginatedElementSelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
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
    () => [styles.container, { backgroundColor: themeSurface }] as StyleProp<ViewStyle>,
    [themeSurface]
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  return (
    <View style={containerStyle}>
      <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <ElementsGrid
        elements={currentElements}
        selectedClassId={initialSelectedClassId}
        onSelectElement={handleSelectElement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: ITEM_CARD_BORDER_RADIUS + PAGINATED_ELEMENTS_CONTAINER_PADDING,
    overflow: "hidden",
    padding: PAGINATED_ELEMENTS_CONTAINER_PADDING,
    gap: 6,
  },
});

export default memo(PaginatedElementsContainer);
