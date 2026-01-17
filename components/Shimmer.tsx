import React, { useEffect, useRef, useState } from "react";
import { Animated, ColorValue, DimensionValue, LayoutChangeEvent, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useThemeStore from "@/stores/useThemeStore";

interface ShimmerProps {
  height: DimensionValue;
  width: number;
  borderRadius?: number;
  backgroundColor: string;
  inverse?: boolean;
  style?: ViewStyle;
  duration?: number;
}

const Shimmer = ({
  height,
  width,
  borderRadius = 8,
  backgroundColor,
  inverse = false,
  style,
  duration = 800,
}: ShimmerProps) => {
  const theme = useThemeStore((state) => state.theme);

  const translateX = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    const start = () => {
      translateX.setValue(-width);

      animationRef.current = Animated.timing(translateX, {
        toValue: width as number,
        duration,
        useNativeDriver: true,
      });

      animationRef.current.start(({ finished }) => {
        if (finished) start();
      });
    };

    start();

    return () => {
      animationRef.current?.stop();
    };
  }, [width, duration, translateX]);

  const gradientColors: [ColorValue, ColorValue, ColorValue] = !inverse
    ? ["transparent", theme.surface_container_low, "transparent"]
    : ["transparent", theme.surface_container_low, "transparent"];

  return (
    <View
      style={[
        styles.container,
        {
          height,
          width,
          borderRadius,
          backgroundColor: backgroundColor || theme.surface_container,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

export default Shimmer;
