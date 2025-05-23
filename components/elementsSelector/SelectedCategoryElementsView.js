import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import useModalsStore from "@/stores/useModalsStore";
import ElementsView from "./ElementsView";
import BodyTabContent from "./BodyTabContent";

const groupByBodyType = (list) => {
  return list.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};

const SelectedCategoryElementsView = React.memo(
  ({
    selectedTab,
    orderNumber,
    pressableElementsByCategory,
    selectedCategoryElementsSorted,
    screenName,
    scrollToSection,
  }) => {
    const screenNameForEditModal = useModalsStore((state) => state.screenNameForEditModal);
    const isGalleryMode = screenNameForEditModal === "gallery";
    const handlePressImage = usePressableElementsStore((state) => state.handlePressImage);
    const handlePressImageByClass = usePressableElementsStore((state) => state.handlePressImageByClass);

    const sectionRefs = useRef([]);

    const handleScrollToSection = useCallback(
      (sectionKey) => scrollToSection(sectionRefs.current[sectionKey]),
      [sectionRefs]
    );

    const handlePress = useMemo(() => {
      return screenName !== "search"
        ? (element) => handlePressImageByClass(screenName, element.classId, element.category)
        : (element) => handlePressImage(screenName, element.id);
    }, [screenName, handlePressImage, handlePressImageByClass]);

    if (orderNumber === 3) {
      // si on est en tri par class
      return (
        <View style={styles.bodyTypesContainer}>
          {Object.entries(pressableElementsByCategory[selectedTab]).map(([classKey, classElements]) => (
            <ElementsView key={classKey} elements={classElements} isGalleryMode={isGalleryMode} />
          ))}
        </View>
      );
    }

    // sinon, pour les autres tris
    if (selectedTab === "body") {
      // si on est dans l'onglet body
      const bodyElementsByBodyType = groupByBodyType(selectedCategoryElementsSorted);
      return (
        <BodyTabContent
          bodyElementsByBodyType={bodyElementsByBodyType}
          handlePress={handlePress}
          isGalleryMode={isGalleryMode}
          sectionRefs={sectionRefs}
          handleScrollToSection={handleScrollToSection}
        />
      );
    }

    // sinon, dans les autres onglets
    return (
      <ElementsView elements={selectedCategoryElementsSorted} handlePress={handlePress} isGalleryMode={isGalleryMode} />
    );
  }
);

const styles = StyleSheet.create({
  bodyTypesContainer: {
    marginVertical: 5,
    backgroundColor: "yellow",
    padding: 10,
  },
});

export default SelectedCategoryElementsView;
