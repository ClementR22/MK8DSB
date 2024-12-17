import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { modal } from "../styles/modal";
import { button } from "../styles/button";
import checkbox from "../styles/checkbox";
import th from "../styles/theme";
import PressableStat from "../PressableStat";
import ElementsDeselector from "../elementsSelector/ElementsDeselector";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import ElementChip from "../elementsSelector/ElementChip";
import { elementsAllInfosList } from "@/data/data";
import { useTheme } from "../styles/theme";
import { translate } from "../../i18n/translations";

const FilterSelector = ({
  chosenBodyType,
  setChosenBodyType,
  toggleCheck,
  orderNumber,
}) => {
  const th = useTheme();
  const bodyTypeIcons = [
    elementsAllInfosList[52],
    elementsAllInfosList[75],
    elementsAllInfosList[82],
    elementsAllInfosList[87],
  ];

  const scrollViewRef = useRef(null);

  return (
    <ScrollView style={modal(th).content} ref={scrollViewRef}>
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

      <ElementsDeselector />

      <ElementsSelector
        displayCase={false}
        orderNumber={orderNumber}
        scrollViewRef={scrollViewRef}
      />
    </ScrollView>
  );
};

export default FilterSelector;

styles = StyleSheet.create({
  bodyTypeContainer: {
    paddingVertical: 20,
    paddingHorizontal: 6,
    backgroundColor: "purple",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
