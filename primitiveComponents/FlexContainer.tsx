import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface FlexContainerProps {
  children: React.ReactNode;
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  gap?: number;
  padding?: number;
  paddingHorizontal?: number;
  backgroundColor?: string;
  minHeight?: number;
  style?: StyleProp<ViewStyle>;
}

const FlexContainer = ({
  children,
  flexDirection = "column",
  alignItems = "center",
  justifyContent = "center",
  gap = 10,
  padding = 0,
  paddingHorizontal = 0,
  backgroundColor = "transparent",
  minHeight,
  style,
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

FlexContainer.displayName = "FlexContainer";

export default React.memo(FlexContainer);
