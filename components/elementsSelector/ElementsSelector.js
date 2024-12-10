import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import MyChip from "./ElementChip";
import {
  elementsImages,
  closeImage,
  allElementNames,
  allElementNamesDisplay,
  elementsAllClassName,
  elementsAllInfosList,
} from "../../data/data";
import { usePressableImages } from "../../utils/usePressableImages";

const iconSize = 38;

const ElementsSelector = ({
  displayCase,
  orderNumber,
  activeSetCard,
  setSetsList,
}) => {
  const {
    pressableImagesList,
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageUnique,
  } = usePressableImages();

  const allElementNamesExtended = [...allElementNames, "empty"];

  const elementIcons = [
    elementsAllInfosList[0].image.uri,
    elementsAllInfosList[52].image.uri,
    elementsAllInfosList[75].image.uri,
    elementsAllInfosList[82].image.uri,
    elementsAllInfosList[87].image.uri,
    elementsAllInfosList[93].image.uri,
    elementsAllInfosList[115].image.uri,
    require("../../assets/images/close.png"),
  ];

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState(
    displayCase ? "empty" : "kart"
  );

  // Fonction pour rendre le contenu de l'onglet sélectionné
  const renderContent = () => {
    if (orderNumber != 3) {
      // Filtre les catégories en fonction de l'onglet sélectionné
      let selectedCategoryImages = pressableImagesList.filter(
        (element) => element.category === selectedTab
      );

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

      return (
        <View style={[styles.categoryContainer]}>
          {selectedCategoryImages.map(
            ({ id, name, category, classId, image, pressed }) => (
              <MyChip
                key={id}
                name={name}
                pressed={pressed}
                onPress={
                  displayCase
                    ? () => {
                        handlePressImageUnique(
                          id,
                          category,
                          activeSetCard,
                          setSetsList
                        );
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
    } else {
      // OU BIEN RANGEMENT PAR CLASSE
      const selectedCategoryImages = pressableImagesByCategory[selectedTab];
      return (
        <View style={styles.categoryContainer}>
          {Object.entries(selectedCategoryImages).map(
            ([classKey, classElements]) => (
              <View
                key={classKey}
                style={[styles.classContainer, { flexDirection: "row" }]}
              >
                {Object.entries(classElements).map(
                  ([
                    elementKey,
                    { id, name, category, classId, image, pressed },
                  ]) => {
                    return (
                      <MyChip
                        key={id}
                        name={name}
                        pressed={pressed}
                        onPress={() => {
                          handlePressImage(id);
                        }}
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
    <View style={styles.outerContainer} key={"outerContainer"}>
      {/* Navigation par onglets */}
      <View style={styles.tabContainer} key={"tabContainer"}>
        {allElementNamesExtended.map((elementName, index) => (
          <Pressable
            key={elementName} // Ajout de la key ici
            style={[
              styles.tab,
              selectedTab === elementName && styles.activeTab,
            ]}
            onPress={() => {
              return setSelectedTab(elementName);
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
      {renderContent()}
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
  categoryContainer: {
    backgroundColor: "green",
    rowGap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  classContainer: {
    marginVertical: 5,
    backgroundColor: "white",
    flexWrap: "wrap",
    rowGap: 2,
  },
});

export default ElementsSelector;
