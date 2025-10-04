import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import StepCircle from "./StepCircle";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_STANDARD, BUTTON_SIZE } from "@/utils/designTokens";

interface HelpStepItemProps {
  stepChar: number | string;
  title: string;
  alignItems?: "flex-start" | "center" | "flex-end";
  children: React.ReactNode;
}

const HelpStepItem = ({ stepChar, title, alignItems, children }: HelpStepItemProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{<StepCircle number={stepChar} />}</View>

      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.title,
            {
              color: theme.on_surface,
            },
          ]}
        >
          {title}
        </Text>

        {children && <View style={{ gap: 10, alignSelf: alignItems, alignItems }}>{children}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  iconWrapper: { width: BUTTON_SIZE, alignItems: "center" },
  contentContainer: { flex: 1, gap: 10, justifyContent: "center" },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default React.memo(HelpStepItem);
