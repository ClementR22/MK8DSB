import React from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import IconContainer from "./IconContainer";
import { BUTTON_SIZE } from "@/utils/designTokens";

export interface ButtonIconProps {
  onPress?: (event?: Event) => void;
  tooltipText: string;
  namespace?: string;
  toolTipPlacement?: "top" | "right" | "bottom" | "left" | "auto";
  iconName: string;
  iconType: IconType;
  iconColor?: string;
  buttonSize?: number;
  shape?: "circle" | "rectangle";
  backgroundColor?: string;
  disabled?: boolean;
  [key: string]: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  tooltipText,
  namespace,
  toolTipPlacement = "top",
  iconName,
  iconType,
  iconColor = null,
  buttonSize = BUTTON_SIZE,
  shape = "circle",
  backgroundColor,
  disabled = false,
  ...props
}) => {
  return (
    <ButtonBase
      onPress={onPress}
      tooltipText={tooltipText}
      namespace={namespace}
      placement={toolTipPlacement}
      disabled={disabled}
      {...props}
    >
      <IconContainer
        iconName={iconName}
        iconType={iconType}
        shape={shape}
        containerSize={buttonSize}
        backgroundColor={disabled ? "grey" : backgroundColor}
        iconColor={iconColor}
      />
    </ButtonBase>
  );
};

ButtonIcon.displayName = "ButtonIcon";

export default React.memo(ButtonIcon);
