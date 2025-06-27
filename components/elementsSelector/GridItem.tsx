import React, { memo, useCallback, useMemo } from "react";
import { Text, Image, Pressable, StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";

interface GridItemProps {
  element: CharacterElement | BodyElement | WheelElement | GliderElement;
  isSelected: boolean;
  onSelectElement: (classId: number) => void;
  elementCardDynamicStyle: any;
  activeBorderStyle: any;
  pressedStateStyle: any;
}

const GridItem: React.FC<GridItemProps> = ({
  element,
  isSelected,
  onSelectElement,
  elementCardDynamicStyle,
  activeBorderStyle,
  pressedStateStyle,
}) => {
  const handlePress = useCallback(() => {
    onSelectElement(element.classId);
  }, [onSelectElement, element.classId]);

  return (
    <Pressable
      style={({ pressed }) => [elementCardDynamicStyle, isSelected && activeBorderStyle, pressed && pressedStateStyle]}
      onPress={handlePress}
    >
      <Image source={element.imageUrl} style={styles.elementImage} resizeMode="contain" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  elementImage: {
    flex: 1,
    width: "90%",
  },
});

export default memo(GridItem);
