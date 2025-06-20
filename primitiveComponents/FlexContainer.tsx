import React from "react";
import { StyleSheet, View } from "react-native";
import { shadow_3dp } from "@/components/styles/theme";

function FlexContainer({
  children,
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  // boxShadow,
  padding,
  paddingHorizontal,
  backgroundColor,
  minHeight,
  style,
}: {
  children: any;
  flexDirection?: any;
  alignItems?: any;
  justifyContent?: any;
  gap?: any;
  // boxShadow?: any;
  padding?: any;
  paddingHorizontal?: any;
  backgroundColor?: any;
  minHeight?: number;
  style?: any;
}) {
  const containerStyle = {
    backgroundColor: backgroundColor ?? "transparent",
    flexDirection: flexDirection || "column",
    alignItems: alignItems ?? "center",
    justifyContent: justifyContent ?? "center",
    gap: gap ?? 10,
    padding: padding ?? 0,
    paddingHorizontal: paddingHorizontal ?? 0,
    width: "100%",
    minHeight: minHeight,
  };

  return <View style={[containerStyle, style]}>{children}</View>;
}

export default React.memo(FlexContainer);
