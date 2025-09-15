import { MAX_STAT_VALUE } from "@/constants/constants";
import { useGaugeMetrics } from "@/hooks/useGaugeMetrics";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, LayoutChangeEvent } from "react-native";

interface StatGaugeBarProps {
  value: number;
}

const StatGaugeBar = ({ value }: StatGaugeBarProps) => {
  const theme = useThemeStore((state) => state.theme);

  const { gaugeWidth, getWidth, handleGaugeLayout } = useGaugeMetrics();

  const fillWidth = useMemo(() => getWidth(value), [value, gaugeWidth]);

  const showValueInside = useMemo(() => value >= MAX_STAT_VALUE / 4, [value]);

  const stylesDynamic = useStatGaugeStyles();

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

  return (
    <View style={stylesDynamic.emptyContainer} onLayout={handleGaugeLayout}>
      {/* Fill principal */}
      <View
        style={[
          stylesDynamic.thick,
          {
            backgroundColor: theme.primary,
            width: fillWidth,
          },
        ]}
      >
        {showValueInside && (
          <Text style={StyleSheet.flatten([styles.valueLabel, styles.valueLabelInsidePosition, valueLabelInsideColor])}>
            {value}
          </Text>
        )}
      </View>

      {/* Valeur en dehors de la barre */}
      {!showValueInside && (
        <Text style={StyleSheet.flatten([styles.valueLabel, styles.valueLabelOutsidePosition, valueLabelOutsideColor])}>
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default React.memo(StatGaugeBar);
