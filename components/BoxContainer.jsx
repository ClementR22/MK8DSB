import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

function BoxContainer ({
  children,
  containerBackgroundColor = "transparent",
  contentBackgroundColor,
  justifyContent = "center",
  flexDirection = "column",
  alignItems = "center",
  gap = 10,
  inputStyles,
}) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      fontFamily: "inherit",
      backgroundColor: containerBackgroundColor,
      width: "100%",
      margin: "auto",
      justifyContent: "center",
    },
    content: {
      backgroundColor: contentBackgroundColor || theme.surface,
      justifyContent: justifyContent,
      maxWidth: 400,
      margin: 16,
      padding: 10,
      borderRadius: 12,
      gap: gap,
      flexDirection: flexDirection,
      alignItems: alignItems,
      ...inputStyles,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export default BoxContainer;