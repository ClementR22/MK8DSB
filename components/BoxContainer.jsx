import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

function BoxContainer({
  children,
  containerBackgroundColor = "transparent",
  contentBackgroundColor,
  justifyContent = "center",
  flexDirection = "column",
  alignItems = "center",
  gap = 10,
  width = "100%",
  maxWidth = 360,
  margin = 16,
  inputStyles,
}) {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      fontFamily: "inherit",
      backgroundColor: containerBackgroundColor,
      width: width,
      maxWidth: maxWidth,
      marginHorizontal: "auto",
      justifyContent: "flex-start",
    },
    content: {
      backgroundColor: contentBackgroundColor || theme.surface_container_high,
      justifyContent: justifyContent,
      maxWidth: 400,
      margin: margin,
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
