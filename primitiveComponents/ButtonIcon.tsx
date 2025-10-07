import React, { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { TooltipPlacementType } from "@/components/Tooltip";
import IconContainer from "./IconContainer";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";

export interface ButtonIconProps {
  onPress?: (event?: Event) => void;
  tooltipText?: string;
  toolTipPlacement?: TooltipPlacementType;
  iconName: string;
  iconType: IconType;
  buttonSize?: number;
  shape?: "circle" | "rectangle";
  style?: StyleProp<ViewStyle> | any;
  disabled?: boolean;
  [key: string]: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  tooltipText,
  toolTipPlacement,
  iconName,
  iconType,
  buttonSize = BUTTON_SIZE,
  shape = "circle",
  style = null,
  disabled = false,
  color = null,
  ...props
}) => {
  const shapeStyle =
    shape === "circle"
      ? {
          height: buttonSize,
          width: buttonSize,
          borderRadius: BORDER_RADIUS_INF,
        }
      : { height: 30, width: 46, borderRadius: 10 };

  return (
    <ButtonBase onPress={onPress} tooltipText={tooltipText} placement={toolTipPlacement} disabled={disabled} {...props}>
      <IconContainer
        iconName={iconName}
        iconType={iconType}
        containerSize={buttonSize}
        containerStyle={[styles.container, shapeStyle, disabled && { backgroundColor: "grey" }, style]}
        iconColor={color}
      />
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
