import React, { useMemo } from "react";
import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";

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
  inputStyles?: StyleProp<ViewStyle>;
  widthContainer?: DimensionValue;
  borderRadius?: number;
  padding?: number;
  paddingHorizontal?: number;
  flexWrap?: string;
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
  inputStyles,
  widthContainer = "100%",
  borderRadius = 12,
  padding = 10,
  paddingHorizontal,
  flexWrap = "nowrap",
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
  ]);

  const finalContainerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, containerDynamicStyle]),
    [containerDynamicStyle]
  );

  const finalContentStyle = useMemo(
    () => StyleSheet.flatten([styles.content, contentDynamicStyle, inputStyles]) as ViewStyle,
    [contentDynamicStyle, inputStyles]
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
