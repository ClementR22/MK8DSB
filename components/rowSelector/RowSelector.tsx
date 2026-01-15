import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle, DimensionValue } from "react-native";
import Tooltip from "@/components/Tooltip";

interface RowSelectorProps<T extends string> {
  options: {
    name: T;
    imageUrl: ImageSourcePropType;
  }[];
  namespace: string;
  selectedValues: Set<T> | T;
  onSelect: (value: T) => void;
  buttonStyle?: { flex: number } | { width: number };
  buttonWrapperWidth?: DimensionValue;
  activeStyle?: ViewStyle;
  containerStyle?: ViewStyle | ViewStyle[];
}

const BUTTON_SIZE = 50;

const RowSelector = <T extends string>({
  options,
  namespace,
  selectedValues,
  onSelect,
  buttonStyle,
  activeStyle,
  containerStyle,
}: RowSelectorProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => {
        const isActive =
          selectedValues instanceof Set ? selectedValues.has(option.name) : selectedValues === option.name;

        return (
          <Tooltip
            key={option.name}
            tooltipText={option.name}
            namespace={namespace}
            onPress={() => onSelect(option.name)}
            childStyleOuter={[styles.button, buttonStyle, isActive && activeStyle]}
            childStyleInner={styles.childStyleInner} // pour élargir la zone pressable
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
    flex: 1,
  },
  image: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE * 0.8,
  },
  childStyleInner: { paddingHorizontal: 100 },
});

export default memo(RowSelector) as typeof RowSelector;
