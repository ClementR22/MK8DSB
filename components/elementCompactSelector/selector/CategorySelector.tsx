// components/CategorySelector.tsx
import React, { memo, useMemo } from "react";
import { Category } from "@/data/elements/elementsTypes";
import IconSelector from "./IconSelector";
import { categoryImageSources } from "@/assets/images/categoryImageSources";
import { useThemeStore } from "@/stores/useThemeStore";
import { StyleSheet } from "react-native";
import {
  CATEGORY_BUTTON_GALLERY_WIDTH,
  BORDER_WIDTH_CATEGORY_SELECTOR,
  BORDER_RADIUS_CATEGORY_SELECTOR,
} from "@/utils/designTokens";
import { box_shadow_z1 } from "@/components/styles/shadow";

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
        buttonSize={"100%"}
        activeStyle={activeStyle}
        containerStyle={[styles.container, { backgroundColor: theme.surface_container }]}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: BORDER_RADIUS_CATEGORY_SELECTOR, // Use a larger, more prominent radius
    borderWidth: BORDER_WIDTH_CATEGORY_SELECTOR, // Use consistent spacing token
    borderColor: "transparent",
    boxShadow: box_shadow_z1,
  },
});

export default CategorySelector;
