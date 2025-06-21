import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface StatSliderCompareBarProps {
  value: number;
}

const MAX_STAT_VALUE = 6;

const StatSliderCompareBar = ({ value }: StatSliderCompareBarProps) => {
  const theme = useThemeStore((state) => state.theme);

  const sliderTrackDynamicBg = useMemo(
    () => ({
      backgroundColor: theme.surface_container_low,
    }),
    [theme.surface_container_low]
  );

  const primarySegmentColor = useMemo(
    () => ({
      backgroundColor: theme.primary,
    }),
    [theme.primary]
  );

  const getWidth = useCallback((val: number) => {
    const clampedValue = Math.min(Math.max(val, 0), MAX_STAT_VALUE);
    return `${(clampedValue / MAX_STAT_VALUE) * 100}%`;
  }, []);

  const innerFillWidth = useMemo(() => getWidth(value), [value, getWidth]);

  return (
    <View style={styles.container}>
      <View style={StyleSheet.flatten([styles.sliderTrack, sliderTrackDynamicBg])}>
        <View
          style={StyleSheet.flatten([
            styles.trackSegment,
            { width: innerFillWidth as `${number}%` | number },
            primarySegmentColor,
          ])}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
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
  yellowSegmentCommon: {
    width: 10,
    borderWidth: 3,
  },
});

export default React.memo(StatSliderCompareBar);
