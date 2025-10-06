import React from "react";
import { DimensionValue, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { MARGIN_CONTAINER_LOWEST, PADDING_BOX_CONTAINER } from "@/utils/designTokens";

interface BoxContainerProps {
  children: React.ReactNode;
  containerBackgroundColor?: string;
  contentBackgroundColor?: string;
  justifyContent?: ViewStyle["justifyContent"];
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  gap?: number;
  marginHorizontal?: number;
  marginTop?: number;
  widthContainer?: DimensionValue;
  borderRadius?: number;
  padding?: number;
  paddingHorizontal?: number;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  boxShadow?: string;
}

const BoxContainer = ({
  children,
  containerBackgroundColor = "transparent",
  contentBackgroundColor,
  justifyContent = "center",
  flexDirection = "column",
  alignItems = "center",
  gap = 10,
  marginHorizontal = MARGIN_CONTAINER_LOWEST,
  marginTop,
  widthContainer = "100%",
  borderRadius = 12,
  padding = PADDING_BOX_CONTAINER,
  paddingHorizontal,
  flexWrap = "nowrap",
  boxShadow,
}: BoxContainerProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: containerBackgroundColor,
          width: widthContainer,
        },
      ]}
    >
      <View
        style={[
          styles.content,
          {
            backgroundColor: contentBackgroundColor || theme.surface_container,
            justifyContent: justifyContent,
            marginHorizontal: marginHorizontal,
            marginTop: marginTop,
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
    justifyContent: "flex-start",
  },
  content: { overflow: "hidden" },
});

BoxContainer.displayName = "BoxContainer";

export default React.memo(BoxContainer);
