import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
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
    handlePressImage,
    handlePressImageByClass,
  }) => {
    const isGalleryMode = screenName === "gallery";

    const sectionRefs = useRef([]);

    const handleScrollToSection = useCallback(
      (sectionKey) => scrollToSection(sectionRefs.current[sectionKey]),
      [sectionRefs, scrollToSection]
    );

    const handlePress = useMemo(() => {
      return screenName !== "search"
        ? (element) => handlePressImageByClass(screenName, element.classId, element.category)
        : (element) => handlePressImage(screenName, element.id);
    }, [screenName, handlePressImage, handlePressImageByClass]);

    if (orderNumber === 3) {
      return (
        <View style={styles.bodyTypesContainer}>
          {Object.entries(pressableElementsByCategory[selectedTab]).map(([classKey, classElements]) => (
            <ElementsView
              key={classKey}
              elements={classElements}
              handlePress={handlePress}
              isGalleryMode={isGalleryMode}
            />
          ))}
        </View>
      );
    }

    if (selectedTab === "body") {
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
