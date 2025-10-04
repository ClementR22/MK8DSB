import React, { useMemo } from "react";
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
  flexWrap?: string;
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

  const containerDynamicStyle = useMemo(
    () => ({
      backgroundColor: containerBackgroundColor,
      width: widthContainer,
    }),
    [containerBackgroundColor, widthContainer]
  );

  const contentDynamicStyle = useMemo(() => {
    const finalContentBackgroundColor = contentBackgroundColor || theme.surface_container;
    return {
      backgroundColor: finalContentBackgroundColor,
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
    };
  }, [
    contentBackgroundColor,
    theme.surface_container_high,
    justifyContent,
    marginHorizontal,
    marginTop,
    borderRadius,
    gap,
    flexDirection,
    alignItems,
    padding,
    paddingHorizontal,
    flexWrap,
    boxShadow,
  ]);

  const finalContainerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, containerDynamicStyle]),
    [containerDynamicStyle]
  );

  const finalContentStyle = useMemo(
    () => StyleSheet.flatten([styles.content, contentDynamicStyle]) as ViewStyle,
    [contentDynamicStyle]
  );

  return (
    <View style={finalContainerStyle}>
      <View style={finalContentStyle}>{children}</View>
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
