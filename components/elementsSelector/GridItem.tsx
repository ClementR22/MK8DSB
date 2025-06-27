import React, { memo, useCallback } from "react";
import { Image, StyleSheet } from "react-native";
import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";
import TooltipWrapper from "../TooltipWrapper";

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
    <TooltipWrapper
      tooltipText={element.name}
      onPress={handlePress}
      innerContainerStyle={[elementCardDynamicStyle, isSelected && activeBorderStyle]}
    >
      <Image source={element.imageUrl} style={styles.elementImage} resizeMode="contain" />
    </TooltipWrapper>
  );
};

const styles = StyleSheet.create({
  elementImage: {
    flex: 1,
    width: "90%",
  },
});

export default memo(GridItem);
