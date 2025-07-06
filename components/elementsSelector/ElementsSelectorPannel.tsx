// No changes needed in ElementsSelectorPannel as it correctly passes props
// to PaginatedElementsContainer, which now handles the item dimension logic.

import React, { useState, memo, useMemo, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import PaginatedElementsContainer, { ELEMENTS_PER_PAGE } from "./PaginatedElementsContainer";
import {
  elementsDataBody,
  elementsDataCharacter,
  elementsDataGlider,
  elementsDataWheel,
} from "@/data/elements/elementsData";
import { Category, ElementData } from "@/data/elements/elementsTypes";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SortModeSelector, { HALF_GAP } from "./SortModeSelector";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { sortElements } from "@/utils/sortElements";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import PagesNavigator from "./PagesNavigator";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import BodytypesSelector from "./selector/BodytypesSelector";
import { useThemeStore } from "@/stores/useThemeStore";

const allCategoryElements: {
  [key in Category]: ElementData[];
} = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

interface ElementsSelectorProps {
  selectionMode?: "single" | "multiple";
  selectedBodytypes?: Set<Bodytype>;
  setSelectedBodytypes?: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
  children?: React.ReactNode;
}

const ElementsSelectorPannel: React.FC<ElementsSelectorProps> = ({
  selectionMode = "single",
  selectedBodytypes,
  setSelectedBodytypes,
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [orderNumber, setOrderNumber] = useState(0);

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

  const categoryElementsSorted = useMemo(
    () => sortElements(allCategoryElements[selectedCategory], orderNumber, language),
    [selectedCategory, orderNumber, language]
  );

  const [isOpenFilterView, setIsOpenFilterView] = useState(false);
  const toggleOpenFilterView = useCallback(() => setIsOpenFilterView((prev) => !prev), []);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, orderNumber]);

  const totalPages = useMemo(() => {
    return Math.ceil(categoryElementsSorted.length / ELEMENTS_PER_PAGE);
  }, [categoryElementsSorted.length]);

  const { iconName, iconType, tooltipText } = useMemo(() => {
    if (isOpenFilterView) {
      return { iconName: "car-sports", iconType: IconType.MaterialCommunityIcons, tooltipText: "FilterBodytypes" };
    }
    return { iconName: "sort", iconType: IconType.MaterialCommunityIcons, tooltipText: "SortElements" };
  }, [isOpenFilterView]);

  const separatorDynamicStyle = useMemo(() => ({ backgroundColor: theme.outline_variant }), []);

  return (
    <>
      {children}
      <View style={styles.middleContainer}>
        {selectionMode !== "single" && (
          <>
            <ButtonIcon
              onPress={toggleOpenFilterView}
              iconName={iconName}
              iconType={iconType}
              tooltipText={tooltipText}
            />

            <View style={[styles.separator, separatorDynamicStyle]} />
          </>
        )}
        <View style={styles.controlsContainer}>
          {isOpenFilterView || selectionMode === "single" ? (
            <SortModeSelector setOrderNumber={setOrderNumber} />
          ) : (
            <BodytypesSelector selectedBodytypes={selectedBodytypes} setSelectedBodytypes={setSelectedBodytypes} />
          )}
        </View>
      </View>

      <PaginatedElementsContainer
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryElements={categoryElementsSorted}
        initialSelectedClassId={selectedClassId}
        handleSelectElement={handleSelectElement}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
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
  separator: { width: 2, height: 40, marginLeft: HALF_GAP },
  controlsContainer: { justifyContent: "center", flexGrow: 1, flexShrink: 1 },
});

export default memo(ElementsSelectorPannel);
