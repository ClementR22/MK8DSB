import React from "react";
import { StyleSheet, Text as NativeText } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

function Text({ children, style, ...props }) {
  const { theme } = useTheme();

  const styles = StyleSheet.flatten([
    {
      color: theme.on_surface,
    },
    style,
  ]);

  return (
    <NativeText style={styles} {...props}>
      {children}
    </NativeText>
  );
}

export default Text;
