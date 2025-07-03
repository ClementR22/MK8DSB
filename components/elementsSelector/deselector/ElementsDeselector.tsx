// components/elementsSelector/ElementsDeselector.tsx
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { ElementItem } from "@/data/elements/elementsTypes";
import { elementsGroupedByClassId } from "@/data/elements/elementsData";
import { Bodytype, BodytypeItem } from "@/data/bodytypes/bodytypeTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { useItemCardStyle } from "@/hooks/useItemCardStyle";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { translateToLanguage } from "@/translations/translations";
import ItemCard from "../ItemCard";
import { bodytypesData } from "@/data/bodytypes/bodytypesData";
import { Dimensions } from "react-native";
import { MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL } from "@/primitiveComponents/Modal";
import { PAGINATED_ELEMENTS_CONTAINER_PADDING } from "../selector/ElementsGrid";

const { width: screenWidth } = Dimensions.get("window");

const ITEM_BODYTYPE_WIDTH =
  (screenWidth * 0.9 - MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL * 2 - PAGINATED_ELEMENTS_CONTAINER_PADDING * 2) / 12; /// 2
const ITEM_ELEMENT_WIDTH = 40;
const ELEMENTS_CONTAINER_PADDING = 6;

interface ElementsDeselectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const ElementsDeselector: React.FC<ElementsDeselectorProps> = ({ selectedBodytypes, setSelectedBodytypes }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const scrollViewRef = useRef<ScrollView>(null);

  const multiSelectedClassIdsStore = usePressableElementsStore((state) => state.multiSelectedClassIds);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  const elementsToDisplay = useMemo(() => {
    let elementsToDisplayList = [];
    for (const key in multiSelectedClassIdsStore) {
      if (Object.prototype.hasOwnProperty.call(multiSelectedClassIdsStore, key)) {
        const classIdSet = multiSelectedClassIdsStore[key];
        classIdSet.forEach((classId: number) => {
          const elementsInThisClass = elementsGroupedByClassId.get(classId);
          if (Array.isArray(elementsInThisClass)) {
            elementsToDisplayList = elementsToDisplayList.concat(elementsInThisClass);
          } else {
            console.warn(`No array found for classId: ${classId} in elementsGroupedByClassId.`);
          }
        });
      }
    }
    return elementsToDisplayList;
  }, [multiSelectedClassIdsStore, elementsGroupedByClassId]);

  const handleDeselectElement = useCallback(
    (element: ElementItem) => {
      toggleMultiSelectElementsByClassId(element.category, element.classId);
    },
    [toggleMultiSelectElementsByClassId] // Removed elementsGroupedByClassId, multiSelectedClassIdsStore, selectElementsByClassId as they are not needed in this callback's deps
  );

  const bodytypesToDisplay = useMemo(
    () => bodytypesData.filter((bodytype) => selectedBodytypes.has(bodytype.name)),
    [selectedBodytypes, bodytypesData]
  );

  const handleDeselectBodytype = useCallback(
    (bodytypeItem: BodytypeItem) => {
      setSelectedBodytypes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(bodytypeItem.name);
        return newSet;
      });
    },
    [setSelectedBodytypes]
  );

  useEffect(() => {
    setTimeout(() => {
      // besoin d'un delai pour prendre en compte la nouvelle taille de SetCardContainer
      scrollViewRef?.current?.scrollToEnd();
    }, 50);
  }, [elementsToDisplay]);

  // Styles dynamiques pour le conteneur et le texte
  const containerDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface,
      borderColor: theme.outline,
    }),
    [theme.surface, theme.outline]
  );

  const titleTextDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const noItemsTextDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface_variant,
    }),
    [theme.on_surface_variant]
  );

  const { itemCardDynamicStyle: bodyTypesCardDynamicStyle } = useItemCardStyle({ size: ITEM_BODYTYPE_WIDTH }); // Passe la taille commune ici

  const { itemCardDynamicStyle: elementsCardDynamicStyle, activeBorderStyle } = useItemCardStyle({
    size: ITEM_ELEMENT_WIDTH,
  }); // Passe la taille commune ici

  const isEmpty = elementsToDisplay.length === 0;

  return (
    <View style={StyleSheet.flatten([styles.container, containerDynamicStyle])}>
      <View style={styles.topContainer}>
        <Text style={StyleSheet.flatten([styles.deselectorTitle, titleTextDynamicStyle])}>
          {translateToLanguage("Selected", language)}
        </Text>
        <View style={styles.bodytypesContainer}>
          {bodytypesToDisplay.map((item) => (
            <ItemCard
              key={item.name}
              imageUrl={item.imageUrl}
              name={item.name}
              isSelected={true}
              onPress={() => handleDeselectBodytype(item)}
              itemCardDynamicStyle={bodyTypesCardDynamicStyle}
              activeBorderStyle={activeBorderStyle}
            />
          ))}
        </View>
      </View>

      {isEmpty ? (
        <Text style={StyleSheet.flatten([styles.noItemsText, noItemsTextDynamicStyle])}>
          {translateToLanguage("None", language)}
        </Text>
      ) : (
        // Les enfants sont la ScrollView avec les items spécifiques (ElementItem ou BodytypeItem)
        // Note: Tu peux ajuster la ScrollViewProps. L'important est que le contenu soit horizontal.
        <ScrollView ref={scrollViewRef} horizontal persistentScrollbar contentContainerStyle={styles.elementsContainer}>
          {elementsToDisplay.map((item) => (
            <ItemCard
              key={item.name}
              imageUrl={item.imageUrl}
              name={item.name}
              isSelected={true}
              onPress={() => handleDeselectElement(item)}
              itemCardDynamicStyle={elementsCardDynamicStyle}
              activeBorderStyle={activeBorderStyle}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 2,
    gap: 2,
  },
  topContainer: {
    flexDirection: "row",
    height: ITEM_BODYTYPE_WIDTH * 1.25,
  },
  deselectorTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 2,
  },
  noItemsText: {
    height: ITEM_ELEMENT_WIDTH * 1.25 + PAGINATED_ELEMENTS_CONTAINER_PADDING,
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontStyle: "italic",
  },
  bodytypesContainer: {
    flexDirection: "row",
    gap: 2,
  },
  elementsContainer: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: ELEMENTS_CONTAINER_PADDING,
    paddingBottom: ELEMENTS_CONTAINER_PADDING,
  },
});

export default memo(ElementsDeselector);
