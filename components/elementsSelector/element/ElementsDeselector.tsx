// components/elementsSelector/ElementsDeselector.tsx
import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { CategoryKey } from "@/data/elements/elementsTypes";
import ElementItem from "./ElementItem"; // Assurez-vous que c'est le bon ElementItem factorisé
import { MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL } from "@/primitiveComponents/Modal";
import { elementsGroupedByClassId } from "@/data/elements/elementsData";
import { useLanguageStore } from "@/stores/useLanguageStore"; // Garde l'import si utilisé localement
import BaseDeselectorContainer from "../base/BaseDeselectorContainer"; // Nouveau chemin d'importation

const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;
const PADDING_HORIZONTAL = 20;
const GAP = 10;

const ELEMENT_GRID_PADDING_HORIZONTAL = 10;

const ITEM_WIDTH =
  (screenWidth * 0.9 -
    MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL * 2 -
    ELEMENT_GRID_PADDING_HORIZONTAL * 2 -
    GAP * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

const ElementsDeselector: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language); // Peut-être retiré si BaseDeselectorContainer le gère

  const multiSelectedClassIdsStore = usePressableElementsStore((state) => state.multiSelectedClassIds);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  const selectedElements = useMemo(() => {
    let elementsToDisplay = [];
    for (const key in multiSelectedClassIdsStore) {
      if (Object.prototype.hasOwnProperty.call(multiSelectedClassIdsStore, key)) {
        const classIdSet = multiSelectedClassIdsStore[key];
        classIdSet.forEach((classId: number) => {
          const elementsInThisClass = elementsGroupedByClassId.get(classId);
          if (Array.isArray(elementsInThisClass)) {
            elementsToDisplay = elementsToDisplay.concat(elementsInThisClass);
          } else {
            console.warn(`No array found for classId: ${classId} in elementsGroupedByClassId.`);
          }
        });
      }
    }
    return elementsToDisplay;
  }, [multiSelectedClassIdsStore, elementsGroupedByClassId]);

  const handleDeselectElement = useCallback(
    (category: CategoryKey, classId: number) => {
      toggleMultiSelectElementsByClassId(category, classId);
    },
    [toggleMultiSelectElementsByClassId] // Removed elementsGroupedByClassId, multiSelectedClassIdsStore, selectElementsByClassId as they are not needed in this callback's deps
  );

  const activeBorderStyle = useMemo(
    () => [stylesDeselectorElementItem.activeBorder, { borderColor: theme.primary }],
    [theme.primary]
  );

  const elementCardDynamicStyle = useMemo(
    () => [stylesElementItem.elementCard, { backgroundColor: theme.surface_container_low }],
    [theme.surface_container_low]
  );

  return (
    <BaseDeselectorContainer
      titleKey="SelectedElements"
      isEmpty={selectedElements.length === 0}
      contentContainerStyle={styles.gridContainer} // Passe ce style au conteneur de BaseDeselectorContainer
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row", gap: 3 }}
      >
        {selectedElements.map((element) => (
          <ElementItem
            key={element.id}
            element={element}
            isSelected={true}
            onSelectElement={() => handleDeselectElement(element.category, element.classId)}
            elementCardDynamicStyle={elementCardDynamicStyle}
            activeBorderStyle={activeBorderStyle}
            size={40}
          />
        ))}
      </ScrollView>
    </BaseDeselectorContainer>
  );
};

const styles = StyleSheet.create({
  // deselectorContainer, deselectorTitle, noElementsText sont maintenant dans BaseDeselectorContainer
  gridContainer: {
    // La ScrollView prendra les styles de flexDirection et gap
    flexDirection: "row",
    gap: 3,
  },
  // noElementsContainer n'est plus pertinent ici car la logique est dans BaseDeselectorContainer
});

const stylesElementItem = StyleSheet.create({
  elementCard: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
});

const stylesDeselectorElementItem = StyleSheet.create({
  elementName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  activeBorder: {
    borderWidth: 3,
  },
});

export default memo(ElementsDeselector);
