// components/CategorySelector.tsx
import React, { memo, useMemo } from "react";
import { Category } from "@/data/elements/elementsTypes";
import IconSelector from "./IconSelector";
import { categoryImageSources } from "@/assets/images/categoryImageSources";
import { useThemeStore } from "@/stores/useThemeStore";
import { Animated, StyleSheet } from "react-native";
import {
  BORDER_RADIUS_15,
  CATEGORY_BUTTON_GALLERY_WIDTH,
  CATEGORY_SELECTOR_BORDER_WIDTH,
  SHADOW_STYLE,
} from "@/utils/designTokens";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryPress: (category: Category) => void;
  isInGalleryPannel?: boolean;
  animatedCategoryMarginLeft?: Animated.Value;
}

const categoryOptions = Object.entries(categoryImageSources).map(([name, imageUrl]) => ({
  name: name as Category,
  imageUrl,
}));

const CategorySelector: React.FC<CategorySelectorProps> = memo(
  ({
    selectedCategory,
    onCategoryPress,
    isInGalleryPannel = false,
    animatedCategoryMarginLeft = new Animated.Value(0),
  }) => {
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
        overlapAmount={animatedCategoryMarginLeft}
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
    borderRadius: BORDER_RADIUS_15, // Use a larger, more prominent radius
    ...SHADOW_STYLE, // Apply shadow
    borderWidth: CATEGORY_SELECTOR_BORDER_WIDTH, // Use consistent spacing token
    borderColor: "transparent",
  },
});

export default CategorySelector;
