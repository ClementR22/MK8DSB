import React, { memo } from "react";
import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle, DimensionValue } from "react-native";
import Tooltip from "@/components/Tooltip";

interface IconSelectorProps<T extends string> {
  options: {
    name: T;
    imageUrl: ImageSourcePropType;
  }[];
  selectedValues: Set<T> | T;
  onSelect: (value: T) => void;
  buttonStyle?: { flex: number } | { width: number };
  buttonWrapperWidth?: DimensionValue;
  activeStyle?: ViewStyle;
  containerStyle?: ViewStyle | ViewStyle[];
}

const BUTTON_SIZE = 50;

const IconSelector = <T extends string>({
  options,
  selectedValues,
  onSelect,
  buttonStyle,
  activeStyle,
  containerStyle,
}: IconSelectorProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => {
        const isActive =
          selectedValues instanceof Set ? selectedValues.has(option.name) : selectedValues === option.name;

        return (
          <Tooltip
            key={option.name}
            tooltipText={option.name}
            onPress={() => onSelect(option.name)}
            style={[styles.button, buttonStyle, isActive && activeStyle]}
          >
            <Image source={option.imageUrl} style={styles.image} resizeMode="contain" />
          </Tooltip>
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
    borderRadius: 18,
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
