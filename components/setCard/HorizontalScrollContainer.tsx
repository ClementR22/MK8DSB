// HorizontalScrollContainer.tsx
import { useThemeStore } from "@/stores/useThemeStore";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { ScrollView, Pressable, StyleSheet, DimensionValue, ViewStyle, View } from "react-native";

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
      <View style={[outerContainerStyle, isScrollInside && containerStyle]}>
        <ScrollView
          ref={scrollViewInnerRef}
          horizontal
          scrollEnabled={scrollEnabled}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={defaultStyle}
        >
          <Pressable style={[{ flexDirection: "row" }, innerContainerStyle, !isScrollInside && containerStyle]}>
            {children}
          </Pressable>
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({});

export default HorizontalScrollContainer;
