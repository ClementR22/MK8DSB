import React from "react";
import { View, StyleSheet } from "react-native";

const StatSliderResult = ({ chosenValue, foundValue, isChosen }) => {
  if (!isChosen) {
    chosenValue = foundValue;
  }

  const bonusFound = foundValue - chosenValue;

  const getFlexForSegment = (baseValue, bonus) => {
    const flexValue = bonus >= 0 ? baseValue : baseValue + bonus;
    return Math.max(flexValue, 0); // Assurer que la flexbox ne soit jamais négative
  };

  const getBackgroundColor = () => {
    return bonusFound > 0 ? "blue" : bonusFound < 0 ? "red" : "black";
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderTrack}>
        {/* Segment noir fixe à gauche */}
        <View
          style={[
            styles.trackSegment,
            {
              backgroundColor: "black",
              flex: getFlexForSegment(chosenValue, bonusFound),
            },
          ]}
        />

        {/* Si bonusFound est négatif, afficher le jaune avant le bleu/rouge */}
        {bonusFound < 0 && (
          <View
            style={[
              styles.trackSegment,
              {
                width: 10,
                borderWidth: 3,
                backgroundColor: getBackgroundColor(),
                borderColor: "yellow",
              },
            ]}
          />
        )}

        {/* Segment bleu ou rouge */}
        <View
          style={[
            styles.trackSegment,
            {
              backgroundColor: getBackgroundColor(),
              flex: Math.abs(bonusFound),
            },
          ]}
        />

        {/* Si bonusFound est positif, afficher le jaune après le bleu/rouge */}
        {bonusFound >= 0 && (
          <View
            style={[
              styles.trackSegment,
              {
                width: 10,
                borderWidth: 3,
                backgroundColor: getBackgroundColor(),
                borderColor: "yellow",
              },
            ]}
          />
        )}

        {/* Segment gris fixe à droite */}
        <View
          style={[
            styles.trackSegment,
            {
              backgroundColor: "gray",
              flex: getFlexForSegment(6 - foundValue, bonusFound),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: "purple",
  },
  sliderTrack: {
    flexDirection: "row",
    width: "100%",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  trackSegment: {
    height: "100%",
  },
});

export default StatSliderResult;
