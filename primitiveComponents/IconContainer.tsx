import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { useThemeStore } from "@/stores/useThemeStore";
import { BUTTON_SIZE } from "@/utils/designTokens";

interface IconContainerProps {
  iconName: string;
  iconType: IconType;
  containerSize?: number;
  backgroundColor?: string;
  iconColor?: string;
  containerStyle?: ViewStyle;
}

const IconContainer = ({
  iconName,
  iconType,
  containerSize = BUTTON_SIZE,
  backgroundColor,
  iconColor,
  containerStyle,
  ...iconProps
}: IconContainerProps) => {
  const { theme } = useThemeStore();

  const iconSize = useMemo(() => (24 / BUTTON_SIZE) * containerSize, [containerSize]);

  return (
    <View
      style={[
        styles.container,
        {
          height: containerSize,
          width: containerSize,
          backgroundColor: backgroundColor || theme.primary,
        },
        containerStyle,
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
