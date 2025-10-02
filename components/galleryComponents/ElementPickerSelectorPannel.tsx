import React, { memo, useMemo } from "react";
import { Animated, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_18, SHADOW_STYLE } from "@/utils/designTokens";

interface ElementPickerSelectorPannelProps {
  animatedLeftPannelWidth: Animated.Value;
  children?: React.ReactNode;
}

const ElementPickerSelectorPannel: React.FC<ElementPickerSelectorPannelProps> = memo(
  ({ animatedLeftPannelWidth, children }) => {
    const theme = useThemeStore((state) => state.theme);

    const containerDynamicStyle = useMemo(
      () => ({
        backgroundColor: theme.surface_container_high,
      }),
      [theme.surface]
    );

    return (
      <Animated.View style={[styles.container, containerDynamicStyle, { width: animatedLeftPannelWidth }]}>
        {children}
      </Animated.View>
    );
  }
);

ElementPickerSelectorPannel.displayName = "ElementPickerSelectorPannel";

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: BORDER_RADIUS_18,
    borderEndEndRadius: BORDER_RADIUS_18,
    overflow: "hidden",
    ...SHADOW_STYLE,
  },
});

export default ElementPickerSelectorPannel;
