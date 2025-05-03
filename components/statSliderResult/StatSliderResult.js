import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../utils/ThemeContext";

const StatSliderResult = ({ value, chosenValue = null }) => {
  const { theme } = useTheme();

  if (chosenValue == null) {
    chosenValue = value;
  }

  const bonusFound = value - chosenValue;

  const getFlexForSegment = (baseValue, bonus) => {
    const flexValue = bonus >= 0 ? baseValue : baseValue + bonus;
    return Math.max(flexValue, 0); // Assurer que la flexbox ne soit jamais négative
  };

  const getBackgroundColor = () => {
    return bonusFound > 0 ? "#34be4d" : bonusFound < 0 ? "#ff6240" : "black";
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderTrack}>
        {/* Segment noir fixe à gauche */}
        <View
          style={[
            styles.trackSegment,
            {
              backgroundColor: theme.primary,
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
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100,
                backgroundColor: theme.primary,
                borderColor: theme.primary,
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
                borderColor: theme.primary,
              },
            ]}
          />
        )}

        {/* Segment gris fixe à droite */}
        <View
          style={[
            styles.trackSegment,
            {
              backgroundColor: theme.secondary_container,
              flex: getFlexForSegment(6 - value, bonusFound),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    // backgroundColor: "purple",
  },
  sliderTrack: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  trackSegment: {
    height: "100%",
  },
});

export default StatSliderResult;
