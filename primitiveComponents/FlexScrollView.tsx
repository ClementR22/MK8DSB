import React, { useMemo } from "react";
import useGeneralStore from "@/stores/useGeneralStore";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface FlexScrollViewProps {
  children: React.ReactNode;
  flexDirection?: ViewStyle["flexDirection"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  gap?: number; // 'gap' is a number in RN
  style?: StyleProp<ViewStyle>; // Use StyleProp<ViewStyle> for incoming style
}

const FlexScrollView = ({
  children,
  flexDirection = "column",
  alignItems = "center",
  justifyContent = "center",
  gap = 10,
  style,
}: FlexScrollViewProps) => {
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const dynamicContentContainerStyle = useMemo(
    () => ({
      flexDirection: flexDirection,
      alignItems: alignItems,
      justifyContent: justifyContent,
      gap: gap,
    }),
    [flexDirection, alignItems, justifyContent, gap]
  );

  const finalContentContainerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, dynamicContentContainerStyle, style]),
    [dynamicContentContainerStyle, style]
  );

  return (
    <ScrollView scrollEnabled={isScrollEnable} contentContainerStyle={finalContentContainerStyle}>
      {children}
    </ScrollView>
  );
};

FlexScrollView.displayName = "FlexScrollView";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent", // If this is always transparent, keep it static
    // Other common, unchanging styles can go here
  },
});

export default React.memo(FlexScrollView);
