import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import HelpIconAndText from "./HelpIconAndText";

interface HelpStepItemProps {
  stepChar: number | string;
  title: string;
  description: string;
}

const HelpStepItem = ({ stepChar, title, description }: HelpStepItemProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <HelpIconAndText
      icon={
        <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
          <Text style={styles.text}>{stepChar}</Text>
        </View>
      }
      title={title}
      description={description}
      withBackground={false}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  text: { color: "white", fontSize: 12, fontWeight: "bold" },
});

export default HelpStepItem;
