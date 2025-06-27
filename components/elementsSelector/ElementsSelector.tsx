import React, { useCallback, useState, memo, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import PaginatedElementsContainer from "./PaginatedElementsContainer";
import {
  bodiesList,
  BodyElement,
  CategoryKey,
  CharacterElement,
  charactersList,
  GliderElement,
  glidersList,
  WheelElement,
  wheelsList,
} from "@/data/elementsData";
import CategorySelector from "./CategorySelector";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { sortElements } from "@/utils/sortElements"; // Import the pure sorting utility

// Constant data definitions are fine outside the component for referential stability
const allCategoryElements: {
  [key in CategoryKey]: (CharacterElement | BodyElement | WheelElement | GliderElement)[];
} = {
  character: charactersList,
  body: bodiesList,
  wheel: wheelsList,
  glider: glidersList,
};

interface ElementsSelectorProps {
  selectionMode?: "single" | "multiple";
}

const ElementsSelector: React.FC<ElementsSelectorProps> = ({ selectionMode = "single" }) => {
  // Zustand store selections (already memoized by useThemeStore, useLanguageStore)
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  // Local component state
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("character");
  const [orderNumber, setOrderNumber] = useState(0); // State for current sorting order

  // Optimized Zustand selector for `selectedClassId` / `multiSelectedClassIds`
  // This memoizes the selector function itself to prevent unnecessary re-subscriptions,
  // and the result changes only when `selectedCategory` or `selectionMode` changes.
  const selectedClassId = usePressableElementsStore(
    useCallback(
      (state) => {
        if (selectionMode === "single") {
          return state.selectedClassIds[selectedCategory];
        } else {
          // Note: `multiSelectedClassIds` returns a `Set`. `initialSelectedClassId`
          // in `PaginatedElementsContainer` might need to handle a Set or a single ID.
          // If `initialSelectedClassId` expects a single number, this will pass a Set,
          // which might be a discrepancy to address based on how PaginatedElementsContainer uses it.
          // For now, assuming PaginatedElementsContainer can handle a Set if selectionMode is 'multiple'.
          return state.multiSelectedClassIds[selectedCategory];
        }
      },
      [selectedCategory, selectionMode]
    )
  );

  // Directly select actions from Zustand store. Actions are referentially stable by default.
  const selectElementsByClassId = usePressableElementsStore((state) => state.selectElementsByClassId);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  // Memoized callback for handling element selection changes.
  // It only re-creates if its dependencies change.
  const handleElementSelectionChange = useCallback(
    (classId: number) => {
      if (selectionMode === "single") {
        selectElementsByClassId(selectedCategory, classId);
      } else {
        toggleMultiSelectElementsByClassId(selectedCategory, classId);
      }
    },
    // Dependencies: Store actions are stable, selectedCategory and selectionMode are states/props.
    [selectElementsByClassId, toggleMultiSelectElementsByClassId, selectedCategory, selectionMode]
  );

  // OPTIMIZATION: Memoize the sorted list of elements.
  // This `useMemo` ensures that the `sortElements` function is only called
  // when `allCategoryElements`, `selectedCategory`, `orderNumber`, or `language` changes.
  const categoryElementsSorted = useMemo(
    () => sortElements(allCategoryElements[selectedCategory], orderNumber, language),
    [allCategoryElements, selectedCategory, orderNumber, language]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={[styles.controlsContainer, { borderColor: theme.on_surface_variant }]}>
        {/* Sort Button */}
        <ButtonMultiStateToggle number={orderNumber} setNumber={setOrderNumber} tooltipText="Sort" />
        {/* Category Selector */}
        <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </View>

      <PaginatedElementsContainer
        selectedCategory={selectedCategory}
        categoryElements={categoryElementsSorted} // Pass the memoized and sorted list
        initialSelectedClassId={selectedClassId} // This needs to handle a single ID or a Set based on selectionMode
        onElementsSelectionChange={handleElementSelectionChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Renamed from categorySelectorContainer to controlsContainer for better semantic meaning
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingLeft: 10,
    gap: 10,
    // Add justify-content if you want to space out the sort button and category selector
    // justifyContent: 'space-between',
  },
});

export default memo(ElementsSelector);
