import { useThemeStore } from "@/stores/useThemeStore";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getBonusColor } from "@/utils/getBonusColor";

const MAX_VALUE = 6;

const StatSliderCompactBar = ({ value, chosenValue, isInSetCard }) => {
  const theme = useThemeStore((state) => state.theme);
  const [barWidth, setBarWidth] = useState(0);

  chosenValue = chosenValue ? chosenValue : value;
  const bonus = value - chosenValue;

  const getWidth = (val) => (barWidth * val) / MAX_VALUE;

  const fillWidth = bonus >= 0 ? getWidth(value) : getWidth(chosenValue);
  const innerFillWidth = bonus > 0 ? getWidth(chosenValue) : getWidth(value);
  const showValueInside = value >= 1.5 && !isInSetCard;

  return (
    <View
      style={[styles.bar, { backgroundColor: theme.secondary_container }]}
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
    >
      {/* Fill principal */}
      <View
        style={[
          styles.fill,
          {
            backgroundColor: getBonusColor(bonus) ?? theme.primary,
            width: fillWidth,
          },
        ]}
      >
        {isInSetCard ? (
          <View
            style={[
              styles.fill,
              {
                backgroundColor: theme.primary,
                width: innerFillWidth,
              },
            ]}
          />
        ) : (
          showValueInside && (
            <Text style={[styles.valueLabel, { position: "absolute", right: 7, color: theme.on_primary }]}>
              {value}
            </Text>
          )
        )}
      </View>

      {/* Valeur en dehors de la barre */}
      {!showValueInside && !isInSetCard && (
        <Text style={[styles.valueLabel, { marginLeft: 7, color: theme.on_surface }]}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: "78%", // prend toute la largeur disponible du parent
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "flex-start",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 12,
  },
  valueLabel: {
    fontSize: 16,
    fontWeight: "bold",
    top: 0,
  },
});

export default StatSliderCompactBar;
