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

const FilterSelector = ({
  chosenBodyType,
  setChosenBodyType,
  pressableImages,
  handlePressImageCompleted,
  toggleCheck,
}) => {
  return (
    <ScrollView style={modal.content}>
      <View
        style={{
          paddingHorizontal: 48,
          borderColor: "black",
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}
      >
        <Text>Salut</Text>
        <Text>Salut</Text>
        <Text>Salut</Text>
        <Text>Salut</Text>
        <Text>Salut</Text>
        {chosenBodyType.map((bodyType) => (
          <Pressable
            onPress={() => toggleCheck(setChosenBodyType, bodyType.name)}
            key={bodyType.name}
            style={checkbox.container}
          >
            <Checkbox value={bodyType.checked} style={checkbox.square} />
            <Text style={checkbox.text}>{bodyType.nameDisplay}</Text>
          </Pressable>
        ))}
      </View>

      {/* Category selector row */}
      <View style={styles.elementsImagesDeselector}>
        <ElementsImagesDeselector
          pressableImages={pressableImages}
          handlePressImage={handlePressImageCompleted}
          displayCase={false}
        />
      </View>

      {/* Subcategory selector */}
      <ElementsImagesSelector
        pressableImages={pressableImages}
        handlePressImage={handlePressImageCompleted}
        displayCase={false}
      />
    </ScrollView>
  );
};

export default FilterSelector;

styles = StyleSheet.create({
  elementsImagesDeselector: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "red",
  },
});
