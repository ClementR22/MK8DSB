import React, { useState, memo, useMemo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { elementsDataByCategory } from "@/data/elements/elementsData";
import { Category } from "@/data/elements/elementsTypes";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SortModeSelector from "../sortModeSelector/SortModeSelector";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { sortElements } from "@/utils/sortElements";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import BodytypesSelector from "./selector/BodytypesSelector";
import { useThemeStore } from "@/stores/useThemeStore";
import CategorySelector from "./selector/CategorySelector";
import PaginatedWrapper from "../paginatedWrapper/PaginatedWrapper";
import ElementsGrid, { ELEMENTS_GRID_WIDTH, ELEMENTS_PER_PAGE } from "./selector/ElementsGrid";
import {
  BORDER_RADIUS_STANDARD,
  BUTTON_SIZE,
  GAP_SORT_MODE_SELECTOR,
  PADDING_PAGINATED_WRAPPER_CONTAINER,
} from "@/utils/designTokens";
import Separator from "../Separator";

interface ElementPickerCompactSelectorPannelProps {
  selectionMode?: "single" | "multiple";
  selectedBodytypes?: Set<Bodytype>;
  setSelectedBodytypes?: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
  children?: React.ReactNode;
}

const ElementPickerCompactSelectorPannel: React.FC<ElementPickerCompactSelectorPannelProps> = ({
  selectionMode = "single",
  selectedBodytypes,
  setSelectedBodytypes,
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);
  const [isOpenSortView, setIsOpenSortView] = useState(false);

  const categoryElementsSorted = useMemo(
    () => sortElements(elementsDataByCategory[selectedCategory], sortNumber, language),
    [selectedCategory, sortNumber, language]
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

  const selectedClassId = usePressableElementsStore((state) => {
    return selectionMode === "single"
      ? state.selectedClassIdsByCategory[selectedCategory]
      : state.multiSelectedClassIdsByCategory[selectedCategory];
  });

  const selectElementsByClassId = usePressableElementsStore((state) => state.selectElementsByClassId);

  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  const handleSelectElement = useMemo(
    () => (selectionMode === "single" ? selectElementsByClassId : toggleMultiSelectElementsByClassId),
    [selectElementsByClassId, toggleMultiSelectElementsByClassId, selectionMode]
  );

  const toggleOpenSortView = useCallback(() => setIsOpenSortView((prev) => !prev), []);

  const { iconName, iconType, tooltipText } = isOpenSortView
    ? { iconName: "car-sports", iconType: IconType.MaterialCommunityIcons, tooltipText: "FilterBodytypes" }
    : { iconName: "sort", iconType: IconType.MaterialCommunityIcons, tooltipText: "SortElements" };

  return (
    <>
      {children}
      <View style={styles.middleContainer}>
        {selectionMode !== "single" && (
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
          {isOpenSortView || selectionMode === "single" ? (
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
          <CategorySelector selectedCategory={selectedCategory} onCategoryPress={setSelectedCategory} />
        </View>

        <PaginatedWrapper
          pageWidth={ELEMENTS_GRID_WIDTH}
          data={pages}
          renderItem={({ item }) => (
            <ElementsGrid elements={item} selectedClassId={selectedClassId} onSelectElement={handleSelectElement} />
          )}
          numberOfPages={numberOfPages}
          containerStyle={{ gap: PADDING_PAGINATED_WRAPPER_CONTAINER }}
        />
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
  controlsContainer: { justifyContent: "center", flexGrow: 1, flexShrink: 1 },
  bodytypeSelectorWrapper: { marginHorizontal: GAP_SORT_MODE_SELECTOR },
  paginatedWrapperContainer: {
    borderRadius: BORDER_RADIUS_STANDARD,
    overflow: "hidden",
    paddingVertical: PADDING_PAGINATED_WRAPPER_CONTAINER,
    gap: PADDING_PAGINATED_WRAPPER_CONTAINER,
  },
  categorySelectorWrapper: {
    paddingHorizontal: PADDING_PAGINATED_WRAPPER_CONTAINER,
  },
});

export default memo(ElementPickerCompactSelectorPannel);
