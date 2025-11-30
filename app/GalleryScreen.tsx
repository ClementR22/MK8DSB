import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import CategorySelector from "@/components/rowSelector/CategorySelector";
import { Category, ElementData } from "@/types";
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
import { useTranslation } from "react-i18next";
import { useGameData } from "@/hooks/useGameData";
import { elementsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";

const GalleryScreen = () => {
  const game = useGameStore((state) => state.game);

  const { elementsDataByCategory, statNames, classesStatsByCategory } = useGameData();
  const { t } = useTranslation(elementsNamespaceByGame[game]);

  const [selectedElementId, setSelectedElementId] = useState(0);
  const [isLeftPannelExpanded, setIsLeftPannelExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);

  const { categoryElementsSorted, classesStats } = useMemo(() => {
    const categoryElementsSorted: ElementData[] = sortElements<ElementData>(
      elementsDataByCategory[selectedCategory],
      sortNumber,
      t
    );
    const classesStats: Map<number, number[]> = classesStatsByCategory[selectedCategory];
    return { categoryElementsSorted, classesStats };
  }, [selectedCategory, sortNumber, t, classesStatsByCategory, sortElements]);
  // dépendances : toutes

  const overlayOpacity = useSharedValue(isLeftPannelExpanded ? 0.5 : 0);

  const elementCard = useMemo(() => {
    const { selectedElementName, selectedElementStats } = getSelectedElementData(
      categoryElementsSorted,
      selectedElementId,
      classesStats,
      statNames
    );
    return <ElementCard name={selectedElementName} stats={selectedElementStats} category={selectedCategory} />;
  }, [selectedElementId, statNames]);
  // dépendances :
  // selectedElementId car ElementCard doit correspondre à selectedElementId
  // statNames pour réagir au changement de jeu

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
          {elementCard}
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
