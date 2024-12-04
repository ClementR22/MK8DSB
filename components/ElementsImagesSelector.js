import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import PressableImage from "./PressableImage";
import MyChip from "./MyChip";
import {
  elementsImages,
  closeImage,
  allElementNames,
  allElementNamesDisplay,
  elementsAllClassName,
  elementsAllInfosList,
} from "../data/data";
import { usePressableImages } from "../utils/usePressableImages";

const iconSize = 38;

const ElementsImagesSelector = ({ displayCase }) => {
  const {
    pressableImagesList,
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageUnique,
  } = usePressableImages();

  const elementIcons = [
    elementsAllInfosList[0].image.uri,
    elementsAllInfosList[52].image.uri,
    elementsAllInfosList[75].image.uri,
    elementsAllInfosList[82].image.uri,
    elementsAllInfosList[87].image.uri,
    elementsAllInfosList[93].image.uri,
    elementsAllInfosList[115].image.uri,
  ];

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState(
    displayCase ? "empty" : "kart"
  );

  // Fonction pour rendre le contenu de l'onglet sélectionné
  const renderContent = () => {
    // Filtre les catégories en fonction de l'onglet sélectionné
    const selectedCategoryImages = pressableImagesList.filter(
      (element) => element.category === selectedTab
    );

    return (
      <View style={styles.categoryContainer}>
        {selectedCategoryImages.map(
          ({ id, name, category, classId, image, pressed }) => (
            <MyChip
              key={id}
              name={name}
              pressed={pressed}
              onPress={() => {
                handlePressImage(id);
              }}
              uri={image.uri}
            />
          )
        )}

        {/*  OU BIEN RANGEMENT PAR CLASSE
        
        {selectedCategoryImages.map(([categoryKey, categoryValue]) =>
          Object.entries(categoryValue).map(([classKey, classImages]) => (
            <ScrollView
              key={classKey}
              horizontal={true}
              contentContainerStyle={styles.classContainerScrollable}
              style={styles.classContainer}
            >
              {Object.entries(classImages).map(
                ([elementKey, { name, uri, pressed }]) => {
                  return (
                    <MyChip
                      key={`${classKey}-${elementKey}`}
                      name={name}
                      selected={pressed}
                      onPress={() => {
                        handleChipPress(categoryKey, classKey, elementKey);
                      }}
                      uri={uri}
                    />
                  );
                }
              )}
            </ScrollView>
          ))
        )} */}
      </View>
    );
  };

  return (
    <View style={styles.outerContainer} key={"outerContainer"}>
      {/* Navigation par onglets */}
      <View style={styles.tabContainer} key={"tabContainer"}>
        {allElementNames.map((elementName, index) => (
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
  classContainer: {
    flexDirection: "row",
    marginVertical: 3,
    backgroundColor: "white",
    //flexWrap: "wrap",
    overflow: "hidden",
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
    // RANGEMENT PAR CLASSE : width: "100%",
    // SINON :
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ElementsImagesSelector;
