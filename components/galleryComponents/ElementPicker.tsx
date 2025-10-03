import {
  BORDER_RADIUS_12,
  ELEMENT_PICKER_LIST_IMAGE_RATIO,
  ELEMENT_PICKER_LIST_IMAGE_SIZE,
  LIST_ITEM_SPACING,
  SHADOW_STYLE_A,
} from "@/utils/designTokens";
import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ElementPickerProps {
  name: string;
  imageUrl: ReturnType<typeof require>;
  onPress: () => void;
  isSelected: boolean;
  isCollapsed: boolean;
  style: any;
}

const ElementPicker: React.FC<ElementPickerProps> = memo(({ name, imageUrl, onPress, isCollapsed, style }) => {
  // Pass theme to element item for consistent styling
  return (
    <Pressable style={[defaultStyles.container, style.containerDynamic]} onPress={onPress}>
      <View style={defaultStyles.imagePlaceholder}>
        {/* Placeholder background */}
        <Image style={defaultStyles.image} source={imageUrl} resizeMode="contain" />
      </View>
      {!isCollapsed && (
        <Text style={style.textDynamic} numberOfLines={1}>
          {name}
        </Text>
      )}
    </Pressable>
  );
});

ElementPicker.displayName = "ElementPicker";

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: LIST_ITEM_SPACING / 2, // Half spacing for vertical rhythm
    borderRadius: BORDER_RADIUS_12, // Medium rounded corners
    overflow: "hidden", // Ensures shadow works nicely
    ...SHADOW_STYLE_A,
  },
  imagePlaceholder: {
    width: ELEMENT_PICKER_LIST_IMAGE_SIZE, // Slightly larger image placeholder
    height: ELEMENT_PICKER_LIST_IMAGE_SIZE * ELEMENT_PICKER_LIST_IMAGE_RATIO,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "90%",
  },
  text: {
    marginLeft: LIST_ITEM_SPACING,
    flex: 1,
    fontSize: 16, // Slightly larger font
    fontWeight: "500", // Medium font weight
  },
});

export default ElementPicker;
