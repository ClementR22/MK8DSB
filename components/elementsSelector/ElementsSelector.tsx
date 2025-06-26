import React, { useCallback, useState, memo } from "react";
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
  const theme = useThemeStore((state) => state.theme);

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("character");

  const selectedClassId = usePressableElementsStore(
    useCallback(
      (state) => {
        if (selectionMode === "single") {
          return state.selectedClassIds[selectedCategory];
        } else {
          return state.multiSelectedClassIds[selectedCategory];
        }
      },
      [selectedCategory, selectionMode]
    )
  );

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

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <PaginatedElementsContainer
        selectedCategory={selectedCategory}
        categoryElements={allCategoryElements[selectedCategory]}
        initialSelectedClassId={selectedClassId}
        onElementsSelectionChange={handleElementSelectionChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(ElementsSelector);
