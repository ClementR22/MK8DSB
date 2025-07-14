import { ElementData } from "@/data/elements/elementsTypes";
import { translateToLanguage } from "@/translations/translations";
import {
  BORDER_RADIUS_12,
  ELEMENT_PICKER_LIST_IMAGE_SIZE,
  ELEMENT_PICKER_LIST_PADDING,
  LIST_ITEM_SPACING,
} from "@/utils/designTokens";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ElementPickerListProps {
  name: string;
  imageUrl: ReturnType<typeof require>;
  onPress: () => void;
  isSelected: boolean;
  isCollapsed: boolean;
  style: any;
}

const ElementPickerList: React.FC<ElementPickerListProps> = memo(
  ({ name, imageUrl, onPress, isSelected, isCollapsed, style }) => {
    // Pass theme to element item for consistent styling
    return (
      <TouchableOpacity
        style={[styles.container, style.containerDynamic]}
        onPress={onPress}
        activeOpacity={0.7} // Add a visual feedback for press
      >
        <View style={styles.imagePlaceholder}>
          {/* Placeholder background */}
          <Image style={styles.image} source={imageUrl} resizeMode="contain" />
        </View>
        {!isCollapsed && (
          <Text style={[styles.text, style.textDynamic]} numberOfLines={1}>
            {name}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: LIST_ITEM_SPACING / 2, // Half spacing for vertical rhythm
    paddingHorizontal: ELEMENT_PICKER_LIST_PADDING,
    borderRadius: BORDER_RADIUS_12, // Medium rounded corners
    overflow: "hidden", // Ensures shadow works nicely
  },
  imagePlaceholder: {
    width: ELEMENT_PICKER_LIST_IMAGE_SIZE, // Slightly larger image placeholder
    height: ELEMENT_PICKER_LIST_IMAGE_SIZE * 1.25,
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

export default ElementPickerList;
