// components/elementCompactSelector/ElementsDeselector.tsx
import React, { memo, useEffect, useMemo, useRef } from "react";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { elementsDataByClassId } from "@/data/elements/elementsData";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { Pressable, ScrollView, View } from "react-native";
import { useElementPickerStyle } from "@/hooks/useElementPickerStyle";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { translateToLanguage } from "@/translations/translations";
import ElementPickerCompact from "../ElementPickerCompact";
import useGeneralStore from "@/stores/useGeneralStore";
import { BORDER_RADIUS_MODAL_CHILDREN_CONTAINER } from "@/utils/designTokens";

const ITEM_ELEMENT_WIDTH = 40;
const ELEMENTS_CONTAINER_PADDING = 6;

const ElementsDeselector: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const scrollViewRef = useRef<ScrollView>(null);

  const multiSelectedClassIdsStore = usePressableElementsStore((state) => state.multiSelectedClassIdsByCategory);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  const elementsToDisplay = useMemo(() => {
    let elementsToDisplayList = [];
    for (const key in multiSelectedClassIdsStore) {
      if (Object.prototype.hasOwnProperty.call(multiSelectedClassIdsStore, key)) {
        const classIdSet = multiSelectedClassIdsStore[key];
        classIdSet.forEach((classId: number) => {
          const elementsInThisClass = elementsDataByClassId.get(classId);
          if (Array.isArray(elementsInThisClass)) {
            elementsToDisplayList = elementsToDisplayList.concat(elementsInThisClass);
          } else {
            console.warn(`No array found for classId: ${classId} in elementsDataByClassId.`);
          }
        });
      }
    }
    return elementsToDisplayList;
  }, [multiSelectedClassIdsStore, elementsDataByClassId]);

  useEffect(() => {
    setTimeout(() => {
      // besoin d'un delai pour prendre en compte la nouvelle taille de SetCardsContainer
      scrollViewRef?.current?.scrollToEnd();
    }, 50);
  }, [elementsToDisplay]);

  // Styles dynamiques pour le conteneur et le texte
  const containerDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface,
    }),
    [theme.surface]
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

  const { elementPickerDynamicStyle: elementsCardDynamicStyle, activeBorderStyle } = useElementPickerStyle({
    size: ITEM_ELEMENT_WIDTH,
  }); // Passe la taille commune ici

  const isEmpty = elementsToDisplay.length === 0;

  return (
    <View style={StyleSheet.flatten([styles.container, containerDynamicStyle])}>
      <Text style={StyleSheet.flatten([styles.deselectorTitle, titleTextDynamicStyle])}>
        {translateToLanguage("Selected", language)}
      </Text>

      {isEmpty ? (
        <Text style={StyleSheet.flatten([styles.noItemsText, noItemsTextDynamicStyle])}>
          {translateToLanguage("None", language)}
        </Text>
      ) : (
        <ScrollView ref={scrollViewRef} horizontal persistentScrollbar scrollEnabled={isScrollEnable}>
          <Pressable style={styles.elementsContainer}>
            {elementsToDisplay.map((item) => (
              <ElementPickerCompact
                key={item.name}
                imageUrl={item.imageUrl}
                name={item.name}
                isSelected={true}
                onPress={() => toggleMultiSelectElementsByClassId(item.category, item.classId)}
                elementPickerDynamicStyle={elementsCardDynamicStyle}
                activeBorderStyle={activeBorderStyle}
              />
            ))}
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    gap: 2,
    paddingBottom: ELEMENTS_CONTAINER_PADDING,
    borderRadius: BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
  },
  deselectorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: ELEMENTS_CONTAINER_PADDING,
    marginTop: 2,
  },
  noItemsText: {
    height: ITEM_ELEMENT_WIDTH * 1.1,
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
  },
  elementsContainer: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: ELEMENTS_CONTAINER_PADDING,
  },
});

export default memo(ElementsDeselector);
