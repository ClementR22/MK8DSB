import { useThemeStore } from "@/stores/useThemeStore";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent } from "react-native";
import { getBonusColor } from "@/utils/getBonusColor";
import { useGaugeMetrics } from "@/hooks/useGaugeMetrics";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";

interface StatGaugeRelativeBarProps {
  value: number;
  maxValue?: number;
}

const StatGaugeRelativeBar = ({ value, maxValue = 6 }: StatGaugeRelativeBarProps) => {
  const theme = useThemeStore((state) => state.theme);
  const { gaugeWidth, handleGaugeLayout } = useGaugeMetrics();

  const getWidth = useCallback((val: number) => (gaugeWidth * Math.abs(val)) / (maxValue * 2), [gaugeWidth, maxValue]);

  const fillWidth = useMemo(() => getWidth(value), [value, getWidth]);

  const showValueInside = useMemo(() => Math.abs(value) > maxValue / 2, [value, maxValue]);
  const showValueOutside = useMemo(() => !showValueInside, [showValueInside]);

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

  const fillBackgroundColor = useMemo(() => getBonusColor(value) ?? theme.primary, [value, theme.primary]);

  const stylesDynamic = useStatGaugeStyles();

  return (
    <View style={stylesDynamic.emptyContainer} onLayout={handleGaugeLayout}>
      {/* Ligne noire centrale */}
      <View style={[styles.zeroLine, { left: gaugeWidth / 2 - 1 }]} />
      {/* Fill principal */}
      <View
        style={[
          stylesDynamic.thick,
          {
            backgroundColor: fillBackgroundColor,
            width: fillWidth,
          },
          value > 0
            ? { left: gaugeWidth / 2, borderTopRightRadius: 12, borderBottomRightRadius: 12 }
            : {
                right: gaugeWidth / 2,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              },
        ]}
      >
        {/* Valeur à l'intérieur de la barre */}
        {showValueInside && (
          <Text
            style={StyleSheet.flatten([
              styles.valueLabel,
              valueLabelInsideColor,
              value > 0 ? { right: -5 } : { left: 5 },
            ])}
          >
            {value > 0 ? `+${value}` : value}
          </Text>
        )}
      </View>

      {/* Valeur en dehors de la barre */}
      {showValueOutside && (
        <Text
          style={StyleSheet.flatten([
            styles.valueLabel,
            valueLabelOutsideColor,
            { position: "absolute" },
            value > 0
              ? { left: gaugeWidth / 2 + fillWidth + 2 }
              : value < 0
              ? { right: gaugeWidth / 2 + fillWidth + 4 }
              : { left: gaugeWidth / 2 + fillWidth + 6 },
          ])}
        >
          {value > 0 ? `+${value}` : value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  zeroLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: "black",
    zIndex: 1,
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
});

export default React.memo(StatGaugeRelativeBar);
