import React, { useMemo, memo, useEffect, useRef } from "react";
import { StyleSheet, ViewStyle, StyleProp, View, FlatList, Dimensions } from "react-native";
import ElementsGrid, { PAGINATED_ELEMENTS_CONTAINER_PADDING } from "./selector/ElementsGrid";
import { Category, ElementData } from "@/data/elements/elementsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import CategorySelector from "./selector/CategorySelector";
import { BORDER_RADIUS_15 } from "@/utils/designTokens";
import PagesNavigator from "./PagesNavigator";

export const ELEMENTS_PER_PAGE = 12;

interface PaginatedElementSelectorProps {
  selectedCategory: Category;
  onCategoryPress: (newSelectedCategory: Category) => void;
  categoryElements: ElementData[];
  onSelectElement: (category: Category, classId: number) => void;
  initialSelectedClassId: number | Set<number>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const { width: screenWidth } = Dimensions.get("window");
const MODAL_WIDTH = screenWidth * 0.9; // Ou ta largeur réelle

const PaginatedElementsContainer: React.FC<PaginatedElementSelectorProps> = ({
  selectedCategory,
  onCategoryPress,
  categoryElements,
  onSelectElement,
  initialSelectedClassId,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const themeSurface = useThemeStore((state) => state.theme.surface);

  const pages = useMemo(() => {
    const allPages = [];
    for (let i = 0; i < totalPages; i++) {
      const start = i * ELEMENTS_PER_PAGE;
      const end = start + ELEMENTS_PER_PAGE;
      allPages.push(categoryElements.slice(start, end));
    }
    return allPages;
  }, [categoryElements, totalPages]);

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: themeSurface }] as StyleProp<ViewStyle>,
    [themeSurface]
  );

  // Reset page si la catégorie change
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  // permet de scroller automatiquement quand currentPage change
  const flatListRef = useRef<FlatList>(null);
  const isManuallyScrolling = useRef(false);

  useEffect(() => {
    isManuallyScrolling.current = true;
    flatListRef.current?.scrollToIndex({
      index: currentPage,
      animated: true,
    });
  }, [currentPage]);

  const handleMomentumScrollEnd = (e: any) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / MODAL_WIDTH);

    if (isManuallyScrolling.current) {
      // On ignore ce callback car on est en scroll programmé
      isManuallyScrolling.current = false;
    } else {
      // Scroll utilisateur → on MAJ le state
      setCurrentPage(pageIndex);
    }
  };

  return (
    <View style={containerStyle}>
      <CategorySelector selectedCategory={selectedCategory} onCategoryPress={onCategoryPress} />

      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `page-${index}`}
        renderItem={({ item }) => (
          <ElementsGrid elements={item} selectedClassId={initialSelectedClassId} onSelectElement={onSelectElement} />
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        extraData={initialSelectedClassId}
      />

      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
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
