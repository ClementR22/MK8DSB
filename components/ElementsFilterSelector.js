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
import handlePressImage from "../utils/pressableImagesFunctions";
import { Chip } from "react-native-paper";

const ElementsFilterSelector = ({
  chosenBodyType,
  setChosenBodyType,
  pressableImages,
  toggleCheck,
}) => {
  return (
    <ScrollView style={[modal.content, { backgroundColor: "red" }]}>
      <View
        style={{
          paddingHorizontal: 48,
          borderColor: "black",
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}
      >
        {chosenBodyType.map((bodyType) => {
          return (
            <Chip
              key={[bodyType.name, bodyType.checked]} // bodyType.checked a été ajouté dans la key pour forcer le chip à re-render
              onPress={() => {
                toggleCheck(setChosenBodyType, bodyType.name); // Basculer la sélection
              }}
              style={[
                styles.chip,
                { backgroundColor: bodyType.checked ? "green" : "red" }, // Changer la couleur
              ]}
            >
              {bodyType.nameDisplay} {/* Afficher le nom plus lisible */}
            </Chip>
          );
        })}
      </View>

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
});
