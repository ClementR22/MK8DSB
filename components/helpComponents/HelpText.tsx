import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface HelpTextProps {
  style?: TextStyle;
  children: ReactNode;
}

const HelpText = ({ children, style }: HelpTextProps) => {
  const theme = useThemeStore((state) => state.theme);
  return <Text style={[styles.text, style, { color: theme.on_surface_variant }]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});

export default HelpText;
