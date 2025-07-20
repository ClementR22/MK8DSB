// GalleryScreen.tsx
import React, { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
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
import { LEFT_PANNEL_WIDTH_COLLAPSED, LEFT_PANNEL_WIDTH_EXPANDED } from "@/utils/designTokens"; // Import design tokens
import { translateToLanguage } from "@/translations/translations";
import ElementCard from "@/components/galleryComponents/ElementCard";
import ElementPickerSelector from "@/components/galleryComponents/ElementPickerSelector";
import ElementPickerSelectorPannel from "@/components/galleryComponents/ElementPickerSelectorPannel";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { useSelectedElementData } from "@/hooks/useSelectedElementData";
import { useGalleryAnimation } from "@/hooks/useGalleryAnimation";
import Tooltip from "@/components/Tooltip";

// --- Main GalleryScreen Component ---
const GalleryScreen = () => {
  const [selectedElementId, setSelectedElementId] = useState(0);
  const [isLeftPannelExpanded, setIsLeftPannelExpanded] = useState(true);
  const [isCategorySelectorExpanded, setIsCategorySelectorExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);

  const language = useLanguageStore((state) => state.language);

  const categoryElementsSorted = useMemo(
    () => sortElements(elementsDataByCategory[selectedCategory], sortNumber, language),
    [selectedCategory, sortNumber, language]
  );

  const { animatedLeftPannelWidth, animatedOverlayOpacity } = useGalleryAnimation(
    isLeftPannelExpanded,
    setIsCategorySelectorExpanded
  );

  const { selectedElementName, selectedElementStats } = useSelectedElementData(
    categoryElementsSorted,
    selectedElementId,
    selectedCategory,
    language
  );

  const handleElementPickerPress = useCallback(
    (id: number) => {
      if (id === selectedElementId) {
        setIsLeftPannelExpanded(!isLeftPannelExpanded);
      } else {
        setSelectedElementId(id);
        setIsLeftPannelExpanded(false);
      }
    },
    [selectedElementId, isLeftPannelExpanded]
  );

  const handleBackgroundPress = useCallback(() => {
    setIsLeftPannelExpanded(false);
  }, []);

  const handleCollapsedCategoryPress = useCallback(() => {
    setIsLeftPannelExpanded(true);
  }, []);

  useEffect(() => {
    setSelectedElementId(categoryElementsSorted[0].id);
  }, [selectedCategory, categoryElementsSorted]);

  return (
    <View style={styles.container}>
      <ElementCard
        name={selectedElementName}
        stats={selectedElementStats}
        category={selectedCategory}
        animatedOverlayOpacity={animatedOverlayOpacity}
        handleBackgroundPress={handleBackgroundPress}
      />
      <ElementPickerSelectorPannel animatedLeftPannelWidth={animatedLeftPannelWidth}>
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
        <ElementPickerSelector
          categoryElementsSorted={categoryElementsSorted}
          selectedElementId={selectedElementId}
          isLeftPannelExpanded={isLeftPannelExpanded}
          onElementPickerPress={handleElementPickerPress}
        />
      </ElementPickerSelectorPannel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // Background color from theme applied in JSX
  },
});

GalleryScreen.displayName = "GalleryScreen";

export default memo(GalleryScreen);
