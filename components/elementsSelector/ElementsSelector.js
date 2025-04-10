import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import ElementChip from "./ElementChip";
import {
  elementsImages,
  closeImage,
  category4Names,
  elementsAllClassName,
  elementsAllInfosList,
  bodyTypeNames,
} from "../../data/data";
import { usePressableImages } from "../../utils/PressableImagesContext";
import { translate } from "../../i18n/translations";
import { button } from "../styles/button";
import { useTheme } from "../../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { useSetsList } from "../../utils/SetsListContext";
import { useOrderNumber } from "../../utils/OrderNumberContext";
import MultiStateToggleButton from "../MultiStateToggleButton";
import CategorySelector from "./CategorySelector";
import ElementImage from "./ElementImage";
import { scrollToSection } from "../../utils/scrollToSection";

const ElementsSelector = ({ situation, galeryCase = false }) => {
  const th = useTheme();

  const {
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageByClass,
  } = usePressableImages();

  const { orderNumber, setOrderNumber } = useOrderNumber();

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState("character");

  const sortElements = (selectedCategoryElements, orderNumber) => {
    switch (orderNumber) {
      case 0:
        selectedCategoryElements.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case 1:
        selectedCategoryElements.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 2:
        selectedCategoryElements.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return selectedCategoryElements;
  };

  const scrollViewRef = useRef(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollTopButton(scrollY > 0); // Affiche le bouton après 100px de scroll
  };

  const sectionRefs = Array.from({ length: 5 }, () => useRef(null));

  const fusionClassLists = (classLists) => {
    return Object.values(classLists).flat();
  };

  const getSelectedCategoryElements = () => {
    return fusionClassLists(pressableImagesByCategory[selectedTab]);
  };

  const getSelectedCategoryElementsSorted = () => {
    const selectedCategoryElements = getSelectedCategoryElements();
    const selectedCategoryElementsSorted = sortElements(
      selectedCategoryElements,
      orderNumber
    );

    return selectedCategoryElementsSorted;
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

  const ElementsView = ({ elements }) => {
    return (
      <View style={[styles.categoryContainer, { flexDirection: "row" }]}>
        {elements.map(({ id, name, category, classId, image, pressed }) =>
          !galeryCase ? (
            <ElementChip
              key={id}
              name={name}
              pressed={pressed}
              onPress={
                situation != "search"
                  ? () => {
                      handlePressImageByClass(classId, category, situation);
                    }
                  : () => {
                      handlePressImage(id);
                    }
              }
              source={image}
            />
          ) : (
            <ElementImage key={id} name={name} source={image} />
          )
        )}
      </View>
    );
  };

  const BodyTabContent = ({ bodyElementsByBodyType }) => (
    <View>
      <View style={styles.bodyTypeBookmarksContainer}>
        {bodyTypeNames.map((bodyTypeName, index) => (
          <Pressable
            style={button(th).container}
            onPress={() => scrollToSection(scrollViewRef, sectionRefs[index])}
            key={bodyTypeName}
          >
            <Text style={button(th).text}>{translate(bodyTypeName)}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.bodiesContainer}>
        {Object.entries(bodyElementsByBodyType).map(
          ([subCategoryKey, subCategoryElements], index) => (
            <View key={subCategoryKey} ref={sectionRefs[index]}>
              <Text style={{ flex: 1, backgroundColor: "white" }}>
                {translate(subCategoryKey)}
              </Text>
              <ElementsView elements={subCategoryElements} />
            </View>
          )
        )}
      </View>
    </View>
  );

  // Fonction pour rendre le contenu de l'onglet sélectionné
  const SelectedCategoryElementsView = () => {
    if (orderNumber != 3) {
      const selectedCategoryElementsSorted =
        getSelectedCategoryElementsSorted();
      if (selectedTab != "body") {
        return <ElementsView elements={selectedCategoryElementsSorted} />;
      } else {
        const bodyElementsByBodyType = groupByBodyType(
          selectedCategoryElementsSorted
        );
        return (
          <BodyTabContent bodyElementsByBodyType={bodyElementsByBodyType} />
        );
      }
    } else {
      // OU BIEN RANGEMENT PAR CLASSE
      const selectedCategoryElements = pressableImagesByCategory[selectedTab]; // deja trié par classe dans pressableImagesByCategory
      return (
        <View style={styles.bodyTypesContainer}>
          {Object.entries(selectedCategoryElements).map(
            ([classKey, classElements]) => (
              <ElementsView key={classKey} elements={classElements} />
            )
          )}
        </View>
      );
    }
  };

  return (
    <View
      style={styles.outerContainer}
      key={"outerContainer"}
      ref={sectionRefs[4]}
    >
      <MultiStateToggleButton number={orderNumber} setNumber={setOrderNumber} />
      {/* Navigation par onglets */}

      <CategorySelector
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        scrollViewRef={scrollViewRef}
        sectionRefs={sectionRefs}
      />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={64}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SelectedCategoryElementsView />
      </ScrollView>

      {showScrollTopButton && (
        <Pressable
          style={styles.floatingButton}
          onPress={() => scrollToSection(scrollViewRef, sectionRefs[4])}
        >
          <MaterialCommunityIcons
            name="chevron-up"
            size={24}
            color={th.on_primary}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "blue",
    padding: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bodiesContainer: {
    backgroundColor: "purple",
    padding: 20,
  },

  categoryContainer: {
    backgroundColor: "green",
    rowGap: 8,
    flexWrap: "wrap",
    padding: 20,
  },
  bodyTypesContainer: {
    marginVertical: 5,
    backgroundColor: "yellow",
    padding: 10,
  },
  bodyTypeBookmarksContainer: {
    flexDirection: "row",
    gap: 10,
  },

  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    borderRadius: 50,
    elevation: 5, // Pour l'effet d'ombre sur Android
  },
});

export default ElementsSelector;
