import { useThemeStore } from "@/stores/useThemeStore";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent } from "react-native";
import { getBonusColor } from "@/utils/getBonusColor";

interface StatSliderCompactBarProps {
  value: number;
  chosenValue: number | false;
  isInSetCard: boolean;
}

const MAX_VALUE = 6;

const StatSliderCompactBar = ({ value, chosenValue, isInSetCard }: StatSliderCompactBarProps) => {
  const theme = useThemeStore((state) => state.theme);
  const [barWidth, setBarWidth] = useState(0);

  const actualChosenValue = useMemo(() => (chosenValue === false ? value : chosenValue), [chosenValue, value]);
  const bonus = useMemo(() => value - actualChosenValue, [value, actualChosenValue]);

  const getWidth = useCallback((val: number) => (barWidth * val) / MAX_VALUE, [barWidth]);

  const fillWidth = useMemo(
    () => (bonus >= 0 ? getWidth(value) : getWidth(actualChosenValue)),
    [bonus, value, actualChosenValue, getWidth]
  );
  const innerFillWidth = useMemo(
    () => (bonus > 0 ? getWidth(actualChosenValue) : getWidth(value)),
    [bonus, value, actualChosenValue, getWidth]
  );

  const showValueInside = useMemo(() => value >= 1.5 && !isInSetCard, [value, isInSetCard]);

  const barDynamicStyles = useMemo(
    () => ({
      backgroundColor: theme.secondary_container,
    }),
    [theme.secondary_container]
  );

  const valueLabelInsideColor = useMemo(
    () => ({
      color: theme.on_primary,
    }),
    [theme.on_primary]
  );

  const valueLabelOutsideColor = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const handleBarLayout = useCallback((e: LayoutChangeEvent) => {
    setBarWidth(e.nativeEvent.layout.width);
  }, []);

  const fillBackgroundColor = useMemo(() => getBonusColor(bonus) ?? theme.primary, [bonus, theme.primary]);

  const innerFillBackgroundColor = useMemo(() => theme.primary, [theme.primary]);

  return (
    <View style={[styles.bar, barDynamicStyles]} onLayout={handleBarLayout}>
      {/* Fill principal */}
      <View
        style={[
          styles.fill,
          {
            backgroundColor: fillBackgroundColor,
            width: fillWidth,
          },
        ]}
      >
        {isInSetCard ? (
          <View
            style={[
              styles.fill,
              {
                backgroundColor: innerFillBackgroundColor,
                width: innerFillWidth,
              },
            ]}
          />
        ) : (
          showValueInside && (
            <Text
              style={StyleSheet.flatten([styles.valueLabel, styles.valueLabelInsidePosition, valueLabelInsideColor])}
            >
              {value}
            </Text>
          )
        )}
      </View>

      {/* Valeur en dehors de la barre */}
      {!showValueInside && !isInSetCard && (
        <Text style={StyleSheet.flatten([styles.valueLabel, styles.valueLabelOutsidePosition, valueLabelOutsideColor])}>
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: "78%",
    height: "100%",
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
  valueLabelInsidePosition: {
    position: "absolute",
    right: 7,
  },
  valueLabelOutsidePosition: {
    marginLeft: 7,
  },
});

export default React.memo(StatSliderCompactBar);
