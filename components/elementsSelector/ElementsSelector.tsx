// No changes needed in ElementsSelector as it correctly passes props
// to PaginatedElementsContainer, which now handles the item dimension logic.

import React, { useState, memo, useMemo, useEffect, useCallback } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import PaginatedElementsContainer, { ELEMENTS_PER_PAGE } from "./PaginatedElementsContainer";
import {
  elementsDataBody,
  elementsDataCharacter,
  elementsDataGlider,
  elementsDataWheel,
} from "@/data/elements/elementsData";
import { BodyElement, CategoryKey, CharacterElement, GliderElement, WheelElement } from "@/data/elements/elementsTypes";
import CategorySelector from "./CategorySelector";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SortModeSelector from "./SortModeSelector";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { sortElements } from "@/utils/sortElements";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import PagesNavigator from "./PagesNavigator";

const allCategoryElements: {
  [key in CategoryKey]: (CharacterElement | BodyElement | WheelElement | GliderElement)[];
} = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

interface ElementsSelectorProps {
  selectionMode?: "single" | "multiple";
  children?: React.ReactNode;
}

const ElementsSelector: React.FC<ElementsSelectorProps> = ({ selectionMode = "single", children }) => {
  const language = useLanguageStore((state) => state.language);

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("character");
  const [orderNumber, setOrderNumber] = useState(0);

  const selectedClassId = usePressableElementsStore((state) => {
    return selectionMode === "single"
      ? state.selectedClassIds[selectedCategory]
      : state.multiSelectedClassIds[selectedCategory];
  });

  const selectElementsByClassId = usePressableElementsStore((state) => state.selectElementsByClassId);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  const handleElementSelectionChange = useCallback(
    (classId: number) => {
      if (selectionMode === "single") {
        selectElementsByClassId(selectedCategory, classId);
      } else {
        toggleMultiSelectElementsByClassId(selectedCategory, classId);
      }
    },
    [selectElementsByClassId, toggleMultiSelectElementsByClassId, selectedCategory, selectionMode]
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

  return (
    <>
      <ScrollView>
        {children}
        <View style={styles.controlsContainer}>
          <ButtonIcon
            onPress={toggleOpenFilterView}
            iconName={isOpenFilterView ? "chevron-down" : "chevron-up"}
            iconType={IconType.MaterialCommunityIcons}
            tooltipText={isOpenFilterView ? "DevelopSliders" : "ReduceSliders"}
          />

          <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </View>
        {isOpenFilterView && (
          <Pressable style={styles.controlsContainer}>
            <SortModeSelector setOrderNumber={setOrderNumber} />
          </Pressable>
        )}

        <PaginatedElementsContainer
          selectedCategory={selectedCategory}
          categoryElements={categoryElementsSorted}
          initialSelectedClassId={selectedClassId}
          onElementsSelectionChange={handleElementSelectionChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ScrollView>
      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingLeft: 10,
    gap: 10,
  },
});

export default memo(ElementsSelector);
