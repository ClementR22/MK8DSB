// No changes needed in ElementsSelector as it correctly passes props
// to PaginatedElementsContainer, which now handles the item dimension logic.

import React, { useState, memo, useMemo, useEffect, useCallback } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import PaginatedElementsContainer, { ELEMENTS_PER_PAGE } from "../PaginatedElementsContainer";
import {
  elementsDataBody,
  elementsDataCharacter,
  elementsDataGlider,
  elementsDataWheel,
} from "@/data/elements/elementsData";
import {
  BodyElement,
  CategoryKey,
  CharacterElement,
  ElementItem,
  GliderElement,
  WheelElement,
} from "@/data/elements/elementsTypes";
import CategorySelector from "./CategorySelector";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SortModeSelector from "../SortModeSelector";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { sortElements } from "@/utils/sortElements";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import PagesNavigator from "../PagesNavigator";
import { Bodytype } from "@/data/bodytypes/bodytypeTypes";
import BodytypesSelector from "./BodytypesSelector";

const allCategoryElements: {
  [key in CategoryKey]: ElementItem[];
} = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

interface ElementsSelectorProps {
  selectionMode?: "single" | "multiple";
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
  children?: React.ReactNode;
}

const ElementsSelector: React.FC<ElementsSelectorProps> = ({
  selectionMode = "single",
  selectedBodytypes,
  setSelectedBodytypes,
  children,
}) => {
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
        <ScrollView horizontal contentContainerStyle={styles.controlsContainer}>
          {selectionMode !== "single" && (
            <ButtonIcon
              onPress={toggleOpenFilterView}
              iconName={isOpenFilterView ? "chevron-down" : "chevron-up"}
              iconType={IconType.MaterialCommunityIcons}
              tooltipText={isOpenFilterView ? "DevelopSliders" : "ReduceSliders"}
            />
          )}

          {isOpenFilterView || selectionMode === "single" ? (
            <SortModeSelector setOrderNumber={setOrderNumber} />
          ) : (
            <BodytypesSelector selectedBodytypes={selectedBodytypes} setSelectedBodytypes={setSelectedBodytypes} />
          )}
        </ScrollView>

        <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

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
    gap: 10,
  },
});

export default memo(ElementsSelector);
