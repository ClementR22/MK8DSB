import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Tooltip from "@/components/Tooltip";

type ButtonBaseProps = {
  children: React.ReactNode;
  onPress: () => void;
  tooltipText?: string;
  placement?: string;
  elevation?: 1 | 3 | 6 | 8 | 12;
  containerStyle: ViewStyle;
  [key: string]: any; // autres props à passer
};

const ButtonBase = ({
  children,
  onPress,
  tooltipText,
  placement = "top",
  elevation,
  containerStyle,
  ...props
}: ButtonBaseProps) => {
  const Wrapper = tooltipText ? Tooltip : Pressable;

  return (
    <Wrapper onPress={onPress} style={containerStyle} tooltipText={tooltipText} placement={placement} {...props}>
      {children}
    </Wrapper>
  );
};

export default ButtonBase;
