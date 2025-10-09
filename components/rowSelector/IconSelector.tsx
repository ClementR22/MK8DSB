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
  buttonSize?: DimensionValue;
  buttonWrapperWidth?: DimensionValue;
  activeStyle?: ViewStyle;
  containerStyle?: ViewStyle | ViewStyle[];
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
}: IconSelectorProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => {
        const isActive =
          selectedValues instanceof Set ? selectedValues.has(option.name) : selectedValues === option.name;

        return (
          <View key={option.name} style={{ width: buttonWrapperWidth, zIndex: isActive ? 10 : 0 }}>
            <Tooltip
              tooltipText={option.name}
              onPress={() => onSelect(option.name)}
              style={[styles.button, { width: buttonSize }, isActive && activeStyle]}
            >
              <Image source={option.imageUrl} style={styles.image} resizeMode="contain" />
            </Tooltip>
          </View>
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
