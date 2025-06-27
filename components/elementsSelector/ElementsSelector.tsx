import React, { useState, memo, useMemo, useEffect, useCallback } from "react"; // Removed useCallback as it's not strictly needed for direct state/action access
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import PaginatedElementsContainer from "./PaginatedElementsContainer";
import { bodiesList, charactersList, glidersList, wheelsList } from "@/data/elementsData";
import { BodyElement, CategoryKey, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";
import CategorySelector from "./CategorySelector";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SortModeSelector from "./SortModeSelector";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { sortElements } from "@/utils/sortElements";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import PagesNavigator from "./PagesNavigator";
import useGeneralStore from "@/stores/useGeneralStore";

export const ELEMENTS_PER_PAGE = 12;

// Define all available elements by category. This should be outside the component
// to ensure it's referentially stable across renders.
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
  // CORRECTED: Access theme and language directly or via simple selectors.
  // Zustand handles re-renders efficiently for these.
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language); // Language is a primitive (string), so this is fine.

  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("character");
  const [orderNumber, setOrderNumber] = useState(0);

  // CORRECTED: Simple selector for selectedClassId. No useCallback needed here.
  // If the selectedClassId for the current category changes, this will trigger a re-render.
  const selectedClassId = usePressableElementsStore((state) => {
    return selectionMode === "single"
      ? state.selectedClassIds[selectedCategory]
      : state.multiSelectedClassIds[selectedCategory];
  });

  // CORRECTED: Access actions directly. Actions provided by Zustand are referentially stable.
  const selectElementsByClassId = usePressableElementsStore((state) => state.selectElementsByClassId);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  // handleElementSelectionChange is a callback that depends on local state and stable actions.
  // It's good to keep this memoized.
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

  // Memoize the sorted list of elements.
  const categoryElementsSorted = useMemo(
    () => sortElements(allCategoryElements[selectedCategory], orderNumber, language),
    // Dependencies are correct here: stable data, and state/props that trigger re-sort.
    [selectedCategory, orderNumber, language] // `allCategoryElements` is outside the component, so it's stable by default and doesn't need to be in dependencies.
  );

  const [isOpenFilterView, setIsOpenFilterView] = useState(false);
  // toggleOpenFilterView is a simple toggle, useCallback is fine but not strictly critical
  // unless passed to a memoized child that's sensitive to function reference changes.
  const toggleOpenFilterView = useCallback(() => setIsOpenFilterView((prev) => !prev), []);

  const [currentPage, setCurrentPage] = useState(0);

  // Reset page to 0 when category or sort order changes, ensuring user sees top of list.
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, orderNumber]); // Add orderNumber to dependency array

  const totalPages = useMemo(() => {
    return Math.ceil(categoryElementsSorted.length / ELEMENTS_PER_PAGE);
  }, [categoryElementsSorted.length]); // Dependency is correct.

  return (
    <>
      <Pressable style={[styles.controlsContainer, { borderColor: theme.on_surface_variant }]}>
        <ButtonIcon
          onPress={toggleOpenFilterView}
          iconName={isOpenFilterView ? "chevron-down" : "chevron-up"}
          iconType={IconType.MaterialCommunityIcons}
          tooltipText={isOpenFilterView ? "DevelopSliders" : "ReduceSliders"}
        />
        {/* ScrollView for the horizontal options */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.topHorizontalScrollView}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={isScrollEnable}
        >
          <Pressable>
            {/* pour capturer le clic pour le scroll*/}
            {isOpenFilterView ? (
              <SortModeSelector setOrderNumber={setOrderNumber} />
            ) : (
              <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            )}
          </Pressable>
        </ScrollView>
      </Pressable>

      <PaginatedElementsContainer
        selectedCategory={selectedCategory}
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
    borderBottomWidth: 1,
    paddingLeft: 10,
    gap: 10, // Requires React Native 0.71+ for gap property
  },
  topHorizontalScrollView: {
    flexDirection: "row", // Ensure children are laid out horizontally
    alignItems: "center", // Vertically align items in the scroll view
    paddingVertical: 10,
    height: 60, // Fixed height for the scroll view containing buttons
  },
});

export default memo(ElementsSelector);
