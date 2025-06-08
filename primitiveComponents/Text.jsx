import React from "react";
import { StyleSheet, Text as NativeText } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

function Text({ children, style, ...props }) {
  const theme = useThemeStore((state) => state.theme);

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
