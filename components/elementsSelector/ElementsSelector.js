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

const iconSize = 38;

const ElementsSelector = ({ orderNumber, situation }) => {
  const th = useTheme();

  console.log("je render elemet", situation);

  const {
    pressableImagesList,
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageByClass,
  } = usePressableImages();

  const elementIcons = [
    elementsAllInfosList[0].image.uri,
    elementsAllInfosList[52].image.uri,
    elementsAllInfosList[93].image.uri,
    elementsAllInfosList[115].image.uri,
    require("../../assets/images/close.png"),
  ];

  const scrollViewRef = useRef(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState("character");

  const sortElements = (selectedCategoryImages, orderNumber) => {
    switch (orderNumber) {
      case 0:
        selectedCategoryImages.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case 1:
        selectedCategoryImages.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 2:
        selectedCategoryImages.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return selectedCategoryImages;
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollTopButton(scrollY > 0); // Affiche le bouton après 100px de scroll
  };

  const scrollToSection = (sectionRef, animated = true) => {
    sectionRef.current?.measureLayout(
      scrollViewRef.current, // Mesurer par rapport à la ScrollView
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: animated });
      },
      (error) => {
        console.error("Erreur de mesure :", error);
      }
    );
  };

  const sectionRefs = Array.from({ length: 5 }, () => useRef(null));

  const content = (selectedCategoryImages) => {
    return (
      <View style={[styles.categoryContainer, { flexDirection: "row" }]}>
        {selectedCategoryImages.map(
          ({ id, name, category, classId, image, pressed }) => (
            <ElementChip
              key={id}
              name={name}
              pressed={pressed}
              onPress={
                situation != "search"
                  ? () => {
                      handlePressImageByClass(classId, category);
                    }
                  : () => {
                      handlePressImage(id, category);
                    }
              }
              uri={image.uri}
            />
          )
        )}
      </View>
    );
  };

  const BodyContent = ({ selectedCategoryImages }) => (
    <View>
      <View style={styles.bodyTypeBookmarksContainer}>
        {bodyTypeNames.map((bodyTypeName, index) => (
          <Pressable
            style={button(th).container}
            onPress={() => scrollToSection(sectionRefs[index])}
            key={bodyTypeName}
          >
            <Text style={button(th).text}>{translate(bodyTypeName)}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.bodyCategoriesContainer}>
        {Object.entries(selectedCategoryImages).map(
          ([subCategoryKey, subCategoryImages], index) => (
            <View key={subCategoryKey} ref={sectionRefs[index]}>
              <Text style={{ flex: 1, backgroundColor: "white" }}>
                {translate(subCategoryKey)}
              </Text>
              {content(subCategoryImages)}
            </View>
          )
        )}
      </View>
    </View>
  );

  // Fonction pour rendre le contenu de l'onglet sélectionné
  const renderContent = () => {
    if (orderNumber != 3) {
      // Filtre les catégories en fonction de l'onglet sélectionné
      let selectedCategoryImages = null;

      if (selectedTab == "body") {
        selectedCategoryImages = {};

        let currentSubCategoryName = "kart";
        let currentSubCategoryList = [];
        pressableImagesList.forEach((element) => {
          const elementCategory = element.category;
          if (bodyTypeNames.includes(elementCategory)) {
            if (elementCategory != currentSubCategoryName) {
              currentSubCategoryList = sortElements(
                currentSubCategoryList,
                orderNumber
              );
              selectedCategoryImages[currentSubCategoryName] =
                currentSubCategoryList;
              currentSubCategoryName = elementCategory;
              currentSubCategoryList = [];
            }
            currentSubCategoryList.push(element);
          }
        });
        currentSubCategoryList = sortElements(
          currentSubCategoryList,
          orderNumber
        );
        selectedCategoryImages[currentSubCategoryName] = currentSubCategoryList;
      } else {
        selectedCategoryImages = pressableImagesList.filter(
          (element) => element.category === selectedTab
        );
        selectedCategoryImages = sortElements(
          selectedCategoryImages,
          orderNumber
        );
      }

      if (selectedTab != "body") {
        return content(selectedCategoryImages);
      } else {
        return <BodyContent selectedCategoryImages={selectedCategoryImages} />;
      }
    } else {
      // OU BIEN RANGEMENT PAR CLASSE
      const selectedCategoryImages = pressableImagesByCategory[selectedTab];
      return (
        <View style={styles.categoryContainer}>
          {Object.entries(selectedCategoryImages).map(
            ([classKey, classElements]) => (
              <View key={classKey} style={[styles.classContainer]}>
                {Object.entries(classElements).map(
                  ([
                    elementKey,
                    { id, name, category, classId, image, pressed },
                  ]) => {
                    return (
                      <ElementChip
                        key={id}
                        name={name}
                        pressed={pressed}
                        onPress={
                          situation != "search"
                            ? () => {
                                handlePressImageByClass(classId, category);
                              }
                            : () => {
                                handlePressImage(id, category);
                              }
                        }
                        uri={image.uri}
                      />
                    );
                  }
                )}
              </View>
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
      {/* Navigation par onglets */}
      <View style={styles.tabContainer} key={"tabContainer"}>
        {category4Names.map((elementName, index) => (
          <Pressable
            key={elementName} // Ajout de la key ici
            style={[
              styles.tab,
              selectedTab === elementName && styles.activeTab,
            ]}
            onPress={() => {
              setSelectedTab(elementName);
              scrollToSection(sectionRefs[4], false);
            }}
          >
            <Image
              source={elementIcons[index]}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={64}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {showScrollTopButton && (
        <Pressable
          style={styles.floatingButton}
          onPress={() => scrollToSection(sectionRefs[4])}
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    paddingVertical: 10,
    justifyContent: "space-between", // Espacement entre les éléments
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "black",
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
  image: {
    width: iconSize,
    height: iconSize,
  },
  bodyCategoriesContainer: {
    backgroundColor: "purple",
    padding: 20,
  },

  categoryContainer: {
    backgroundColor: "green",
    rowGap: 8,
    flexWrap: "wrap",
    padding: 20,
  },
  classContainer: {
    marginVertical: 5,
    backgroundColor: "white",
    flexDirection: "row ",
    flexWrap: "wrap",
    rowGap: 2,
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
