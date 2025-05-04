import React from "react";
import { View } from "react-native";
import { usePressableImages } from "@/contexts/PressableImagesContext";
import ElementChip from "./ElementChip";

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
        .map(({ id, name, image, pressed }) => (
          <ElementChip
            key={id}
            name={name}
            pressed={pressed}
            onPress={() => handlePressImage(id)}
            source={image}
          />
        ))}
    </View>
  );
};

export default ElementsDeselector;
