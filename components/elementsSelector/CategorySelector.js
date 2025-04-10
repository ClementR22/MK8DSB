import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import {
  elementsImages,
  closeImage,
  category4Names,
  elementsAllClassName,
  elementsAllInfosList,
  bodyTypeNames,
} from "../../data/data";
import { scrollToSection } from "../../utils/scrollToSection";

const iconSize = 38;

const CategorySelector = ({
  selectedTab,
  setSelectedTab,
  scrollViewRef,
  sectionRefs,
}) => {
  const elementIcons = [
    elementsAllInfosList[0].image,
    elementsAllInfosList[52].image,
    elementsAllInfosList[93].image,
    elementsAllInfosList[115].image,
    require("../../assets/images/close.png"),
  ];

  return (
    <View style={styles.tabContainer} key={"tabContainer"}>
      {category4Names.map((elementName, index) => (
        <Pressable
          key={elementName}
          style={[styles.tab, selectedTab === elementName && styles.activeTab]}
          onPress={() => {
            setSelectedTab(elementName);
            scrollToSection(scrollViewRef, sectionRefs[4], false);
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
  );
};

const styles = StyleSheet.create({
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
  image: {
    width: iconSize,
    height: iconSize,
  },
});

export default CategorySelector;
