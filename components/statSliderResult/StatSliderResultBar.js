import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const StatSliderResultBar = ({ value, chosenValue = null }) => {
  const theme = useThemeStore((state) => state.theme);

  if (chosenValue == null) {
    chosenValue = value;
  }

  const bonusFound = value - chosenValue;

  const getFlexForSegment = (baseValue, bonus) => {
    const flexValue = bonus >= 0 ? baseValue : baseValue + bonus;
    return Math.max(flexValue, 0); // Assurer que la flexbox ne soit jamais négative
  };

  const getBackgroundColor = () => {
    return bonusFound > 0 ? "#34be4d" : bonusFound < 0 ? "#ff6240" : theme.surface_container_low;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    sliderTrack: {
      flexDirection: "row",
      height: 10,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: theme.surface_container_low,
    },
    trackSegment: {
      height: "100%",
    },
  });

  function bonus() {
    if (bonusFound > 0) return 1;
    if (bonusFound < 0) return 0;
    else return -1;
  }

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
                borderTopRightRadius: bonus() === 0 ? 0 : 100,
                borderBottomRightRadius: bonus() === 0 ? 0 : 100,
                backgroundColor: theme.primary,
                borderColor: getBackgroundColor(),
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
              borderTopRightRadius: bonus() === 1 ? 0 : 100,
              borderBottomRightRadius: bonus() === 1 ? 0 : 100,
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
                backgroundColor: theme.primary,
                borderColor: getBackgroundColor(),
              },
            ]}
          />
        )}

        {/* Segment gris fixe à droite */}
        <View
          style={[
            styles.trackSegment,
            {
              flex: getFlexForSegment(6 - value, bonusFound),
            },
          ]}
        />
      </View>
    </View>
  );
};

export default StatSliderResultBar;
