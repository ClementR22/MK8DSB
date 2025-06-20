import React, { useState, useMemo, useCallback } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import TooltipWrapper from "@/components/TooltipWrapper";
import { shadow_1dp, shadow_3dp, shadow_6dp, shadow_8dp, shadow_12dp } from "@/components/styles/theme";

const ELEVATION_MAP = {
  1: shadow_1dp,
  3: shadow_3dp,
  6: shadow_6dp,
  8: shadow_8dp,
  12: shadow_12dp,
};

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
  const [hovered, setHovered] = useState(false);

  const activeShadowStyle = useMemo(() => {
    const selectedShadow = elevation ? ELEVATION_MAP[elevation] : shadow_6dp;
    return hovered ? selectedShadow : null;
  }, [hovered, elevation]);

  const combinedStyle = useMemo(() => [containerStyle, activeShadowStyle], [containerStyle, activeShadowStyle]);

  const Wrapper = tooltipText ? TooltipWrapper : Pressable;

  const handleHoverIn = useCallback(() => setHovered(true), []);
  const handleHoverOut = useCallback(() => setHovered(false), []);

  return (
    <Wrapper
      onPress={onPress}
      style={combinedStyle}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      tooltipText={tooltipText}
      placement={placement}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default ButtonBase;
