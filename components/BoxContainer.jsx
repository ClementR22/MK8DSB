import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

function BoxContainer({
  children,
  containerBackgroundColor = "transparent",
  contentBackgroundColor,
  justifyContent = "center",
  flexDirection = "column",
  alignItems = "center",
  gap = 10,
  margin = 16,
  inputStyles,
  widthContainer = "100%",
}) {
  const theme = useThemeStore((state) => state.theme);

  const styles = StyleSheet.create({
    container: {
      fontFamily: "inherit",
      backgroundColor: containerBackgroundColor,
      width: widthContainer,
      marginHorizontal: "auto",
      justifyContent: "flex-start",
    },
    content: {
      backgroundColor: contentBackgroundColor || theme.surface_container_high,
      justifyContent: justifyContent,
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
