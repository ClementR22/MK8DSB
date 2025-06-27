import React, { memo, useCallback, useMemo } from "react";
import { Text, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";

const { width: screenWidth } = Dimensions.get("window");
const NUM_COLUMNS = 4;
const PADDING_HORIZONTAL = 20;
const GAP = 10;
const ITEM_WIDTH = (screenWidth - PADDING_HORIZONTAL * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

interface GridItemProps {
  element: CharacterElement | BodyElement | WheelElement | GliderElement;
  isSelected: boolean;
  onSelectElement: (classId: number) => void;
  elementCardBaseStyle: any;
  elementNameStyle: any;
  activeBorderStyle: any;
  pressedStateStyle: any;
}

const GridItem: React.FC<GridItemProps> = ({
  element,
  isSelected,
  onSelectElement,
  elementCardBaseStyle,
  elementNameStyle,
  activeBorderStyle,
  pressedStateStyle,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const handlePress = useCallback(() => {
    onSelectElement(element.classId);
  }, [onSelectElement, element.classId]);

  const elementCardDynamicStyle = useMemo(
    () => [elementCardBaseStyle, { backgroundColor: theme.surface_container_low }],
    [elementCardBaseStyle, theme.surface_container_low]
  );

  return (
    <Pressable
      style={({ pressed }) => [elementCardDynamicStyle, isSelected && activeBorderStyle, pressed && pressedStateStyle]}
      onPress={handlePress}
    >
      <Image source={element.imageUrl} style={styles.elementImage} resizeMode="contain" />
      <Text style={elementNameStyle} numberOfLines={1}>
        {element.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  elementCardBase: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  elementImage: {
    width: ITEM_WIDTH * 0.8,
    height: ITEM_WIDTH * 0.8,
    marginBottom: 5,
  },
  elementName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  activeBorder: {
    borderWidth: 3,
  },
  pressedState: {
    opacity: 0.7,
  },
});

export default memo(GridItem);
