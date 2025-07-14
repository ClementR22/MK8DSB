import React, { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import {
  BORDER_RADIUS_18,
  CARD_SPACING,
  LEFT_PANNEL_WIDTH_COLLAPSED,
  LEFT_PANNEL_WIDTH_EXPANDED,
  SHADOW_STYLE,
} from "@/utils/designTokens";

interface ElementPickerSelectorPannelProps {
  animatedLeftPannelWidth: Animated.Value;
  children?: React.ReactNode;
}

const ElementPickerSelectorPannel: React.FC<ElementPickerSelectorPannelProps> = ({
  animatedLeftPannelWidth,
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Animated.View style={[styles.leftPannel, { width: animatedLeftPannelWidth, backgroundColor: theme.surface }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  leftPannel: {
    borderTopEndRadius: BORDER_RADIUS_18, // Consistent radius
    borderEndEndRadius: BORDER_RADIUS_18,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    marginVertical: CARD_SPACING / 2,
    paddingTop: CARD_SPACING / 2,
    gap: CARD_SPACING / 2, // Small internal padding
    ...SHADOW_STYLE, // Apply shadow to the column
  },
});

export default memo(ElementPickerSelectorPannel);
