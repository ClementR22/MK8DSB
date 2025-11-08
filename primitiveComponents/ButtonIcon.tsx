import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import IconContainer from "./IconContainer";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";

export interface ButtonIconProps {
  onPress?: (event?: Event) => void;
  tooltipText: string;
  toolTipPlacement?: "top" | "right" | "bottom" | "left" | "auto";
  iconName: string;
  iconType: IconType;
  buttonSize?: number;
  shape?: "circle" | "rectangle";
  backgroundColor?: string;
  disabled?: boolean;
  [key: string]: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  tooltipText,
  toolTipPlacement = "top",
  iconName,
  iconType,
  buttonSize = BUTTON_SIZE,
  shape = "circle",
  backgroundColor,
  disabled = false,
  color = null,
  ...props
}) => {
  return (
    <ButtonBase onPress={onPress} tooltipText={tooltipText} placement={toolTipPlacement} disabled={disabled} {...props}>
      <IconContainer
        iconName={iconName}
        iconType={iconType}
        shape={shape}
        containerSize={buttonSize}
        backgroundColor={disabled ? "grey" : backgroundColor}
        iconColor={color}
      />
    </ButtonBase>
  );
};

ButtonIcon.displayName = "ButtonIcon";

export default React.memo(ButtonIcon);
