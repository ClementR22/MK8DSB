import React, { memo, useMemo } from "react";
import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle, Animated } from "react-native";
import Tooltip from "@/components/Tooltip";
import { BORDER_RADIUS_18 } from "@/utils/designTokens";

interface IconSelectorProps<T extends string> {
  options: {
    name: T;
    imageUrl: ImageSourcePropType;
  }[];
  selectedValues: Set<T> | T;
  onSelect: (value: T) => void;
  buttonSize?: number;
  buttonWrapperWidth?: number | string;
  activeStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  overlapAmount?: Animated.Value | number;
}

const BUTTON_SIZE = 50;

const IconSelector = <T extends string>({
  options,
  selectedValues,
  onSelect,
  buttonSize = BUTTON_SIZE,
  buttonWrapperWidth,
  activeStyle,
  containerStyle,
  overlapAmount = 0,
}: IconSelectorProps<T>) => {
  const mergedButtonStyle = useMemo(() => [{ width: buttonSize, height: buttonSize }, styles.button], [buttonSize]);

  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => {
        const isActive =
          selectedValues instanceof Set ? selectedValues.has(option.name) : selectedValues === option.name;

        const marginLeft = useMemo(() => {
          if (index === 0) return 0;
          if (overlapAmount instanceof Animated.Value) {
            return overlapAmount;
          }
          return (overlapAmount as number) - index;
        }, [index, overlapAmount]);

        return (
          <Animated.View
            key={option.name}
            style={{ width: buttonWrapperWidth, zIndex: isActive ? 10 : 0, marginLeft: marginLeft } as ViewStyle}
          >
            <Tooltip
              tooltipText={option.name}
              onPress={() => onSelect(option.name)}
              style={StyleSheet.flatten([...mergedButtonStyle, isActive && activeStyle])}
            >
              <Image source={option.imageUrl} style={[styles.image]} resizeMode="contain" />
            </Tooltip>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: BORDER_RADIUS_18 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
  },
  image: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE * 0.8,
  },
});

export default memo(IconSelector) as typeof IconSelector;
