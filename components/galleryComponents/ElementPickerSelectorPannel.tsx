import React, { memo, useMemo } from "react";
import { Animated, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_18, CARD_SPACING, SHADOW_STYLE } from "@/utils/designTokens";

interface ElementPickerSelectorPannelProps {
  animatedLeftPannelWidth: Animated.Value;
  children?: React.ReactNode;
}

const ElementPickerSelectorPannel: React.FC<ElementPickerSelectorPannelProps> = memo(
  ({ animatedLeftPannelWidth, children }) => {
    const theme = useThemeStore((state) => state.theme);

    const styles = useMemo(
      () => ({
        container: {
          backgroundColor: theme.surface,
          borderColor: theme.outline,
        },
      }),
      [theme]
    );

    return (
      <Animated.View style={[defaultStyles.container, styles.container, { width: animatedLeftPannelWidth }]}>
        {children}
      </Animated.View>
    );
  }
);

ElementPickerSelectorPannel.displayName = "ElementPickerSelectorPannel";

const defaultStyles = StyleSheet.create({
  container: {
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

export default ElementPickerSelectorPannel;
