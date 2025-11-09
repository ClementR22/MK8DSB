import useThemeStore from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF } from "@/utils/designTokens";
import React, { memo } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";

interface StatGaugeBarProps {
  value: number;
  color?: string;
}

const MAX_STAT_VALUE = 6;

const StatGaugeBar: React.FC<StatGaugeBarProps> = ({ value, color }) => {
  const theme = useThemeStore((state) => state.theme);

  // Largeur du segment intérieur, clampée et calculée une seule fois par changement de value
  const clampedValue = Math.min(Math.max(value, 0), MAX_STAT_VALUE);
  const innerFillWidth = `${(clampedValue / MAX_STAT_VALUE) * 100}%` as DimensionValue;

  return (
    <View style={[styles.sliderTrack, { backgroundColor: theme.surface_container_highest }]}>
      <View
        style={StyleSheet.flatten([
          styles.trackSegment,
          { width: innerFillWidth, backgroundColor: color ?? theme.primary },
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  trackSegment: {
    height: "100%",
  },
  sliderTrack: {
    flex: 1,
    height: 13,
    borderRadius: BORDER_RADIUS_INF,
    overflow: "hidden",
  },
});

export default memo(StatGaugeBar);
