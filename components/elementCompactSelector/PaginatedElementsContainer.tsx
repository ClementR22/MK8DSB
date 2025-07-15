import React, { useMemo, memo, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import ElementsGrid, { ELEMENTS_GRID_WIDTH, PAGINATED_ELEMENTS_CONTAINER_PADDING } from "./selector/ElementsGrid";
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
    return Array.from({ length: totalPages }, (_, i) => {
      const start = i * ELEMENTS_PER_PAGE;
      return categoryElements.slice(start, start + ELEMENTS_PER_PAGE);
    });
  }, [categoryElements, totalPages]);

  const containerStyle = useMemo(
    () => [styles.container, { backgroundColor: themeSurface }] as StyleProp<ViewStyle>,
    [themeSurface]
  );

  // Reset page si la catégorie change
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: 0,
      animated: false,
    });
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

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / ELEMENTS_GRID_WIDTH);

    if (isManuallyScrolling.current) {
      // On ignore ce callback car on est en scroll programmé
      isManuallyScrolling.current = false;
    } else {
      // Scroll utilisateur → on MAJ le state
      setCurrentPage(pageIndex);
    }
  };

  const getItemLayout = useCallback(
    (data: unknown, index: number) => ({
      length: ELEMENTS_GRID_WIDTH,
      offset: ELEMENTS_GRID_WIDTH * index,
      index,
    }),
    []
  );

  return (
    <View style={containerStyle}>
      <CategorySelector selectedCategory={selectedCategory} onCategoryPress={onCategoryPress} />

      <FlatList
        ref={flatListRef}
        data={pages}
        getItemLayout={getItemLayout}
        initialNumToRender={1} // Ne rendre que la première page initialement
        maxToRenderPerBatch={2} // Limiter le nombre de pages rendues par batch
        windowSize={3} // Garder +1 page en mémoire de chaque côté
        removeClippedSubviews={true} // Recycler les vues hors écran (à tester)
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `${selectedCategory}-${index}`} // Ajouter la catégorie pour éviter des conflits
        renderItem={({ item }) => (
          <ElementsGrid elements={item} selectedClassId={initialSelectedClassId} onSelectElement={onSelectElement} />
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
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
