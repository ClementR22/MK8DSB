import React from "react";
import { Chip } from "react-native-paper";
import { Image, Pressable } from "react-native";
import { translate } from "@/translations/translations";
import { Text } from "react-native";

const ElementChip = ({ name, pressed, onPress, source }) => {
  return (
    <Pressable onPress={onPress} style={[styles.chip, pressed && styles.chipSelected]}>
      <Image source={source} style={styles.image} resizeMode="contain" />
      <Text style={styles.chipText}> {translate(name)}</Text>
    </Pressable>
  );
};

const styles = {
  chip: {
    marginHorizontal: 4, // Peut être remplacé par columnGap sur le conteneur si vous préférez
    backgroundColor: "red",
  },
  chipSelected: {
    backgroundColor: "blue",
  },
  chipDisabled: {
    backgroundColor: "#ccc",
  },
  chipText: {
    fontSize: 14,
    color: "white",
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 0,
  },
};

export default React.memo(ElementChip);
