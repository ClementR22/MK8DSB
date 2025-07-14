import {
  BORDER_RADIUS_12,
  ELEMENT_PICKER_LIST_IMAGE_SIZE,
  ELEMENT_PICKER_LIST_PADDING,
  LIST_ITEM_SPACING,
} from "@/utils/designTokens";
import React, { memo, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface ElementPickerProps {
  name: string;
  imageUrl: ReturnType<typeof require>;
  onPress: () => void;
  isSelected: boolean;
  isCollapsed: boolean;
  style: any;
}

const ElementPicker: React.FC<ElementPickerProps> = memo(
  ({ name, imageUrl, onPress, isSelected, isCollapsed, style }) => {
    const theme = useThemeStore((state) => state.theme);

    const styles = useMemo(
      () => ({
        container: {
          backgroundColor: isSelected ? theme.primary : theme.surface_container,
          borderColor: theme.outline,
        },
        text: {
          color: isSelected ? theme.on_primary : theme.on_surface,
        },
      }),
      [theme, isSelected]
    );

    // Pass theme to element item for consistent styling
    return (
      <Pressable style={[defaultStyles.container, styles.container, style.containerDynamic]} onPress={onPress}>
        <View style={defaultStyles.imagePlaceholder}>
          {/* Placeholder background */}
          <Image style={defaultStyles.image} source={imageUrl} resizeMode="contain" />
        </View>
        {!isCollapsed && (
          <Text style={[styles.text, style.textDynamic]} numberOfLines={1}>
            {name}
          </Text>
        )}
      </Pressable>
    );
  }
);

ElementPicker.displayName = "ElementPicker";

const defaultStyles = StyleSheet.create({
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

export default ElementPicker;
