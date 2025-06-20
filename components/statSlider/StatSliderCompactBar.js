import { useThemeStore } from "@/stores/useThemeStore";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getBonusColor } from "@/utils/getBonusColor";

const MAX_VALUE = 6;

const StatSliderCompactBar = ({ value, chosenValue, isInSetCard }) => {
  const theme = useThemeStore((state) => state.theme);

  const actualChosenValue = useMemo(() => chosenValue || value, [chosenValue, value]);
  const bonus = useMemo(() => value - actualChosenValue, [value, actualChosenValue]);

  const [barWidth, setBarWidth] = useState(0);

  const getWidth = useCallback((val) => (barWidth * val) / MAX_VALUE, [barWidth]);

  const fillWidth = useMemo(
    () => (bonus >= 0 ? getWidth(value) : getWidth(actualChosenValue)),
    [bonus, value, actualChosenValue, getWidth]
  );
  const innerFillWidth = useMemo(
    () => (bonus > 0 ? getWidth(actualChosenValue) : getWidth(value)),
    [bonus, value, actualChosenValue, getWidth]
  );
  const showValueInside = useMemo(() => value >= 1.5 && !isInSetCard, [value, isInSetCard]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        bar: {
          width: "78%",
          flexDirection: "row",
          borderRadius: 12,
          alignItems: "flex-start",
          overflow: "hidden",
          backgroundColor: theme.secondary_container,
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
      }),
    [theme]
  );

  const handleBarLayout = useCallback((e) => {
    setBarWidth(e.nativeEvent.layout.width);
  }, []); // `setBarWidth` is stable, so no dependencies

  return (
    <View style={styles.bar} onLayout={handleBarLayout}>
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

export default React.memo(StatSliderCompactBar);
