import React from "react";
import { DimensionValue, Pressable, StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

interface StatGaugeCompareBarProps {
  value: number;
  color?: string;
  scrollToThisBuildCard: () => void;
}

const MAX_STAT_VALUE = 6;

const StatGaugeCompareBar = ({ value, color, scrollToThisBuildCard }: StatGaugeCompareBarProps) => {
  const theme = useThemeStore((state) => state.theme);

  // Largeur du segment intérieur, clampée et calculée une seule fois par changement de value
  const clampedValue = Math.min(Math.max(value, 0), MAX_STAT_VALUE);
  const innerFillWidth = `${(clampedValue / MAX_STAT_VALUE) * 100}%` as DimensionValue;

  return (
    <Pressable style={styles.container} onPress={scrollToThisBuildCard}>
      <View style={[styles.sliderTrack, { backgroundColor: theme.surface_container_highest }]}>
        <View
          style={StyleSheet.flatten([
            styles.trackSegment,
            { width: innerFillWidth, backgroundColor: color ?? theme.primary },
          ])}
        />
      </View>
      <Text role="label" size="large" style={styles.text} namespace="not">
        {value}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", flexDirection: "row", alignItems: "center", gap: 10 },
  sliderTrack: {
    flex: 1,
    height: 13,
    borderRadius: BORDER_RADIUS_INF,
    overflow: "hidden",
  },
  trackSegment: {
    height: "100%",
  },
  text: { width: 40 },
});

export default React.memo(StatGaugeCompareBar);
