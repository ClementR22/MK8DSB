import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import CategorySelector from "@/components/rowSelector/CategorySelector";
import { Category } from "@/data/elements/elementsTypes";
import { elementsDataByCategory } from "@/data/elements/elementsData";
import { sortElements } from "@/utils/sortElements";
import ElementCard from "@/components/galleryComponents/ElementCard";
import ElementsList from "@/components/galleryComponents/ElementsList";
import { getSelectedElementData } from "@/utils/getSelectedElementData";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { useContainerLowestStyle } from "@/hooks/useScreenStyle";
import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";
import Pannel from "@/components/galleryComponents/Pannel";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import i18n from "@/translations";
import { useTranslation } from "react-i18next";

// --- Main GalleryScreen Component ---
const GalleryScreen = () => {
  const { t } = useTranslation("elements");

  const [selectedElementId, setSelectedElementId] = useState(0);
  const [isLeftPannelExpanded, setIsLeftPannelExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);

  const categoryElementsSorted = useMemo(
    () => sortElements(elementsDataByCategory[selectedCategory], sortNumber, t),
    [selectedCategory, sortNumber, t]
  );

  const overlayOpacity = useSharedValue(isLeftPannelExpanded ? 0.5 : 0);

  const { selectedElementName, selectedElementStats } = getSelectedElementData(
    categoryElementsSorted,
    selectedElementId,
    selectedCategory
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

  useEffect(() => {
    setSelectedElementId(categoryElementsSorted[0].id);
  }, [selectedCategory]);

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const containerLowestStyle = useContainerLowestStyle("view");

  return (
    <ScreenProvider screenName="gallery">
      <View style={containerLowestStyle}>
        <ScrollView
          style={{
            position: "absolute",
            right: MARGIN_CONTAINER_LOWEST,
            bottom: 0,
            left: 100,
            top: 156 - 24,
          }}
          contentContainerStyle={{ paddingTop: MARGIN_CONTAINER_LOWEST + 24, paddingBottom: MARGIN_CONTAINER_LOWEST }} // MARGIN_CONTAINER_LOWEST
          showsVerticalScrollIndicator={false}
        >
          <ElementCard name={selectedElementName} stats={selectedElementStats} category={selectedCategory} />
        </ScrollView>

        <Animated.View
          style={[styles.overlay, animatedOverlayStyle]}
          pointerEvents={isLeftPannelExpanded ? "auto" : "none"}
        >
          <Pressable style={styles.flex} onPress={handleBackgroundPress} />
        </Animated.View>

        <ScreenPressablesContainer sortNumber={sortNumber} setSortNumber={setSortNumber}>
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryPress={setSelectedCategory}
            isInGalleryScreen={true}
          />
        </ScreenPressablesContainer>

        <Pannel
          isLeftPannelExpanded={isLeftPannelExpanded}
          setIsLeftPannelExpanded={setIsLeftPannelExpanded}
          overlayOpacity={overlayOpacity}
        >
          <ElementsList
            categoryElementsSorted={categoryElementsSorted}
            selectedElementId={selectedElementId}
            isLeftPannelExpanded={isLeftPannelExpanded}
            onElementPickerPress={handleElementPickerPress}
          />
        </Pannel>
      </View>
    </ScreenProvider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  flex: {
    flex: 1,
  },
});

GalleryScreen.displayName = "GalleryScreen";

export default memo(GalleryScreen);
