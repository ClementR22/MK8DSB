// GalleryScreenok.tsx
import React, { useState, useRef, useEffect, useMemo, memo, useCallback } from "react"; // Add memo
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import CategorySelector from "./elementsSelector/selector/CategorySelector"; // The expanded version
import CategorySelectorCollapsed from "./elementsSelector/selector/CategorySelectorCollapsed"; // The collapsed version
import { Category, ElementData } from "@/data/elements/elementsTypes";
import { useLanguageStore } from "@/stores/useLanguageStore";
import {
  elementsDataBody,
  elementsDataCharacter,
  elementsDataGlider,
  elementsDataWheel,
} from "@/data/elements/elementsData";
import { sortElements } from "@/utils/sortElements";
import SortModeSelector from "./elementsSelector/SortModeSelector";
import { classesStatsByCategory } from "@/data/elements/elementsStats";
import { statNames, statNamesCompact } from "@/data/stats/statsData";
import StatSliderCompact from "./statSlider/StatSliderCompact"; // Ensure this component also looks good
import { useThemeStore } from "@/stores/useThemeStore"; // Import theme store for main component styling
import {
  PADDING_HORIZONTAL,
  BORDER_RADIUS_18,
  BORDER_RADIUS_12,
  CARD_SPACING,
  LIST_ITEM_SPACING,
  SHADOW_STYLE,
  SHADOW_STYLE_LIGHT,
  BORDER_RADIUS_15,
  LEFT_COLUMN_WIDTH_EXPANDED,
  LEFT_COLUMN_WIDTH_COLLAPSED,
  LEFT_COLUMN_PADDING_HORIZONTAL,
} from "@/utils/designTokens"; // Import design tokens
import { SET_CARD_CONTAINER_PADDING } from "./statSliderSetCard/StatNamesFloatingContainer";
import { maxValues } from "@/data/classStats";
import { translateToLanguage } from "@/translations/translations";
import ElementPickerList from "./galleryComponents/ElementPickerList";
import ElementCard from "./galleryComponents/ElementCard";

const allCategoryElements: {
  [key in Category]: ElementData[];
} = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

// --- Main GalleryScreenok Component ---
const GalleryScreenok = () => {
  const [selectedElementId, setSelectedElementId] = useState(0); // Initialize with a default ID if possible
  const [isLeftColumnExpanded, setIsLeftColumnExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);

  const theme = useThemeStore((state) => state.theme); // Get theme for main component
  const language = useLanguageStore((state) => state.language); // Moved up to be a dependency

  const categoryElementsSorted = useMemo(
    () => sortElements(allCategoryElements[selectedCategory], sortNumber, language),
    [selectedCategory, sortNumber, language]
  );

  // Initialize selectedElementId to the first element of the initial category
  useEffect(() => {
    setSelectedElementId(categoryElementsSorted[0].id);
  }, [categoryElementsSorted]);

  const animatedLeftColumnWidth = useRef(new Animated.Value(LEFT_COLUMN_WIDTH_EXPANDED)).current;

  useEffect(() => {
    if (isLeftColumnExpanded) {
      Animated.parallel([
        Animated.timing(animatedLeftColumnWidth, {
          toValue: LEFT_COLUMN_WIDTH_EXPANDED,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedLeftColumnWidth, {
          toValue: LEFT_COLUMN_WIDTH_COLLAPSED,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isLeftColumnExpanded, animatedLeftColumnWidth]); // Add dependencies

  // Handle left column item press
  const handleLeftColumnPress = (id: number) => {
    if (id === selectedElementId) {
      setIsLeftColumnExpanded(!isLeftColumnExpanded);
    } else {
      setSelectedElementId(id); // Select the new item
      setIsLeftColumnExpanded(false);
    }
  };

  // Handle background press (to expand left column)
  const handleBackgroundPress = () => {
    setIsLeftColumnExpanded(false);
  };

  // Handle category selector press (when collapsed, to expand left column)
  const handleCategoryPress = () => {
    setIsLeftColumnExpanded(true);
  };

  const { selectedElementName, selectedElementStats } = useMemo(() => {
    // Find the currently selected element data
    const currentElement = categoryElementsSorted.find((element: ElementData) => element.id === selectedElementId);

    // Provide a default or handle case where currentElement is undefined (e.g., initial state before data loads)
    if (!currentElement) {
      return { selectedElementName: "N/A", selectedElementStats: [] };
    }

    const name = currentElement.name;
    const classId = currentElement.classId;

    const statsArray = classesStatsByCategory[selectedCategory].get(classId);

    // Ensure statsArray exists before mapping
    const stats = statsArray
      ? statNames.map((statName, index) => {
          const statNameCompact = statNamesCompact[statName];
          return { name: statNameCompact, value: statsArray[index] };
        })
      : [];

    return { selectedElementName: translateToLanguage(name, language), selectedElementStats: stats };
  }, [selectedElementId, selectedCategory, categoryElementsSorted]); // Add selectedCategory and categoryElementsSorted as dependencies

  const getElementPickerListStyle = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        return {
          containerDynamic: { backgroundColor: theme.primary, ...SHADOW_STYLE_LIGHT },
          textDynamic: { color: theme.on_primary },
        };
      } else {
        return {
          containerDynamic: { backgroundColor: theme.surface, ...SHADOW_STYLE_LIGHT },
          textDynamic: { color: theme.on_surface },
        };
      }
    },
    [theme]
  );

  const elementCardStyle = useMemo(
    () => ({
      containerDynamic: { borderColor: theme.surface_container, backgroundColor: theme.surface },
      textDynamic: { color: theme.on_surface },
    }),
    [theme]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <ElementCard
        name={selectedElementName}
        stats={selectedElementStats}
        category={selectedCategory}
        isLeftColumnExpanded={isLeftColumnExpanded}
        handleBackgroundPress={handleBackgroundPress}
        style={elementCardStyle}
      />

      {/* Left Column - ElementList */}
      <Animated.View style={[styles.leftColumn, { width: animatedLeftColumnWidth, backgroundColor: theme.surface }]}>
        {/* Themed background */}
        <View style={styles.controlsAndCategoryContainer}>
          {/* New container for controls and category */}
          <View style={styles.sortSelectorContainer}>
            <SortModeSelector sortNumber={sortNumber} setSortNumber={setSortNumber} sortCase="element" />
          </View>
          {isLeftColumnExpanded ? (
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          ) : (
            <CategorySelectorCollapsed selectedCategory={selectedCategory} onPress={handleCategoryPress} />
          )}
        </View>
        <FlatList
          data={categoryElementsSorted}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedElementId;
            const elementPickerStyle = getElementPickerListStyle(isSelected);
            return (
              <ElementPickerList // Use Memoized version
                name={translateToLanguage(item.name, language)}
                imageUrl={item.imageUrl}
                onPress={() => handleLeftColumnPress(item.id)}
                isSelected={isSelected}
                isCollapsed={!isLeftColumnExpanded}
                style={elementPickerStyle}
              />
            );
          }}
          contentContainerStyle={{ paddingHorizontal: LEFT_COLUMN_PADDING_HORIZONTAL }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // Background color from theme applied in JSX
  },
  leftColumn: {
    borderTopEndRadius: BORDER_RADIUS_18, // Consistent radius
    borderEndEndRadius: BORDER_RADIUS_18,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    marginVertical: CARD_SPACING / 2,
    ...SHADOW_STYLE, // Apply shadow to the column
  },
  controlsAndCategoryContainer: {
    paddingVertical: CARD_SPACING / 2, // Small internal padding
    marginBottom: CARD_SPACING / 2, // Space before the list
  },
  sortSelectorContainer: {
    marginHorizontal: CARD_SPACING, // Match padding of CategorySelector
    marginBottom: CARD_SPACING, // Space between sort selector and category selector
  },
});

export default GalleryScreenok;
