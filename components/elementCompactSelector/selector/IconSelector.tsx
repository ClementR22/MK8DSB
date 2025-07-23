import React, { memo, useMemo } from "react";
import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle, ImageStyle, Animated } from "react-native";
import Tooltip from "@/components/Tooltip";

interface IconSelectorProps<T extends string> {
  options: {
    name: T;
    imageUrl: ImageSourcePropType;
  }[];
  selectedValues: Set<T> | T;
  onSelect: (value: T) => void;
  buttonSize?: number;
  buttonStyle?: ViewStyle;
  buttonWrapperStyle?: ViewStyle;
  activeStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  overlapAmount?: Animated.Value | number;
}

const IconSelector = <T extends string>({
  options,
  selectedValues,
  onSelect,
  buttonSize = 50,
  buttonStyle,
  buttonWrapperStyle,
  activeStyle,
  imageStyle,
  containerStyle,
  overlapAmount = 0,
}: IconSelectorProps<T>) => {
  const mergedButtonStyle = useMemo(
    () => [{ width: buttonSize, height: buttonSize }, styles.button, buttonStyle],
    [buttonSize, buttonStyle]
  );

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
            style={[buttonWrapperStyle, { zIndex: isActive ? 10 : 0, marginLeft: marginLeft }]}
          >
            <Tooltip
              tooltipText={option.name}
              onPress={() => onSelect(option.name)}
              style={StyleSheet.flatten([...mergedButtonStyle, isActive && activeStyle])}
            >
              <Image source={option.imageUrl} style={[styles.image, imageStyle]} resizeMode="contain" />
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
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default memo(IconSelector) as typeof IconSelector;
