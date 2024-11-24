import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import StatFilterSelector from "./StatFilterSelector";

import th, { vw } from "./styles/theme";

const StatSlider = ({
  name,
  sliderValue,
  setSliderValue,
  statFilterNumber,
  setStatFilterNumber,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="middle"
            style={styles.textLeft}
          >
            {name}
          </Text>
          <Text style={styles.textRight}>: {sliderValue}</Text>
        </View>
        <StatFilterSelector
          statFilterNumber={statFilterNumber}
          setStatFilterNumber={setStatFilterNumber}
        />
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.sliderContainer}>
          <Slider
            value={sliderValue}
            onValueChange={([value]) => setSliderValue(value)}
            minimumValue={0}
            maximumValue={6}
            step={0.25}
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
            thumbTouchSize={{ width: 10, height: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: th.surface,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: th.outline_variant,
    marginBottom: 6,
    width: 0.9 * vw, // Largeur maximale de 90% de la largeur de l'écran
  },
  containerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 3,
  },
  textContainer: {
    flexDirection: "row", // Aligne les deux textes sur une ligne
    flex: 1, // Prend toute la largeur disponible
  },
  textLeft: {
    color: th.on_surface,
    fontSize: 22,
    marginLeft: 6,
    flexShrink: 1, // Permet de réduire la largeur du texte si nécessaire
    maxWidth: "70%", // Largeur maximale pour le texte de gauche
    overflow: "hidden", // Cache l'excédent du texte
  },
  textRight: {
    color: th.on_surface,
    fontSize: 22,
    flexShrink: 0, // Le texte de droite ne rétrécit pas
  },
  containerBottom: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sliderContainer: {
    height: 20,
    alignItems: "stretch",
    justifyContent: "center",
  },
  thumb: {
    width: 4,
    height: 30,
    borderRadius: 10,
    backgroundColor: th.primary,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: th.secondary_container,
  },
});

export default StatSlider;
