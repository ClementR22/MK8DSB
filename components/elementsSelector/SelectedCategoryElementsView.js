import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ElementImage from "./ElementImage";
import { bodyTypeNames } from "@/data/data";
import { button } from "../styles/button";
import { useTheme } from "@/contexts/ThemeContext";
import { translate, translateToLanguage } from "@/translations/translations";
import ElementChip from "./ElementChip";
import { usePressableImages } from "@/contexts/PressableImagesContext";
import { useOrderNumber } from "@/contexts/OrderNumberContext";
import { useScreen } from "../../contexts/ScreenContext";
import { useLanguage } from "@/contexts/LanguageContext";
import useModalsStore from "@/stores/useModalsStore";

const SelectedCategoryElementsView_ = ({
  selectedTab,
  scrollToSectionWithScrollViewRef,
  sectionRefs,
  galleryCase = false,
}) => {
  const screenNameForEditModal = useModalsStore((state) => state.screenNameForEditModal);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const { orderNumber } = useOrderNumber();

  const { pressableImagesByCategory, handlePressImage, handlePressImageByClass } = usePressableImages();

  const handlePress =
    screenNameForEditModal != "search"
      ? (element) => {
          handlePressImageByClass(element.classId, element.category);
        }
      : (element) => {
          handlePressImage(element.id);
        };

  const ElementsView = ({ elements }) => {
    return (
      <View style={[styles.categoryContainer, { flexDirection: "row" }]}>
        {elements.map((element) => {
          const { id, name, image, pressed } = element;
          return !galleryCase ? (
            <ElementChip key={id} name={name} pressed={pressed} onPress={() => handlePress(element)} source={image} />
          ) : (
            <ElementImage key={id} name={name} source={image} />
          );
        })}
      </View>
    );
  };

  const BodyTabContent = ({ bodyElementsByBodyType }) => (
    <View>
      <View style={styles.bodyTypeBookmarksContainer}>
        {bodyTypeNames.map((bodyTypeName, index) => (
          <Pressable
            style={button(theme).container}
            onPress={() => scrollToSectionWithScrollViewRef(sectionRefs.current[index])}
            key={bodyTypeName}
          >
            <Text style={button(theme).text}>{translate(bodyTypeName)}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.bodiesContainer}>
        {Object.entries(bodyElementsByBodyType).map(([subCategoryKey, subCategoryElements], index) => (
          <View key={subCategoryKey} ref={sectionRefs.current[index]}>
            <Text style={{ flex: 1, backgroundColor: "white" }}>{translate(subCategoryKey)}</Text>
            <ElementsView elements={subCategoryElements} />
          </View>
        ))}
      </View>
    </View>
  );

  const fusionClassLists = (classLists) => {
    return Object.values(classLists).flat();
  };

  const getSelectedCategoryElements = () => {
    return fusionClassLists(pressableImagesByCategory[selectedTab]);
  };
  const sortElements = (selectedCategoryElements, orderNumber) => {
    switch (orderNumber) {
      case 0:
        selectedCategoryElements.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case 1:
        selectedCategoryElements.sort((a, b) =>
          translateToLanguage(a.name, language).localeCompare(translateToLanguage(b.name, language))
        );
        break;
      case 2:
        selectedCategoryElements.sort((a, b) =>
          translateToLanguage(b.name, language).localeCompare(translateToLanguage(a.name, language))
        );
        break;
    }
    return selectedCategoryElements;
  };

  const groupByBodyType = (list) => {
    return list.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  if (orderNumber != 3) {
    const selectedCategoryElements = getSelectedCategoryElements();

    const memoizedSortedElements = useMemo(() => {
      return sortElements(selectedCategoryElements, orderNumber);
    }, [orderNumber, selectedTab]);

    const selectedCategoryElementsSorted = galleryCase
      ? memoizedSortedElements
      : sortElements(selectedCategoryElements, orderNumber);

    if (selectedTab != "body") {
      return <ElementsView elements={selectedCategoryElementsSorted} />;
    } else {
      const bodyElementsByBodyType = groupByBodyType(selectedCategoryElementsSorted);
      return <BodyTabContent bodyElementsByBodyType={bodyElementsByBodyType} />;
    }
  } else {
    // OU BIEN RANGEMENT PAR CLASSE
    const selectedCategoryElements = pressableImagesByCategory[selectedTab]; // deja trié par classe dans pressableImagesByCategory
    return (
      <View style={styles.bodyTypesContainer}>
        {Object.entries(selectedCategoryElements).map(([classKey, classElements]) => (
          <ElementsView key={classKey} elements={classElements} />
        ))}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "green",
    rowGap: 8,
    flexWrap: "wrap",
    padding: 20,
  },
  bodyTypeBookmarksContainer: {
    flexDirection: "row",
    gap: 10,
  },
  bodiesContainer: {
    backgroundColor: "purple",
    padding: 20,
  },
  bodyTypesContainer: {
    marginVertical: 5,
    backgroundColor: "yellow",
    padding: 10,
  },
});

SelectedCategoryElementsView_.displayName = "SelectedCategoryElementsView"; // Ajout du displayName

const SelectedCategoryElementsView = React.memo(SelectedCategoryElementsView_);

export default SelectedCategoryElementsView;
