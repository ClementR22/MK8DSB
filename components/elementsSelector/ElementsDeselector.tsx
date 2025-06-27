import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { BodyElement, CategoryKey, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";
import GridItem from "./GridItem"; // Re-use the existing GridItem component
import { MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL } from "@/primitiveComponents/Modal";

interface ElementsDeselectorProps {
  elementsGroupedByClassId: Map<number, CharacterElement | BodyElement | WheelElement | GliderElement>;
}

const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;
const PADDING_HORIZONTAL = 20; // Matches padding in ElementGrid's gridContainer
const GAP = 10; // Matches gap in ElementGrid's gridContainer

const ELEMENT_GRID_PADDING_HORIZONTAL = 10;

const ITEM_WIDTH =
  (screenWidth * 0.9 -
    MODAL_CHILDREN_CONTAINER_PADDING_HORIZONTAL * 2 -
    ELEMENT_GRID_PADDING_HORIZONTAL * 2 -
    GAP * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

export const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

// Item dimensions need to be consistent with ElementGrid or flexible
const DESELECTOR_ITEM_WIDTH = (screenWidth - PADDING_HORIZONTAL * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const DESELECTOR_ITEM_HEIGHT = DESELECTOR_ITEM_WIDTH * 1.5; // Assuming the same aspect ratio as GridItem

const ElementsDeselector: React.FC<ElementsDeselectorProps> = ({ elementsGroupedByClassId }) => {
  const theme = useThemeStore((state) => state.theme);

  // Access selected IDs from the store across all categories
  const multiSelectedClassIdsStore = usePressableElementsStore((state) => state.multiSelectedClassIds);

  // Get actions for deselection
  const selectElementsByClassId = usePressableElementsStore((state) => state.selectElementsByClassId);
  const toggleMultiSelectElementsByClassId = usePressableElementsStore(
    (state) => state.toggleMultiSelectElementsByClassId
  );

  // Memoize the list of all currently selected elements
  const selectedElements = useMemo(() => {
    let elementsToDisplay = []; // Initialize an empty array

    // Iterate over the values of multiSelectedClassIdsStore, which are Sets of classIds
    for (const key in multiSelectedClassIdsStore) {
      if (Object.prototype.hasOwnProperty.call(multiSelectedClassIdsStore, key)) {
        // Good practice for iterating object properties
        const classIdSet = multiSelectedClassIdsStore[key]; // This is a Set of classIds

        classIdSet.forEach((classId) => {
          // Correctly get the array of elements from the Map
          const elementsInThisClass = elementsGroupedByClassId.get(classId);

          // Check if elementsInThisClass exists and is an array before concatenating
          if (Array.isArray(elementsInThisClass)) {
            // Use concat() and reassign the result
            elementsToDisplay = elementsToDisplay.concat(elementsInThisClass);
          } else {
            // Optional: Log a warning if a classId doesn't have an associated array
            console.warn(`No array found for classId: ${classId} in elementsGroupedByClassId.`);
          }
        });
      }
    }

    // To ensure uniqueness if elements can appear in multiple sets or categories,
    // you might want to convert to a Set and back to an Array.
    // This depends on whether you expect/want duplicates in elementsToDisplay.
    // For example:
    // const uniqueElements = Array.from(new Set(elementsToDisplay));
    // return uniqueElements;

    return elementsToDisplay;
  }, [multiSelectedClassIdsStore, elementsGroupedByClassId]);

  // Handle deselection: Find which category the element belongs to and deselect it.
  const handleDeselectElement = useCallback(
    (category: CategoryKey, classId: number) => {
      toggleMultiSelectElementsByClassId(category, classId); // Toggle (deselects if active)
    },
    [elementsGroupedByClassId, multiSelectedClassIdsStore, selectElementsByClassId, toggleMultiSelectElementsByClassId]
  );

  // Memoize common styles that depend on theme or are constant.
  const elementCardBaseStyle = useMemo(
    () => ({
      width: DESELECTOR_ITEM_WIDTH,
      height: DESELECTOR_ITEM_HEIGHT,
      borderRadius: 15,
      padding: 0, // Padding handled by GridItem's internal styles
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2, // Default border for GridItem
      borderColor: "transparent",
      overflow: "hidden",
    }),
    [] // These dimensions are fixed for this component
  );

  const elementNameStyle = useMemo(
    () => [stylesDeselectorGridItem.elementName, { color: theme.on_surface }],
    [theme.on_surface]
  );
  const activeBorderStyle = useMemo(
    () => [stylesDeselectorGridItem.activeBorder, { borderColor: theme.primary }],
    [theme.primary]
  );

  const elementCardDynamicStyle = useMemo(
    () => [stylesGridItem.elementCard, { backgroundColor: theme.surface_container_low }],
    [theme.surface_container_low]
  );

  return (
    <View>
      {selectedElements.length !== 0 && (
        <View style={styles.deselectorContainer}>
          <Text style={[styles.deselectorTitle, { color: theme.on_surface }]}>Selected Elements:</Text>

          <ScrollView horizontal contentContainerStyle={styles.gridContainer}>
            {selectedElements.map((element) => {
              return (
                <GridItem
                  key={element.id} // Use element.id for key
                  element={element}
                  isSelected={true} // Always true, as they are "selected" elements in this context
                  onSelectElement={() => handleDeselectElement(element.category, element.classId)} // This will now act as a deselector
                  elementCardDynamicStyle={elementCardDynamicStyle}
                  activeBorderStyle={activeBorderStyle}
                  size={40}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deselectorContainer: {
    paddingVertical: 10,
  },
  deselectorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  gridContainer: {
    flexDirection: "row",
    gap: 3,
  },
  noElementsContainer: {
    padding: 20,
    borderRadius: 10,
    marginHorizontal: PADDING_HORIZONTAL,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100, // Ensure it has some height
  },
  noElementsText: {
    fontSize: 16,
    textAlign: "center",
  },
});

const stylesGridItem = StyleSheet.create({
  elementCard: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  // If elementImage relied on ITEM_WIDTH, it would also need to become a dynamic style object
  // passed via props, or GridItem needs to calculate its own internal image size.
  // For now, keep it simple, assuming ITEM_WIDTH is not needed directly by GridItem's internal styles.
});

// Styles for the GridItem components when used in Deselector
const stylesDeselectorGridItem = StyleSheet.create({
  // No elementCardBase here, as it's passed dynamically
  elementName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  activeBorder: {
    borderWidth: 3,
    // You might want a different border color for items in the deselector to indicate they are "selected"
    // For example, make it a distinct 'deselected' color or a clear indicator.
  },
});

export default memo(ElementsDeselector);
