// components/elementPickerCompact/ElementsDeselector.tsx
import React, { memo, useEffect, useMemo, useRef } from "react";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { elementsDataByClassId } from "@/data/elements/elementsData";
import { useThemeStore } from "@/stores/useThemeStore";
import { Pressable, ScrollView, View } from "react-native";
import { useElementPickerStyle } from "@/hooks/useElementPickerStyle";
import { StyleSheet } from "react-native";
import ElementPickerCompact from "./ElementPickerCompact";
import useGeneralStore from "@/stores/useGeneralStore";
import { BORDER_RADIUS_MODAL_CHILDREN_CONTAINER } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

const ITEM_ELEMENT_WIDTH = 40;
const ELEMENTS_CONTAINER_PADDING = 6;

const ElementsDeselector: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);

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
      // besoin d'un delai pour prendre en compte la nouvelle taille de BuildCardsContainer
      scrollViewRef?.current?.scrollToEnd();
    }, 50);
  }, [elementsToDisplay]);

  const { elementPickerDynamicStyle, activeBorderStyle } = useElementPickerStyle({
    size: ITEM_ELEMENT_WIDTH,
  }); // Passe la taille commune ici

  const isEmpty = elementsToDisplay.length === 0;

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          backgroundColor: theme.surface,
        },
      ])}
    >
      <Text role="title" size="small" weight="bold" style={styles.deselectorTitle} namespace="text">
        selected
      </Text>

      {isEmpty ? (
        <Text
          role="body"
          size="large"
          color={theme.on_surface_variant}
          textAlign="center"
          fontStyle="italic"
          style={styles.noItemsText}
          namespace="placeholder"
        >
          none
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
                elementPickerDynamicStyle={elementPickerDynamicStyle}
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
    marginLeft: ELEMENTS_CONTAINER_PADDING,
    marginTop: 2,
  },
  noItemsText: {
    height: ITEM_ELEMENT_WIDTH * 1.1,
  },
  elementsContainer: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: ELEMENTS_CONTAINER_PADDING,
  },
});

export default memo(ElementsDeselector);
