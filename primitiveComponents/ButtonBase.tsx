import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import TooltipWrapper from "@/components/TooltipWrapper";

type ButtonBaseProps = {
  children: React.ReactNode;
  onPress: () => void;
  tooltipText?: string;
  placement?: string;
  elevation?: 1 | 3 | 6 | 8 | 12;
  containerStyle: StyleProp<ViewStyle>;
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
  const Wrapper = tooltipText ? TooltipWrapper : Pressable;

  return (
    <Wrapper onPress={onPress} style={containerStyle} tooltipText={tooltipText} placement={placement} {...props}>
      {children}
    </Wrapper>
  );
};

export default ButtonBase;
