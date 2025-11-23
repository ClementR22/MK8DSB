// components/CategorySelector.tsx
import React, { memo, useMemo } from "react";
import { Category } from "@/types";
import IconSelector from "./IconSelector";
import { categoryImageSources } from "@/assets/images/elementsImages/mk8d/categoryImageSources";
import useThemeStore from "@/stores/useThemeStore";
import { StyleSheet } from "react-native";
import { BORDER_WIDTH_CATEGORY_SELECTOR, BORDER_RADIUS_CATEGORY_SELECTOR } from "@/utils/designTokens";
import { box_shadow_z1 } from "@/components/styles/shadow";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryPress: (category: Category) => void;
  isInGalleryScreen?: boolean;
}

const categoryOptions = Object.entries(categoryImageSources).map(([name, imageUrl]) => ({
  name: name as Category,
  imageUrl,
}));

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryPress,
  isInGalleryScreen = false,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const activeStyle = useMemo(() => ({ backgroundColor: theme.primary }), [theme.primary]);

  return (
    <IconSelector<Category>
      options={categoryOptions}
      namespace="categories"
      selectedValues={selectedCategory}
      onSelect={onCategoryPress}
      buttonStyle={styles.button}
      activeStyle={activeStyle}
      containerStyle={
        isInGalleryScreen
          ? styles.containerGallery
          : [styles.containerPannel, { backgroundColor: theme.surface_container_high }]
      }
    />
  );
};

const styles = StyleSheet.create({
  containerGallery: { flex: 1 },
  containerPannel: {
    borderRadius: BORDER_RADIUS_CATEGORY_SELECTOR, // Use a larger, more prominent radius
    borderWidth: BORDER_WIDTH_CATEGORY_SELECTOR, // Use consistent spacing token
    borderColor: "transparent",
    boxShadow: box_shadow_z1,
  },
  button: {
    flex: 1,
  },
});

export default React.memo(CategorySelector);
