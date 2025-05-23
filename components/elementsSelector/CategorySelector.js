import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { category4Names, elementsAllInfosList } from "../../data/data";
import closeImage from "../../assets/images/close.png";

const iconSize = 38;

const CategorySelector = ({ selectedTab, setSelectedTab, scrollToTop }) => {
  const elementIcons = [
    elementsAllInfosList[0].image,
    elementsAllInfosList[52].image,
    elementsAllInfosList[93].image,
    elementsAllInfosList[115].image,
    closeImage,
  ];

  return (
    <View style={styles.tabContainer} key="tabContainer">
      {category4Names.map((elementName, index) => (
        <Pressable
          key={elementName}
          style={[styles.tab, selectedTab === elementName && styles.activeTab]}
          onPress={() => {
            setSelectedTab(elementName);
            scrollToTop();
          }}
        >
          <Image source={elementIcons[index]} style={styles.image} resizeMode="contain" />
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
