import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ElementChip from "./ElementChip";
import { elementsAllInfosList } from "@/data/data";
import { useTheme } from "../../utils/ThemeContext";
import { translate } from "../../i18n/translations";
import { toggleCheckList } from "../../utils/toggleCheck";

const BodyTypeSelector = ({ chosenBodyType, setChosenBodyType }) => {
  const th = useTheme();
  const bodyTypeIcons = [
    elementsAllInfosList[52],
    elementsAllInfosList[75],
    elementsAllInfosList[82],
    elementsAllInfosList[87],
  ];

  return (
    <View key="body type" style={styles.bodyTypeContainer}>
      {chosenBodyType.map((bodyType, index) => {
        return (
          <ElementChip
            key={index}
            name={translate(bodyType.name)}
            pressed={bodyType.checked}
            onPress={() => {
              toggleCheckList(setChosenBodyType, bodyType.name);
            }}
            source={bodyTypeIcons[index].image}
          />
        );
      })}
    </View>
  );
};

export default BodyTypeSelector;

const styles = StyleSheet.create({
  bodyTypeContainer: {
    paddingVertical: 20,
    paddingHorizontal: 6,
    backgroundColor: "purple",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
