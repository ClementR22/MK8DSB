// GalleryScreen.tsx
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { View } from "react-native";
import CategorySelector from "@/components/elementCompactSelector/selector/CategorySelector";
import { Category } from "@/data/elements/elementsTypes";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { elementsDataByCategory } from "@/data/elements/elementsData";
import { sortElements } from "@/utils/sortElements";
import ElementCard from "@/components/galleryComponents/ElementCard";
import ElementPickerSelector from "@/components/galleryComponents/ElementPickerSelector";
import ElementPickerSelectorPannel from "@/components/galleryComponents/ElementPickerSelectorPannel";
import { useSelectedElementData } from "@/hooks/useSelectedElementData";
import { useGalleryAnimation } from "@/hooks/useGalleryAnimation";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import ScrollViewScreen from "@/components/ScrollViewScreen";

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

  const { animatedLeftPannelWidth, animatedOverlayOpacity, animatedCategoryMarginLeft } = useGalleryAnimation(
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

  const isScr = useState(true);

  return (
    <ScreenProvider screenName="gallery">
      <ScrollViewScreen scrollEnabled={true}>
        <ScreenPressablesContainer sortNumber={sortNumber} setSortNumber={setSortNumber}>
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryPress={setSelectedCategory}
            isInGalleryPannel={true}
            animatedCategoryMarginLeft={animatedCategoryMarginLeft}
          />
        </ScreenPressablesContainer>
        <View style={{ flex: 1 }}>
          <ElementCard
            name={selectedElementName}
            stats={selectedElementStats}
            category={selectedCategory}
            animatedOverlayOpacity={animatedOverlayOpacity}
            handleBackgroundPress={handleBackgroundPress}
          />

          <ElementPickerSelectorPannel animatedLeftPannelWidth={animatedLeftPannelWidth}>
            <ElementPickerSelector
              categoryElementsSorted={categoryElementsSorted}
              selectedElementId={selectedElementId}
              isLeftPannelExpanded={isLeftPannelExpanded}
              onElementPickerPress={handleElementPickerPress}
            />
          </ElementPickerSelectorPannel>
        </View>
      </ScrollViewScreen>
    </ScreenProvider>
  );
};

GalleryScreen.displayName = "GalleryScreen";

export default memo(GalleryScreen);
