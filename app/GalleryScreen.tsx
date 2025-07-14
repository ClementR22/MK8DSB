// GalleryScreen.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import CategorySelector from "@/components/elementCompactSelector/selector/CategorySelector";
import CategorySelectorCollapsed from "@/components/elementCompactSelector/selector/CategorySelectorCollapsed";
import { Category, ElementData } from "@/data/elements/elementsTypes";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { elementsDataByCategory } from "@/data/elements/elementsData";
import { sortElements } from "@/utils/sortElements";
import SortModeSelector from "@/components/elementCompactSelector/SortModeSelector";
import { classesStatsByCategory } from "@/data/elements/elementsStats";
import { statNames, statNamesCompact } from "@/data/stats/statsData";
import { useThemeStore } from "@/stores/useThemeStore"; // Import theme store for main component styling
import { CARD_SPACING, LEFT_PANNEL_WIDTH_COLLAPSED, LEFT_PANNEL_WIDTH_EXPANDED } from "@/utils/designTokens"; // Import design tokens
import { translateToLanguage } from "@/translations/translations";
import ElementCard from "@/components/galleryComponents/ElementCard";
import ElementPickerSelector from "@/components/galleryComponents/ElementPickerSelector";
import ElementPickerSelectorPannel from "@/components/galleryComponents/ElementPickerSelectorPannel";
import { ScreenProvider } from "@/contexts/ScreenContext";

// --- Main GalleryScreen Component ---
const GalleryScreen = () => {
  const [selectedElementId, setSelectedElementId] = useState(0); // Initialize with a default ID if possible
  const [isLeftPannelExpanded, setIsLeftPannelExpanded] = useState(true);
  const [isCategorySelectorExpanded, setIsCategorySelectorExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);

  const theme = useThemeStore((state) => state.theme); // Get theme for main component
  const language = useLanguageStore((state) => state.language); // Moved up to be a dependency

  const categoryElementsSorted = useMemo(
    () => sortElements(elementsDataByCategory[selectedCategory], sortNumber, language),
    [selectedCategory, sortNumber, language]
  );

  // Initialize selectedElementId to the first element of the initial category
  useEffect(() => {
    setSelectedElementId(categoryElementsSorted[0].id);
  }, [categoryElementsSorted]);

  // Handle left pannel item press
  const handleElementPickerPress = (id: number) => {
    if (id === selectedElementId) {
      setIsLeftPannelExpanded(!isLeftPannelExpanded);
    } else {
      setSelectedElementId(id); // Select the new item
      setIsLeftPannelExpanded(false);
    }
  };

  // Handle background press (to expand left pannel)
  const handleBackgroundPress = () => {
    setIsLeftPannelExpanded(false);
  };

  // Handle category selector press (when collapsed, to expand left pannel)
  const handleCollapsedCategoryPress = () => {
    setIsLeftPannelExpanded(true);
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

  const animatedLeftPannelWidth = useRef(new Animated.Value(LEFT_PANNEL_WIDTH_EXPANDED)).current;
  const animatedOverlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLeftPannelExpanded) {
      setIsCategorySelectorExpanded(isLeftPannelExpanded);

      Animated.parallel([
        Animated.timing(animatedLeftPannelWidth, {
          toValue: LEFT_PANNEL_WIDTH_EXPANDED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOverlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      setTimeout(() => {
        setIsCategorySelectorExpanded(isLeftPannelExpanded);
      }, 300);
      Animated.parallel([
        Animated.timing(animatedLeftPannelWidth, {
          toValue: LEFT_PANNEL_WIDTH_COLLAPSED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOverlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isLeftPannelExpanded]); // Add dependencies

  return (
    <ScreenProvider screenName="gallery">
      <View style={[styles.container]}>
        <ElementCard
          name={selectedElementName}
          stats={selectedElementStats}
          category={selectedCategory}
          animatedOverlayOpacity={animatedOverlayOpacity}
          handleBackgroundPress={handleBackgroundPress}
        />

        <ElementPickerSelectorPannel animatedLeftPannelWidth={animatedLeftPannelWidth}>
          <>
            {/* New container for controls and category */}
            <View>
              <SortModeSelector sortNumber={sortNumber} setSortNumber={setSortNumber} sortCase="element" />
            </View>
            {isCategorySelectorExpanded ? (
              <CategorySelector selectedCategory={selectedCategory} onCategoryPress={setSelectedCategory} />
            ) : (
              <CategorySelectorCollapsed
                selectedCategory={selectedCategory}
                onCollapsedCategoryPress={handleCollapsedCategoryPress}
              />
            )}
          </>
          <ElementPickerSelector
            categoryElementsSorted={categoryElementsSorted}
            selectedElementId={selectedElementId}
            isLeftPannelExpanded={isLeftPannelExpanded}
            onElementPickerPress={handleElementPickerPress}
          />
        </ElementPickerSelectorPannel>
      </View>
    </ScreenProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // Background color from theme applied in JSX
  },
});

export default GalleryScreen;
