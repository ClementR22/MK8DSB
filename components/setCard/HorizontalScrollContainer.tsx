// HorizontalScrollContainer.tsx
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { useThemeStore } from "@/stores/useThemeStore";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { ScrollView, Pressable, StyleSheet, ViewStyle, View } from "react-native";

interface Props {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  outerContainerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
  defaultStyle?: ViewStyle;
  isScrollInside?: boolean;
}

const HorizontalScrollContainer = forwardRef<ScrollView, Props>(
  (
    { children, scrollEnabled = true, outerContainerStyle, innerContainerStyle, defaultStyle, isScrollInside = false },
    ref
  ) => {
    const scrollViewInnerRef = useRef<ScrollView>(null);
    useImperativeHandle(ref, () => scrollViewInnerRef.current as ScrollView | null);

    const theme = useThemeStore((state) => state.theme);

    const containerStyle = useMemo(
      () => ({
        backgroundColor: theme.surface_container_high,
      }),
      [theme.surface_container_high]
    );

    return (
      <ScrollView
        ref={scrollViewInnerRef}
        horizontal
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[defaultStyle, isScrollInside && containerStyle]}
        style={[outerContainerStyle]}
      >
        <Pressable style={[{ flexDirection: "row" }, innerContainerStyle, !isScrollInside && containerStyle]}>
          {children}
        </Pressable>
      </ScrollView>
    );
  }
);

export default HorizontalScrollContainer;
