import { useThemeStore } from "@/stores/useThemeStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getBonusColor } from "@/utils/getBonusColor";

const BAR_WIDTH = 148;
const MAX_VALUE = 6;

const getWidth = (value) => (value * BAR_WIDTH) / MAX_VALUE;

const StatSliderCompactBar = ({ value, chosenValue, isInSetCard }) => {
  const theme = useThemeStore((state) => state.theme);
  const bonus = value - chosenValue;

  const fillWidth = bonus >= 0 ? getWidth(value) : getWidth(chosenValue);
  const innerFillWidth = bonus > 0 ? getWidth(chosenValue) : getWidth(value);
  const showValueInside = value >= 1.5 && !isInSetCard;

  return (
    <View style={[styles.bar, { backgroundColor: theme.secondary_container }]}>
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
          // Double couche : fond bonus, puis le fill normal par-dessus
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
    width: "78%",
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
