// No changes needed in ElementsSelectorPannel as it correctly passes props
// to PaginatedElementsContainer, which now handles the item dimension logic.

import React, { useState, memo, useMemo, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView } from "react-native";
import PaginatedElementsContainer, { ELEMENTS_PER_PAGE } from "./PaginatedElementsContainer";
import {
  elementsDataBody,
  elementsDataCharacter,
  elementsDataGlider,
  elementsDataWheel,
} from "@/data/elements/elementsData";
import { CategoryKey, ElementItem } from "@/data/elements/elementsTypes";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SortModeSelector from "./SortModeSelector";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { sortElements } from "@/utils/sortElements";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import PagesNavigator from "./PagesNavigator";
import { Bodytype } from "@/data/bodytypes/bodytypeTypes";
import BodytypesSelector from "./selector/BodytypesSelector";

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

  const { iconName, iconType, tooltipText } = useMemo(() => {
    if (isOpenFilterView) {
      return { iconName: "car-sports", iconType: IconType.MaterialCommunityIcons, tooltipText: "FilterBodytypes" };
    }
    return { iconName: "sort", iconType: IconType.MaterialCommunityIcons, tooltipText: "SortElements" };
  }, [isOpenFilterView]);

  return (
    <>
      {children}
      <ScrollView horizontal contentContainerStyle={styles.controlsContainer} style={{ margin: 2 }}>
        {selectionMode !== "single" && (
          <ButtonIcon
            onPress={toggleOpenFilterView}
            iconName={iconName}
            iconType={iconType}
            tooltipText={tooltipText}
          />
        )}

        {isOpenFilterView || selectionMode === "single" ? (
          <SortModeSelector setOrderNumber={setOrderNumber} />
        ) : (
          <BodytypesSelector selectedBodytypes={selectedBodytypes} setSelectedBodytypes={setSelectedBodytypes} />
        )}
      </ScrollView>

      <PaginatedElementsContainer
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryElements={categoryElementsSorted}
        initialSelectedClassId={selectedClassId}
        onElementsSelectionChange={handleElementSelectionChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <PagesNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 54,
  },
});

export default memo(ElementsSelectorPannel);
