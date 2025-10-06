import React from "react";
import { DimensionValue, View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface SeparatorProps {
  direction: "vertical" | "horizontal";
  length?: DimensionValue;
  lineWidth?: number;
  wrapperStyle?: ViewStyle;
}

const Separator: React.FC<SeparatorProps> = ({ direction, length = "90%", lineWidth = 2, wrapperStyle }) => {
  const outlineVariant = useThemeStore((state) => state.theme.outline_variant);

  const isVertical = direction === "vertical";

  return (
    <View
      style={[
        {
          width: (isVertical ? lineWidth : length) as DimensionValue,
          height: (isVertical ? length : lineWidth) as DimensionValue,
          backgroundColor: outlineVariant,
          alignSelf: "center",
        },
        wrapperStyle,
      ]}
    />
  );
};

export default React.memo(Separator);
