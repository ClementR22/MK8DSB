import React, { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { useThemeStore } from "@/stores/useThemeStore";

interface ButtonIconProps {
  onPress: (event?: Event) => void;
  tooltipText?: string;
  toolTipPlacement?: string;
  elevation?: 1 | 3 | 6 | 8 | 12;
  iconName: string;
  iconType: IconType;
  iconSize?: number;
  shape?: "circle" | "rectangle";
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  tooltipText,
  toolTipPlacement = "top",
  elevation,
  iconName,
  iconType,
  iconSize = 24,
  shape = "circle",
  style = null,
  ...props
}) => {
  const theme = useThemeStore((state) => state.theme);

  const shapeStyle = useMemo(() => {
    return shape === "circle"
      ? {
          height: 40,
          width: 40,
          borderRadius: 20,
        }
      : { height: 30, width: 46, borderRadius: 10 };
  }, [shape]);

  const containerCombinedStyle = useMemo(() => {
    return StyleSheet.flatten([styles.container, shapeStyle, { backgroundColor: theme.primary }, style]);
  }, [shapeStyle, theme.primary, style]);

  return (
    <ButtonBase
      onPress={onPress}
      tooltipText={tooltipText}
      placement={toolTipPlacement}
      elevation={elevation}
      containerStyle={containerCombinedStyle}
      {...props}
    >
      <Icon type={iconType} name={iconName} size={iconSize} color={theme.on_primary} />
    </ButtonBase>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(ButtonIcon);
