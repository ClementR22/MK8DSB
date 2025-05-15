import React from "react";
import { ScrollView, StyleSheet } from "react-native";

function FlexScrollView({ children, flexDirection, alignItems, justifyContent, gap, style }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: flexDirection ? flexDirection : "column",
      alignItems: alignItems || "center",
      justifyContent: justifyContent || "center",
      gap: gap ? gap : 10,
    },
  });

  return <ScrollView contentContainerStyle={[styles.container, style]}>{children}</ScrollView>;
}

export default FlexScrollView;
