import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import StepCircle from "./StepCircle";
import { useThemeStore } from "@/stores/useThemeStore";

interface HelpStepItemProps {
  stepChar: number | string;
  title: string;
  alignItems?: "flex-start" | "center" | "flex-end";
  children: React.ReactNode;
}

const HelpStepItem = ({ stepChar, title, alignItems, children }: HelpStepItemProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface_container }]}>
      <View style={styles.iconWrapper}>{<StepCircle number={stepChar} />}</View>

      <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
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
    padding: 12,
    borderRadius: 12,
  },
  iconWrapper: { width: 40, alignItems: "center" },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HelpStepItem;
