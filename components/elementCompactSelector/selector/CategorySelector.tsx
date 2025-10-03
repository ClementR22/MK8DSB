// components/CategorySelector.tsx
import React, { memo, useMemo } from "react";
import { Category } from "@/data/elements/elementsTypes";
import IconSelector from "./IconSelector";
import { categoryImageSources } from "@/assets/images/categoryImageSources";
import { useThemeStore } from "@/stores/useThemeStore";
import { Animated, StyleSheet } from "react-native";
import {
  CATEGORY_BUTTON_GALLERY_WIDTH,
  BORDER_WIDTH_CATEGORY_SELECTOR,
  SHADOW_STYLE_B,
  BORDER_RADIUS_CATEGORY_SELECTOR,
} from "@/utils/designTokens";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryPress: (category: Category) => void;
  isInGalleryPannel?: boolean;
}

const categoryOptions = Object.entries(categoryImageSources).map(([name, imageUrl]) => ({
  name: name as Category,
  imageUrl,
}));

const CategorySelector: React.FC<CategorySelectorProps> = memo(
  ({ selectedCategory, onCategoryPress, isInGalleryPannel = false }) => {
    const theme = useThemeStore((state) => state.theme);

    const activeStyle = useMemo(() => ({ backgroundColor: theme.primary }), [theme.primary]);

    return (
      <IconSelector<Category>
        options={categoryOptions}
        selectedValues={selectedCategory}
        onSelect={onCategoryPress}
        buttonWrapperWidth={isInGalleryPannel ? CATEGORY_BUTTON_GALLERY_WIDTH : "25%"}
        activeStyle={activeStyle}
        containerStyle={{ ...styles.container, backgroundColor: theme.surface_container }}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between", // Distribute items more evenly, possibly with padding around them
    overflow: "hidden",
    borderRadius: BORDER_RADIUS_CATEGORY_SELECTOR, // Use a larger, more prominent radius
    ...SHADOW_STYLE_B, // Apply shadow
    borderWidth: BORDER_WIDTH_CATEGORY_SELECTOR, // Use consistent spacing token
    borderColor: "transparent",
  },
});

export default CategorySelector;
