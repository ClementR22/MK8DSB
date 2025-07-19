import React, { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { useThemeStore } from "@/stores/useThemeStore";
import { TooltipPlacementType } from "@/components/Tooltip";

export interface ButtonIconProps {
  onPress?: (event?: Event) => void;
  tooltipText?: string;
  toolTipPlacement?: TooltipPlacementType;
  elevation?: 1 | 3 | 6 | 8 | 12;
  iconName: string;
  iconType: IconType;
  iconSize?: number;
  shape?: "circle" | "rectangle";
  style?: StyleProp<ViewStyle> | any;
  [key: string]: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  tooltipText,
  toolTipPlacement,
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
    const buttonSize = (40 / 24) * iconSize;
    return shape === "circle"
      ? {
          height: buttonSize,
          width: buttonSize,
          borderRadius: buttonSize / 2,
        }
      : { height: 30, width: 46, borderRadius: 10 };
  }, [shape, iconSize]);

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
      <Icon type={iconType} name={iconName} size={iconSize} color={style?.color || theme.on_primary} />
    </ButtonBase>
  );
};

ButtonIcon.displayName = "ButtonIcon";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(ButtonIcon);
