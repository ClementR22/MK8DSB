import React from "react";
import { View, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

interface StepCircleProps {
  number: string | number;
  size?: number;
}

const StepCircle = ({ number, size = 24 }: StepCircleProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: BORDER_RADIUS_INF, backgroundColor: theme.primary },
      ]}
    >
      <Text role="body" size="large" inverse>
        {number}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
});

export default StepCircle;
