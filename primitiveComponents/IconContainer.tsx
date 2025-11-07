import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import useThemeStore from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";

interface IconContainerProps {
  iconName: string;
  iconType: IconType;
  shape?: "circle" | "rectangle";
  containerSize?: number;
  backgroundColor?: string;
  iconColor?: string;
}

const IconContainer = ({
  iconName,
  iconType,
  shape = "circle",
  containerSize = BUTTON_SIZE,
  backgroundColor,
  iconColor,
  ...iconProps
}: IconContainerProps) => {
  const { theme } = useThemeStore();

  const shapeStyle =
    shape === "circle"
      ? {
          height: containerSize,
          width: containerSize,
          borderRadius: BORDER_RADIUS_INF,
        }
      : { height: 30, width: 46, borderRadius: 10 };

  const iconSize = (24 / BUTTON_SIZE) * containerSize;

  return (
    <View
      style={[
        styles.container,
        {
          height: containerSize,
          width: containerSize,
          backgroundColor: backgroundColor || theme.primary,
        },
        shapeStyle,
      ]}
    >
      <Icon name={iconName} type={iconType} size={iconSize} color={iconColor || theme.on_primary} {...iconProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconContainer;
