import React, { useMemo } from "react";
import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface BoxContainerProps {
  children: React.ReactNode;
  containerBackgroundColor?: string;
  contentBackgroundColor?: string;
  justifyContent?: ViewStyle["justifyContent"];
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  gap?: number;
  margin?: number;
  marginTop?: number;
  inputStyles?: StyleProp<ViewStyle>;
  widthContainer?: DimensionValue;
  borderRadius?: number;
}

const BoxContainer = ({
  children,
  containerBackgroundColor = "transparent",
  contentBackgroundColor,
  justifyContent = "center",
  flexDirection = "column",
  alignItems = "center",
  gap = 10,
  margin = 16,
  marginTop,
  inputStyles,
  widthContainer = "100%",
  borderRadius = 12,
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
    const finalContentBackgroundColor = contentBackgroundColor || theme.surface_container_high;
    return {
      backgroundColor: finalContentBackgroundColor,
      justifyContent: justifyContent,
      margin: margin,
      marginTop: marginTop,
      borderRadius: borderRadius,
      gap: gap,
      flexDirection: flexDirection,
      alignItems: alignItems,
    };
  }, [
    contentBackgroundColor,
    theme.surface_container_high,
    justifyContent,
    margin,
    marginTop,
    borderRadius,
    gap,
    flexDirection,
    alignItems,
  ]);

  const finalContainerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, containerDynamicStyle]),
    [containerDynamicStyle]
  );

  const finalContentStyle = useMemo(
    () => StyleSheet.flatten([styles.content, contentDynamicStyle, inputStyles]),
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
  content: { padding: 10 },
});

export default React.memo(BoxContainer);
