import React, { memo } from "react";
import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle, ImageStyle } from "react-native";
import Tooltip from "@/components/Tooltip";

interface IconSelectorProps<T extends string> {
  options: {
    name: T;
    imageUrl: ImageSourcePropType;
  }[];
  selectedValues: Set<T> | T;
  onSelect: (value: T) => void;
  buttonSize?: number;
  buttonBaseStyle?: any;
  activeStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
}

const IconSelector = <T extends string>({
  options,
  selectedValues,
  onSelect,
  buttonSize = 50,
  buttonBaseStyle,
  activeStyle,
  imageStyle,
  containerStyle,
}: IconSelectorProps<T>) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      ...containerStyle,
    },
    button: {
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      width: buttonSize,
      height: buttonSize,
      ...buttonBaseStyle,
    },
    image: {
      width: "100%",
      height: "100%",
      ...imageStyle,
    },
  });

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive =
          selectedValues instanceof Set ? selectedValues.has(option.name) : selectedValues === option.name;

        return (
          <Tooltip
            key={option.name}
            tooltipText={option.name}
            onPress={() => onSelect(option.name)}
            style={StyleSheet.flatten([styles.button, isActive && activeStyle])}
          >
            <Image source={option.imageUrl} style={styles.image} resizeMode="contain" />
          </Tooltip>
        );
      })}
    </View>
  );
};

export default memo(IconSelector) as typeof IconSelector;
