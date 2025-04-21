import React from "react";
import { Chip } from "react-native-paper";
import { View, Image } from "react-native";

const ElementChip = ({ name, pressed, onPress, source }) => {
  return (
    <Chip
      selected={pressed}
      onPress={onPress}
      style={[styles.chip, pressed && styles.chipSelected]}
      textStyle={styles.chipText}
      avatar={
        <Image source={source} style={styles.image} resizeMode="contain" />
      }
    >
      {name}
    </Chip>
  );
};

const styles = {
  chip: {
    marginHorizontal: 4, // Pour espacer les chips
    backgroundColor: "red",
  },
  chipSelected: {
    backgroundColor: "blue", // Couleur de fond pour un chip sélectionné
  },
  chipDisabled: {
    backgroundColor: "#ccc", // Couleur pour un chip désactivé
  },
  chipText: {
    fontSize: 14,
    color: "white", // Texte visible pour les chips sélectionnés
  },
  image: {
    width: 24, // Largeur de l'image
    height: 24, // Hauteur de l'image
    borderRadius: 0, // Pour éviter les coins arrondis
  },
};

export default ElementChip;
