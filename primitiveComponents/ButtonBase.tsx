import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Tooltip from "@/components/Tooltip";
import { Placement } from "react-native-popover-view/dist/Types";

type ButtonBaseProps = {
  children: React.ReactNode;
  onPress: () => void;
  tooltipText?: string;
  placement?: Placement;
  containerStyle?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  [key: string]: any; // autres props à passer
};

const ButtonBase = ({
  children,
  onPress,
  tooltipText,
  placement = Placement.TOP,
  containerStyle,
  disabled = false,
  ...props
}: ButtonBaseProps) => {
  const Wrapper = tooltipText ? Tooltip : Pressable;

  return (
    <Wrapper
      onPress={onPress}
      style={containerStyle}
      tooltipText={tooltipText}
      placement={placement}
      disabled={disabled}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default ButtonBase;
