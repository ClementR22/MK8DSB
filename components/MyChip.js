import React from "react";
import { Chip } from "react-native-paper";
import { View, Image } from "react-native";
import { translate } from "../i18n/translations";

const MyChip = ({ name, pressed, onPress, uri }) => {
  return (
    <View>
      <Chip
        selected={pressed}
        onPress={onPress}
        style={[styles.chip, pressed && styles.chipSelected]}
        textStyle={styles.chipText}
        avatar={<Image source={uri} style={styles.image} />}
      >
        {translate(name)}
      </Chip>
    </View>
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
    resizeMode: "contain",
  },
};

export default MyChip;
