import React, { useState, memo, useMemo, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { elementsDataByCategory } from "@/data/elements/elementsData";
import { Category } from "@/data/elements/elementsTypes";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SortModeSelector from "../sortModeSelector/SortModeSelector";
import { sortElements } from "@/utils/sortElements";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import BodytypesSelector from "../rowSelector/BodytypesSelector";
import { useThemeStore } from "@/stores/useThemeStore";
import CategorySelector from "../rowSelector/CategorySelector";
import ElementsGrid, { ELEMENTS_GRID_HEIGHT, ELEMENTS_PER_PAGE } from "./ElementsGrid";
import PagesNavigator from "./PagesNavigator";
import {
  BORDER_RADIUS_STANDARD,
  BUTTON_SIZE,
  GAP_SORT_MODE_SELECTOR,
  PADDING_PANNEL_PAGINATED,
} from "@/utils/designTokens";
import Separator from "../Separator";
import { useTranslation } from "react-i18next";

interface ElementPickerCompactSelectorPannelProps {
  selectionMode?: "single" | "multiple";
  selectedBodytypes?: Set<Bodytype>;
  setSelectedBodytypes?: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
  children?: React.ReactNode;
}

const PannelPaginated: React.FC<ElementPickerCompactSelectorPannelProps> = ({
  selectionMode = "single",
  selectedBodytypes,
  setSelectedBodytypes,
  children,
}) => {
  const { t } = useTranslation("elements");

  const theme = useThemeStore((state) => state.theme);
  const pagerRef = useRef<PagerView>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);
  const [isOpenSortView, setIsOpenSortView] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const categoryElementsSorted = useMemo(
    () => sortElements(elementsDataByCategory[selectedCategory], sortNumber, t),
    [selectedCategory, sortNumber, t]
  );

  const numberOfPages = useMemo(() => {
    return Math.ceil(categoryElementsSorted.length / ELEMENTS_PER_PAGE);
  }, [categoryElementsSorted.length]);

  const pages = useMemo(() => {
    return Array.from({ length: numberOfPages }, (_, i) => {
      const start = i * ELEMENTS_PER_PAGE;
      return categoryElementsSorted.slice(start, start + ELEMENTS_PER_PAGE);
    });
  }, [categoryElementsSorted, numberOfPages]);

  const isFilterMode = selectionMode === "multiple";

  const selectedClassId = usePressableElementsStore((state) => {
    return isFilterMode
      ? state.multiSelectedClassIdsByCategory[selectedCategory]
      : state.selectedClassIdsByCategory[selectedCategory];
  });

  const selectElementsByClassId = usePressableElementsStore((state) => state.selectElementsByClassId);

  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  const handleSelectElement = useMemo(
    () => (isFilterMode ? toggleMultiSelectElementsByClassId : selectElementsByClassId),
    [selectElementsByClassId, toggleMultiSelectElementsByClassId, isFilterMode]
  );

  const toggleOpenSortView = useCallback(() => setIsOpenSortView((prev) => !prev), []);

  // Track si on est en navigation programmatique
  const isProgrammaticScroll = useRef(false);

  // Gestion du changement de page
  const handleSetPage = useCallback(
    (page: number | ((prev: number) => number)) => {
      const newPage = typeof page === "function" ? page(currentPage) : page;
      setCurrentPage(newPage);
      isProgrammaticScroll.current = true;
      pagerRef.current?.setPage(newPage);
    },
    [currentPage]
  );

  // Synchronisation quand on swipe manuellement
  const handlePageSelected = useCallback((e: any) => {
    const selectedPage = e.nativeEvent.position;

    // Si c'est un scroll programmatique, on ignore
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false;
      return;
    }

    // Sinon c'est un swipe manuel, on met à jour
    setCurrentPage(selectedPage);
  }, []);

  // Reset de la page quand on change de catégorie
  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    isProgrammaticScroll.current = true;
    pagerRef.current?.setPageWithoutAnimation(0);
  }, []);

  const { iconName, iconType, tooltipText } = isOpenSortView
    ? { iconName: "car-sports", iconType: IconType.MaterialCommunityIcons, tooltipText: "FilterBodytypes" }
    : { iconName: "sort", iconType: IconType.MaterialCommunityIcons, tooltipText: "SortElements" };

  return (
    <>
      {children}
      <View style={styles.middleContainer}>
        {isFilterMode && (
          <>
            <View style={styles.buttonToggleWrapper}>
              <ButtonIcon
                onPress={toggleOpenSortView}
                iconName={iconName}
                iconType={iconType}
                tooltipText={tooltipText}
              />
            </View>
            <Separator direction="vertical" length={BUTTON_SIZE} />
          </>
        )}
        <View style={styles.controlsContainer}>
          {isOpenSortView || !isFilterMode ? (
            <SortModeSelector sortNumber={sortNumber} setSortNumber={setSortNumber} sortCase="element" />
          ) : (
            <View style={styles.bodytypeSelectorWrapper}>
              <BodytypesSelector selectedBodytypes={selectedBodytypes} setSelectedBodytypes={setSelectedBodytypes} />
            </View>
          )}
        </View>
      </View>

      <View style={[styles.paginatedWrapperContainer, { backgroundColor: theme.surface }]}>
        <View style={styles.categorySelectorWrapper}>
          <CategorySelector selectedCategory={selectedCategory} onCategoryPress={handleCategoryChange} />
        </View>

        <PagerView ref={pagerRef} style={styles.pagerView} initialPage={0} onPageSelected={handlePageSelected}>
          {pages.map((pageElements, index) => (
            <View key={`page-${index}`} style={styles.pageContainer}>
              <ElementsGrid
                elements={pageElements}
                selectedClassId={selectedClassId}
                onSelectElement={handleSelectElement}
              />
            </View>
          ))}
        </PagerView>

        <View style={styles.navigatorWrapper}>
          <PagesNavigator currentPage={currentPage} setCurrentPage={handleSetPage} numberOfPages={numberOfPages} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  middleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    height: 54,
  },
  buttonToggleWrapper: { marginHorizontal: GAP_SORT_MODE_SELECTOR },
  controlsContainer: { flex: 1 },
  bodytypeSelectorWrapper: { marginHorizontal: GAP_SORT_MODE_SELECTOR },
  paginatedWrapperContainer: {
    borderRadius: BORDER_RADIUS_STANDARD,
    overflow: "hidden",
    paddingVertical: PADDING_PANNEL_PAGINATED,
    gap: PADDING_PANNEL_PAGINATED,
  },
  categorySelectorWrapper: {
    paddingHorizontal: PADDING_PANNEL_PAGINATED,
  },
  pagerView: {
    height: ELEMENTS_GRID_HEIGHT,
  },
  pageContainer: {
    flex: 1,
  },
  navigatorWrapper: {
    paddingHorizontal: PADDING_PANNEL_PAGINATED,
  },
});

export default memo(PannelPaginated);
