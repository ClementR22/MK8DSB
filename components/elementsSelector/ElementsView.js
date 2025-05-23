import React from "react";
import { StyleSheet, View } from "react-native";
import ElementChip from "./ElementChip";
import ElementImage from "./ElementImage";

const ElementsView = ({ elements, handlePress, isGalleryMode }) => {
  return (
    <View style={[styles.categoryContainer]}>
      {elements.map((element) => {
        const { id, name, image, pressed } = element;
        return !isGalleryMode ? (
          <ElementChip key={id} name={name} pressed={pressed} onPress={() => handlePress(element)} source={image} />
        ) : (
          <ElementImage key={id} name={name} source={image} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "green",
    rowGap: 8,
    flexWrap: "wrap",
    padding: 20,
    flexDirection: "row",
  },
});

export default React.memo(ElementsView);
