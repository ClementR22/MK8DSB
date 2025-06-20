import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { shadow_3dp } from "@/components/styles/theme";

interface FlexContainerProps {
  children: React.ReactNode;
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  gap?: number; // `gap` is a number
  padding?: number;
  paddingHorizontal?: number;
  backgroundColor?: string; // backgroundColor is a string
  minHeight?: number; // minHeight is a number (dp)
  style?: StyleProp<ViewStyle>; // Use StyleProp<ViewStyle> for incoming style
}

const FlexContainer = ({
  children,
  flexDirection = "column", // Defaulting here makes the useMemo deps cleaner
  alignItems = "center",
  justifyContent = "center",
  gap = 10,
  padding = 0,
  paddingHorizontal = 0,
  backgroundColor = "transparent",
  minHeight,
  style, // This is the incoming custom style prop
}: FlexContainerProps) => {
  const dynamicContainerStyle = useMemo(
    () => ({
      backgroundColor: backgroundColor,
      flexDirection: flexDirection,
      alignItems: alignItems,
      justifyContent: justifyContent,
      gap: gap,
      padding: padding,
      paddingHorizontal: paddingHorizontal,
      minHeight: minHeight,
    }),
    // Dependencies: The style object will only re-create if any of these change
    [backgroundColor, flexDirection, alignItems, justifyContent, gap, padding, paddingHorizontal, minHeight]
  );

  const finalContainerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, dynamicContainerStyle, style]),
    [dynamicContainerStyle, style]
  );

  return <View style={finalContainerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default React.memo(FlexContainer);
