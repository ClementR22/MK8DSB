import React from "react";
import { View, StyleSheet } from "react-native";
import { usePressableImages } from "../../utils/usePressableImages";
import MyChip from "./ElementChip";

const ElementsDeselector = () => {
  const { pressableImagesList, handlePressImage } = usePressableImages();
  return (
    <View
      style={{
        backgroundColor: "green",
        rowGap: 8,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {pressableImagesList
        .filter((element) => element.pressed)
        .map(({ id, name, category, classId, image, pressed }) => (
          <MyChip
            name={name}
            pressed={pressed}
            onPress={() => handlePressImage(id)}
            uri={image.uri}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Permet le retour à la ligne
    backgroundColor: "blue",
  },
  pressableImages: {
    marginVertical: 10,
  },
});

export default ElementsDeselector;
