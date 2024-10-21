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
import {
  elementsImages,
  closeImage,
  allElementNames,
  allElementNamesDisplay,
} from "../data/data";

const iconSize = 38;

const ElementsImagesSelector = ({
  pressableImages,
  handlePressImage,
  displayCase,
}) => {
  let elementIcons = [
    elementsImages.character[9].image1,
    elementsImages.kart[0].image1,
    elementsImages.bike[11].image2,
    elementsImages.sportBike[7].image2,
    elementsImages.ATV[6].image3,
    elementsImages.wheels[0].image1,
    elementsImages.glider[0].image1,
  ];

  let allElementNamesIntern = allElementNames;

  if (displayCase) {
    elementIcons = elementIcons.concat(closeImage); //elementIcons.concat(images.glider[0].image2);
    allElementNamesIntern = allElementNames.concat("empty");
  }

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState(
    displayCase ? "empty" : "kart"
  );

  // Fonction pour rendre le contenu de l'onglet sélectionné
  const renderContent = () => {
    // Filtre les catégories en fonction de l'onglet sélectionné
    const filteredImages = Object.entries(pressableImages).filter(([key]) => {
      return key === selectedTab;
    });

    return filteredImages.map(([categoryKey, categoryValue]) => (
      <View key={"content-"+ categoryKey} style={[styles.categoryContainer, {maxHeight: 300, overflow: "scroll"}]}>
        <Text style={styles.text}>{allElementNamesDisplay[categoryKey]}</Text>
        {Object.entries(categoryValue).map(([classKey, classValue]) => (
          <View key={"classKey" + classKey} style={styles.classContainer}>
            {Object.entries(classValue).map(
              ([imageKey, { source, pressed }], imgIndex) => (
                <View
                  key={`${categoryKey}-${classKey}-${imageKey}-${imgIndex}`}
                >
                  <PressableImage
                    imageKey={`${categoryKey}-${classKey}-${imageKey}-${imgIndex}`}
                    source={source}
                    pressed={pressed}
                    setPressableImage={() =>
                      handlePressImage(categoryKey, classKey, imageKey)
                    }
                    disabled={false}
                  />
                </View>
              )
            )}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.outerContainer} key={"outerContainer"}>
      {/* Navigation par onglets */}
      <View style={styles.tabContainer} key={"tabContainer"}>
        {allElementNamesIntern.map((elementName, index) => (
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
            {/* <Text style={styles.tabText}>{elementIcon}</Text> */}
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
  categoryContainer: {
    alignItems: "center",
    backgroundColor: "red",
  },
  classContainer: {
    flexDirection: "row",
    marginVertical: 3,
    backgroundColor: "green",
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
});

export default ElementsImagesSelector;
