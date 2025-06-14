import React from "react";
import { StyleSheet, View } from "react-native";
import { shadow_3dp } from "@/components/styles/theme";

function FlexContainer({
  children,
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  boxShadow,
  padding,
  backgroundColor,
  minHeight,
  style,
}: {
  children: any;
  flexDirection?: any;
  alignItems?: any;
  justifyContent?: any;
  gap?: any;
  boxShadow?: any;
  padding?: any;
  backgroundColor?: any;
  minHeight?: number;
  style?: any;
}) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor || "transparent",
      display: "flex",
      flexDirection: flexDirection ? flexDirection : "column",
      alignItems: alignItems || "center",
      justifyContent: justifyContent || "center",
      gap: gap ? gap : 10,
      boxSizing: boxShadow || shadow_3dp,
      padding: padding || 0,
      width: "100%",
      minHeight: minHeight,
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
}

export default FlexContainer;
