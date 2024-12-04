import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { imageSize } from "./PressableImage";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import checkbox from "./styles/checkbox";
import th from "./styles/theme";
import PressableStat from "./PressableStat";
import ElementsImagesDeselector from "./ElementsImagesDeselector";
import ElementsImagesSelector from "./ElementsImagesSelector";
import MyChip from "./MyChip";
import { elementsAllInfosList } from "@/data/data";
import { useTheme } from "./styles/theme";

const ElementsFilterSelector = ({
  chosenBodyType,
  setChosenBodyType,
  toggleCheck,
}) => {
  const th = useTheme();
  const bodyTypeIcons = [
    elementsAllInfosList[52],
    elementsAllInfosList[75],
    elementsAllInfosList[82],
    elementsAllInfosList[87],
  ];

  return (
    <ScrollView style={modal(th).content}>
      <View key="body type" style={styles.bodyTypeContainer}>
        {chosenBodyType.map((bodyType, index) => {
          return (
            <MyChip
              key={index}
              name={bodyType.name}
              pressed={bodyType.checked}
              onPress={() => {
                toggleCheck(setChosenBodyType, bodyType.name);
              }}
              uri={bodyTypeIcons[index].image.uri}
            />
          );
        })}
      </View>
      <ElementsImagesSelector displayCase={false} />

      {/* Category selector row */}
      {/* <View style={styles.elementsImagesDeselector}>
        <ElementsImagesDeselector
          pressableImages={pressableImages}
          handlePressImage={handlePressImageCompleted}
          displayCase={false}
        />
      </View> */}

      {/* Subcategory selector */}
      {/* <ElementsImagesSelector
        pressableImages={pressableImages}
        handlePressImage={handlePressImageCompleted}
        displayCase={false}
      /> */}
    </ScrollView>
  );
};

export default ElementsFilterSelector;

styles = StyleSheet.create({
  elementsImagesDeselector: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "red",
  },
  bodyTypeContainer: {
    paddingVertical: 20,
    paddingHorizontal: 6,
    backgroundColor: "purple",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
