import { useThemeStore } from "@/stores/useThemeStore";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, StyleProp, ViewStyle, TextStyle, LayoutChangeEvent } from "react-native";
import { getBonusColor } from "@/utils/getBonusColor";

interface StatSliderCompactBarRelativeValueProps {
  value: number;
  maxValue?: number;
}

const StatSliderCompactBarRelativeValue = ({ value, maxValue = 6 }: StatSliderCompactBarRelativeValueProps) => {
  const theme = useThemeStore((state) => state.theme);
  const [barWidth, setBarWidth] = useState(0);

  const getWidth = useCallback((val: number) => (barWidth * Math.abs(val)) / (maxValue * 2), [barWidth, maxValue]);

  const fillWidth = useMemo(() => getWidth(value), [value, getWidth]);

  const showValueInside = useMemo(() => Math.abs(value) > maxValue / 2, [value, maxValue]);
  const showValueOutside = useMemo(() => !showValueInside, [showValueInside]);

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

  const fillBackgroundColor = useMemo(() => getBonusColor(value) ?? theme.primary, [value, theme.primary]);

  return (
    <View style={[styles.bar, barDynamicStyles]} onLayout={handleBarLayout}>
      {/* Ligne noire centrale */}
      <View style={[styles.zeroLine, { left: barWidth / 2 - 1 }]} />
      {/* Fill principal */}
      {true && (
        <>
          <View
            style={[
              styles.fill,
              {
                backgroundColor: fillBackgroundColor,
                width: fillWidth,
              },
              value > 0
                ? { left: barWidth / 2, borderTopRightRadius: 12, borderBottomRightRadius: 12 }
                : {
                    right: barWidth / 2,
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
                  ? { left: barWidth / 2 + fillWidth + 2 }
                  : value < 0
                  ? { right: barWidth / 2 + fillWidth + 4 }
                  : { left: barWidth / 2 + fillWidth + 6 },
              ])}
            >
              {value > 0 ? `+${value}` : value}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    height: "100%",
    borderRadius: 12,
    alignItems: "flex-start",
    overflow: "hidden",
    position: "relative",
  },
  zeroLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: "black",
    zIndex: 1,
  },
  fill: {
    height: "100%",
    position: "absolute",
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

export default React.memo(StatSliderCompactBarRelativeValue);
