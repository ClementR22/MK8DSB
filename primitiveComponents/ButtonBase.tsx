import React from "react";
import { ViewStyle } from "react-native";
import Tooltip from "@/components/Tooltip";

type ButtonBaseProps = {
  children: React.ReactNode;
  onPress: () => void;
  tooltipText: string;
  placement?: "top" | "right" | "bottom" | "left" | "auto";
  containerStyleOuter?: ViewStyle | ViewStyle[];
  containerStyleInner?: ViewStyle | ViewStyle[];
  isButton?: boolean;
  disabled?: boolean;
  [key: string]: any; // autres props à passer
};

const ButtonBase = ({
  children,
  onPress,
  tooltipText,
  placement = "top",
  containerStyleOuter,
  containerStyleInner,
  isButton = false,
  disabled = false,
  ...props
}: ButtonBaseProps) => {
  if (!tooltipText) {
    console.error("tooltipText missing in buttonBase", children, onPress);
  }
  return (
    <Tooltip
      onPress={onPress}
      childStyleOuter={containerStyleOuter}
      childStyleInner={containerStyleInner}
      tooltipText={tooltipText}
      placement={placement}
      isButton={isButton}
      disabled={disabled}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default ButtonBase;
