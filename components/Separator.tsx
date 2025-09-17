import React, { useMemo } from "react";
import { DimensionValue, View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface SeparatorProps {
  direction: "vertical" | "horizontal";
  length?: number | string;
  lineWidth?: number;
}

const Separator: React.FC<SeparatorProps> = ({ direction, length = "90%", lineWidth = 2 }) => {
  const outlineVariant = useThemeStore((state) => state.theme.outline_variant);

  const separatorStyle = useMemo((): ViewStyle => {
    const isVertical = direction === "vertical";

    return {
      width: (isVertical ? lineWidth : length) as DimensionValue,
      height: (isVertical ? length : lineWidth) as DimensionValue,
      backgroundColor: outlineVariant,
      alignSelf: "center",
    };
  }, [direction, length, lineWidth, outlineVariant]);

  return <View style={separatorStyle} />;
};

export default React.memo(Separator);
