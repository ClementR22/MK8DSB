import React from "react";
import { DimensionValue, StyleSheet, View, ViewStyle } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import { MARGIN_CONTAINER_LOWEST, PADDING_BOX_CONTAINER } from "@/utils/designTokens";

interface BoxContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  height?: DimensionValue;
  justifyContent?: ViewStyle["justifyContent"];
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  gap?: number;
  marginHorizontal?: number;
  marginTop?: number;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  padding?: number;
  paddingHorizontal?: number;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  boxShadow?: string;
}

const BoxContainer = ({
  children,
  backgroundColor,
  height,
  justifyContent = "center",
  flexDirection = "column",
  alignItems = "center",
  gap = 10,
  marginHorizontal = MARGIN_CONTAINER_LOWEST,
  marginTop,
  borderColor = "transparent",
  borderWidth = 3,
  borderRadius = 12,
  padding = PADDING_BOX_CONTAINER,
  paddingHorizontal,
  flexWrap = "nowrap",
  boxShadow,
}: BoxContainerProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: backgroundColor || theme.surface_container,
            height: height,
            justifyContent: justifyContent,
            marginHorizontal: marginHorizontal,
            marginTop: marginTop,
            borderWidth: borderWidth,
            borderColor: borderColor,
            borderRadius: borderRadius,
            gap: gap,
            flexDirection: flexDirection,
            alignItems: alignItems,
            padding: padding,
            paddingHorizontal: paddingHorizontal,
            flexWrap: flexWrap,
            boxShadow: boxShadow,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
  },
  content: { overflow: "hidden" },
});

BoxContainer.displayName = "BoxContainer";

export default React.memo(BoxContainer);
