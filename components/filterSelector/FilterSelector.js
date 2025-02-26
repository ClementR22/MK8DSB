import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import ElementChip from "../elementsSelector/ElementChip";
import { elementsAllInfosList } from "@/data/data";
import { useTheme } from "../../utils/ThemeContext";
import { translate } from "../../i18n/translations";
import { toggleCheck } from "../../utils/toggleCheck";

const FilterSelector = ({ chosenBodyType, setChosenBodyType, orderNumber }) => {
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
              toggleCheck(setChosenBodyType, bodyType.name);
            }}
            uri={bodyTypeIcons[index].image.uri}
          />
        );
      })}
    </View>
  );
};

export default FilterSelector;

const styles = StyleSheet.create({
  bodyTypeContainer: {
    paddingVertical: 20,
    paddingHorizontal: 6,
    backgroundColor: "purple",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
